require('dotenv').config();

const { getSheet } = require('./utils/spreadsheet');
const { getItems } = require('./utils/itemPrice');

function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
      console.log(ms);
    }, ms);
  });
}

async function updatePrices() {
  const sheet = await getSheet();
  const rows = await sheet.getRows();

  const itemIDs = [];
  rows.forEach((row) => itemIDs.push(row['item id']));
  const commaSeperatedItemIDs = itemIDs.join(',');

  const itemsInfo = await getItems(commaSeperatedItemIDs);
  const arrOfItemInfo = itemsInfo.split('|');

  arrOfItemInfo.forEach(async (itemInfo, i) => {
    const arrItemInfo = itemInfo.split('-'); /* type of itemInfo is string */
    const itemOnSheet = await rows.find(
      (row) => row['item id'] === arrItemInfo[0]
    );
    itemOnSheet['price'] = arrItemInfo[2];
    itemOnSheet['in stock'] = arrItemInfo[1];

    setTimeout(async function () {
      await itemOnSheet.save();
      console.log('updating...', i);
    }, 2000 * (i + 1));
  });
}
updatePrices();
