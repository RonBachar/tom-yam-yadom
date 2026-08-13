import { NextResponse } from "next/server";
import { getAllSubscribers } from "../../../lib/googleSheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SCHEDULE = {
  welcome_2: 3,
  welcome_3: 7,
  education_1: 14,
  education_2: 21,
  education_3: 28,
  education_4: 35,
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
  const welcome = Number.parseInt(welcomeStep, 10) || 0;
  const education = Number.parseInt(educationStep, 10) || 0;

  if (stepName.startsWith("welcome_")) {
    const stepNumber = Number.parseInt(stepName.slice("welcome_".length), 10);
    return welcome >= stepNumber;
  }

  if (stepName.startsWith("education_")) {
    const stepNumber = Number.parseInt(stepName.slice("education_".length), 10);
    return education >= stepNumber;
  }

  return true;
}

function matchingStep(days, welcomeStep, educationStep) {
  for (const [stepName, day] of Object.entries(SCHEDULE)) {
    if (days === day && !stepAlreadySent(stepName, welcomeStep, educationStep)) {
      return stepName;
    }
  }
  return null;
}

export async function GET(request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await getAllSubscribers();
    const byStep = Object.fromEntries(
      Object.keys(SCHEDULE).map((stepName) => [stepName, 0])
    );

    let skipped = 0;
    let wouldSend = 0;

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

      console.log(`Would send ${stepName} to ${subscriber.email}`);
      byStep[stepName] += 1;
      wouldSend += 1;
    }

    return NextResponse.json({
      ok: true,
      processed: subscribers.length,
      skipped,
      wouldSend,
      byStep,
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
