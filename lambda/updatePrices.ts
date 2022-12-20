import { getSheet } from './helpers/spreadsheet';
import { getItems } from './helpers/itemPrice';

function delayPromise(duration: any) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, duration);
  });
}

export async function main() {
  const sheet = await getSheet();
  const rows = await sheet.getRows();

  const itemIDs = <any>[];
  rows.forEach((row: any) => itemIDs.push(row['item id']));
  const commaSeperatedItemIDs = itemIDs.join(',');

  const itemsInfo = await getItems(commaSeperatedItemIDs);
  const arrOfItemInfo = itemsInfo.split('|');

  // TODO implement bulk row update
  await Promise.all(
    arrOfItemInfo.map(async (itemInfo: any, i: number) => {
      const arrItemInfo = itemInfo.split('-'); /* type of itemInfo is string */
      const itemOnSheet = await rows.find(
        (row: any) => row['item id'] === arrItemInfo[0]
      );
      if (!itemOnSheet) return console.log('itemOnSheet is not defined');
      itemOnSheet['price'] = arrItemInfo[2];
      itemOnSheet['in stock'] = arrItemInfo[1];

      // google api limit is 1 request per second.
      await delayPromise(i * 1100);
      console.log('updating...', i);
      await itemOnSheet.save();
    })
  );
}
