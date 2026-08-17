import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SEQUENCE_TEMPLATES } from "../../../lib/emailTemplates/sequences";
import {
  getAllSubscribers,
  repairShiftedSubscriberRows,
  updateSubscriberStep,
} from "../../../lib/googleSheets";
import { generateToken } from "../../../lib/unsubscribeToken";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const FROM = "Tom Yam Yadom <info@tomyamyadomherbals.com>";

const SCHEDULE = {
  welcome_2: 3,
  welcome_3: 7,
  education_1: 14,
  education_2: 21,
  education_3: 28,
  education_4: 35,
};

const STEP_FLAGS = {
  welcome_2: { column: "E", value: "1" },
  welcome_3: { column: "E", value: "2" },
  education_1: { column: "F", value: "1" },
  education_2: { column: "F", value: "2" },
  education_3: { column: "F", value: "3" },
  education_4: { column: "F", value: "4" },
};

function parseSheetDate(value) {
  if (!value) return null;
  const normalized = String(value).replace(/,/g, " ").replace(/\s+/g, " ").trim();
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function daysSinceSignup(signupDate) {
  const start = Date.UTC(
    signupDate.getFullYear(),
    signupDate.getMonth(),
    signupDate.getDate()
  );
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today - start) / (24 * 60 * 60 * 1000));
}

function stepAlreadySent(stepName, welcomeStep, educationStep) {
  const flag = STEP_FLAGS[stepName];
  if (!flag) return true;

  const current = stepName.startsWith("welcome_")
    ? Number.parseInt(welcomeStep, 10) || 0
    : Number.parseInt(educationStep, 10) || 0;

  return current >= (Number.parseInt(flag.value, 10) || 0);
}

function matchingStep(days, welcomeStep, educationStep) {
  for (const [stepName, day] of Object.entries(SCHEDULE)) {
    if (days === day && !stepAlreadySent(stepName, welcomeStep, educationStep)) {
      return stepName;
    }
  }
  return null;
}

async function sendResendEmail(resend, label, payload) {
  console.log(`[cron/email-sequences] Sending ${label} to:`, payload.to);

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    console.error(`[cron/email-sequences] ${label} failed:`, error);
    throw new Error(error.message || `Failed to send ${label}`);
  }

  console.log(
    `[cron/email-sequences] ${label} sent successfully:`,
    data?.id ?? data
  );
  return data;
}

export async function GET(request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[cron/email-sequences] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  try {
    let repaired = [];
    let diagnostics = [];
    let repairErrorMessage = null;
    try {
      const repairResult = await repairShiftedSubscriberRows();
      repaired = repairResult.repaired;
      diagnostics = repairResult.diagnostics;
      if (repaired.length) {
        console.log(
          "[cron/email-sequences] Repaired shifted subscriber rows:",
          repaired.map((item) => item.email)
        );
      }
    } catch (repairError) {
      repairErrorMessage =
        repairError instanceof Error
          ? repairError.message
          : "Failed to repair shifted subscriber rows.";
      console.error(
        "[cron/email-sequences] Failed to repair shifted subscriber rows:",
        repairError
      );
    }

    if (new URL(request.url).searchParams.get("repairOnly") === "1") {
      return NextResponse.json({
        ok: !repairErrorMessage,
        repaired,
        diagnostics,
        repairError: repairErrorMessage,
      });
    }

    const subscribers = await getAllSubscribers();
    const byStep = Object.fromEntries(
      Object.keys(SCHEDULE).map((stepName) => [stepName, 0])
    );
    const errors = [];
    const resend = new Resend(apiKey);

    let skipped = 0;
    let wouldSend = 0;
    let unsubscribedSkipped = 0;

    for (const subscriber of subscribers) {
      const signupDate = parseSheetDate(subscriber.date);
      if (!signupDate) {
        skipped += 1;
        continue;
      }

      const days = daysSinceSignup(signupDate);
      const stepName = matchingStep(
        days,
        subscriber.welcomeStep,
        subscriber.educationStep
      );

      if (!stepName) continue;

      if (subscriber.unsubscribed) {
        unsubscribedSkipped += 1;
        continue;
      }

      const templateFn = SEQUENCE_TEMPLATES[stepName];
      const flag = STEP_FLAGS[stepName];

      if (!templateFn || !flag) {
        errors.push({
          email: subscriber.email,
          step: stepName,
          error: `Unknown sequence step: ${stepName}`,
        });
        continue;
      }

      try {
        const token = generateToken(subscriber.email);
        const { subject, html } = templateFn(subscriber.email, token);
        await sendResendEmail(resend, stepName, {
          from: FROM,
          to: [subscriber.email],
          subject,
          html,
        });

        try {
          await updateSubscriberStep(subscriber.rowIndex, flag.column, flag.value);
        } catch (sheetError) {
          const message =
            sheetError instanceof Error
              ? sheetError.message
              : "Failed to update subscriber step.";
          console.error(
            `[cron/email-sequences] Sent ${stepName} to ${subscriber.email} but sheet update failed:`,
            sheetError
          );
          errors.push({
            email: subscriber.email,
            step: stepName,
            error: `Sent, but sheet update failed: ${message}`,
          });
        }

        byStep[stepName] += 1;
        wouldSend += 1;
      } catch (sendError) {
        const message =
          sendError instanceof Error
            ? sendError.message
            : "Failed to send sequence email.";
        console.error(
          `[cron/email-sequences] ${stepName} failed for ${subscriber.email}:`,
          sendError
        );
        errors.push({
          email: subscriber.email,
          step: stepName,
          error: message,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      processed: subscribers.length,
      skipped,
      unsubscribedSkipped,
      wouldSend,
      byStep,
      repaired,
      errors,
    });
  } catch (error) {
    console.error("[cron/email-sequences] Failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process email sequences.",
      },
      { status: 500 }
    );
  }
}
