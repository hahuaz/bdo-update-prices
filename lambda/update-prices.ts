import { getSheet } from './helpers/spreadsheet';
import { getItems } from './helpers/itemPrice';

export async function main() {
  // sheet should be sorted in ascending order by id
  const sheet = await getSheet();
  // get prices from bdo
  const rows = await sheet.getRows();
  const itemIDs = <any>[];
  rows.forEach((row: any) => itemIDs.push(row['item id']));
  const commaSeperatedItemIDs = itemIDs.join(',');
  const itemsInfo = await getItems(commaSeperatedItemIDs);
  const matrixItemsInfo = itemsInfo.split('|').map((item: any) => {
    return item.split('-');
  });
  // return console.log(matrixItemsInfo.length);

  // update cells
  const rowCount = sheet.rowCount;
  await sheet.loadCells({
    startRowIndex: 0,
    endRowIndex: rowCount,
    startColumnIndex: 0,
    endColumnIndex: 5,
  });
  for (let i = 0; i <= rowCount; i++) {
    console.log(i, matrixItemsInfo?.[i]?.[2]);
    // in sheet, index based column2 is price, column3 is in stock
    // in sheet, index based row0 is headers. use n + 1 to access actual row
    if (!matrixItemsInfo?.[i]?.[2]) break;
    sheet.getCell(i + 1, 2).value = matrixItemsInfo[i][2];
    sheet.getCell(i + 1, 3).value = matrixItemsInfo[i][1];
  }
  // sheet.getCell(1, 3).value = 'myname';
  await sheet.saveUpdatedCells();
  // console.log(sheet.getCell(1, 3).value);
  console.log('changes are saved');
}
