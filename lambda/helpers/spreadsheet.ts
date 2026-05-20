import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function getSheet() {
  // Initialize the JWT auth client using google-auth-library
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    // Replace literal newlines with actual newline characters
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET!,
    serviceAccountAuth
  );

  await doc.loadInfo();
  /* sheet id */
  const sheet = doc.sheetsById[Number(process.env.GOOGLE_SHEET_BY_ID!)];

  return sheet;
}
