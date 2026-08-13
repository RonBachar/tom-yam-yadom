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

export async function appendSubscriberToSheet(email, source) {
  try {
    const { sheets, spreadsheetId } = getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, formatDate(new Date()), source, "", "0", "0"]],
      },
    });
  } catch (error) {
    console.error("[googleSheets] Failed to append subscriber:", error);
  }
}

export async function getAllSubscribers() {
  const { sheets, spreadsheetId } = getSheetsClient();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:F",
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
    });
  }

  return subscribers;
}

export async function updateSubscriberStep(rowIndex, column, value) {
  if (column !== "E" && column !== "F") {
    throw new Error(`Invalid step column: ${column}. Expected "E" or "F".`);
  }

  const { sheets, spreadsheetId } = getSheetsClient();

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Sheet1!${column}${rowIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[value]],
    },
  });
}
