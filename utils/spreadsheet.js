const { GoogleSpreadsheet } = require("google-spreadsheet");

async function getSheet() {
  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SPREADSHEET
  ); /* spreadsheet id */
  await doc.useServiceAccountAuth({
    /* gain access to spreadsheet */
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  });
  await doc.loadInfo();
  /* sheet id */
  const sheet = await doc.sheetsById[process.env.GOOGLE_SHEET_BY_ID];

  return sheet;
}

module.exports = {
  getSheet
};
