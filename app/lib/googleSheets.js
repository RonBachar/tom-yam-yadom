import { google } from "googleapis";

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, or GOOGLE_SHEETS_ID"
    );
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), spreadsheetId };
}

function sheetRange(title, a1) {
  const escaped = String(title).replace(/'/g, "''");
  return `'${escaped}'!${a1}`;
}

async function getSubscriberSheetTitle(sheets, spreadsheetId) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  const titles = (meta.data.sheets ?? []).map((sheet) => sheet.properties.title);
  if (titles.includes("Newsletter Subscribers")) return "Newsletter Subscribers";
  if (titles.includes("Sheet1")) return "Sheet1";
  if (!titles.length) {
    throw new Error("Spreadsheet has no sheets");
  }
  return titles[0];
}

function looksLikeEmail(value) {
  const email = String(value ?? "").trim();
  return (
    email.includes("@") &&
    email.includes(".") &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function subscriberRowValues(email, date, source) {
  return [email, date, source, "", "0", "0", "0"];
}

export async function repairShiftedSubscriberRows() {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = await getSubscriberSheetTitle(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetRange(sheetTitle, "A:G"),
  });
  const rows = response.data.values ?? [];
  const repaired = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i] ?? [];
    const rowIndex = i + 1;
    const colA = String(row[0] ?? "").trim();
    const colB = String(row[1] ?? "").trim();

    if (looksLikeEmail(colB) && !looksLikeEmail(colA)) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: sheetRange(sheetTitle, `A${rowIndex}:G${rowIndex}`),
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            subscriberRowValues(
              colB,
              String(row[2] ?? "").trim(),
              String(row[3] ?? "").trim()
            ),
          ],
        },
      });
      repaired.push({
        email: colB,
        sheet: sheetTitle,
        rowIndex,
        action: "unshift",
      });
      continue;
    }

    if (!looksLikeEmail(colA)) continue;

    const welcome = String(row[4] ?? "").trim();
    const education = String(row[5] ?? "").trim();
    const unsubscribed = String(row[6] ?? "").trim();
    if (welcome && education && unsubscribed) continue;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange(sheetTitle, `E${rowIndex}:G${rowIndex}`),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[welcome || "0", education || "0", unsubscribed || "0"]],
      },
    });
    repaired.push({
      email: colA,
      sheet: sheetTitle,
      rowIndex,
      action: "defaults",
    });
  }

  return {
    repaired,
    diagnostics: [{ title: sheetTitle, rowCount: rows.length }],
  };
}

export async function appendSubscriberToSheet(email, source) {
  try {
    const { sheets, spreadsheetId } = getSheetsClient();
    const sheetTitle = await getSubscriberSheetTitle(sheets, spreadsheetId);

    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetRange(sheetTitle, "A:G"),
    });
    const nextRow = (existing.data.values?.length ?? 0) + 1;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: sheetRange(sheetTitle, `A${nextRow}:G${nextRow}`),
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [subscriberRowValues(email, formatDate(new Date()), source)],
      },
    });
    console.log("[googleSheets] Subscriber appended:", email);
  } catch (error) {
    console.error("[googleSheets] Failed to append subscriber:", error);
  }
}

export async function getAllSubscribers() {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = await getSubscriberSheetTitle(sheets, spreadsheetId);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetRange(sheetTitle, "A:G"),
  });

  const rows = response.data.values ?? [];
  const subscribers = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i] ?? [];
    const email = String(row[0] ?? "").trim();
    if (!email) continue;

    subscribers.push({
      rowIndex: i + 1,
      email,
      date: String(row[1] ?? "").trim(),
      source: String(row[2] ?? "").trim(),
      welcomeStep: String(row[4] ?? "").trim() || "0",
      educationStep: String(row[5] ?? "").trim() || "0",
      unsubscribed: String(row[6] ?? "").trim() === "1",
    });
  }

  return subscribers;
}

export async function getSubscriberByEmail(email) {
  const normalized = String(email ?? "").trim().toLowerCase();
  if (!normalized) return null;

  const subscribers = await getAllSubscribers();
  const match = subscribers.find(
    (subscriber) => subscriber.email.toLowerCase() === normalized
  );
  if (!match) return null;

  return {
    rowIndex: match.rowIndex,
    email: match.email,
    unsubscribed: match.unsubscribed,
  };
}

export async function markUnsubscribed(rowIndex) {
  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = await getSubscriberSheetTitle(sheets, spreadsheetId);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetRange(sheetTitle, `G${rowIndex}`),
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [["1"]],
    },
  });
}

export async function updateSubscriberStep(rowIndex, column, value) {
  if (column !== "E" && column !== "F") {
    throw new Error(`Invalid step column: ${column}. Expected "E" or "F".`);
  }

  const { sheets, spreadsheetId } = getSheetsClient();
  const sheetTitle = await getSubscriberSheetTitle(sheets, spreadsheetId);

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: sheetRange(sheetTitle, `${column}${rowIndex}`),
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[value]],
    },
  });
}
