import { getSheet } from "./helpers/spreadsheet";
import { getItems } from "./helpers/itemPrice";

export async function main() {
  // sheet should be sorted in ascending order by id
  const sheet = await getSheet();
  // get prices from bdo
  const rows = await sheet.getRows();
  const itemIDs = <any>[];
  rows.forEach((row: any) => itemIDs.push(row["item id"]));

  // Use the function to chunk the itemIDs array into groups of 10
  const chunkedItemIDs = chunkArray(itemIDs, 10);

  const joinedChunkedItemIDs: string[] = [];

  // prepare itemIDs for getItems by joining them with a comma
  for (let i = 0; i < chunkedItemIDs.length; i++) {
    joinedChunkedItemIDs.push(chunkedItemIDs[i].join(","));
  }

  // Now you can loop through chunkedItemIDs and call getItems on each chunk
  let chunkedItemsInfo = await Promise.all(
    joinedChunkedItemIDs.map((id) => getItems(id))
  );

  const itemsInfo = chunkedItemsInfo.join("|");

  const matrixItemsInfo = itemsInfo.split("|").map((item: any) => {
    return item.split("-");
  });
  console.log("matrixItemsInfo", matrixItemsInfo, matrixItemsInfo.length);
  // return console.log(matrixItemsInfo.length);

  // update cells
  const rowCount = sheet.rowCount;
  await sheet.loadCells({
    startRowIndex: 0,
    endRowIndex: rowCount,
    startColumnIndex: 0,
    endColumnIndex: 5,
  });
  for (let i = 0; i <= matrixItemsInfo.length - 1; i++) {
    console.log(
      "for row",
      i + 2,
      matrixItemsInfo?.[i]?.[2],
      matrixItemsInfo?.[i]
    );
    // in sheet, index based column2 is price, column3 is in stock, column4 is shouldUpdate
    // in sheet, index based row0 is headers. use n + 1 to access actual row

    // if shouldUpdate is 0, skip
    if (sheet.getCell(i + 1, 4).value === 0) continue;

    sheet.getCell(i + 1, 2).value = matrixItemsInfo[i][2];
    sheet.getCell(i + 1, 3).value = matrixItemsInfo[i][1];
  }
  // sheet.getCell(1, 3).value = 'myname';
  await sheet.saveUpdatedCells();
  // console.log(sheet.getCell(1, 3).value);
  console.log("changes are saved");
}

// Function to chunk an array
function chunkArray(myArray: string[], chunk_size: number): string[][] {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
}
