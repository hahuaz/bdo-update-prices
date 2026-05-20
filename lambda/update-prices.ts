import { getSheet } from "./helpers/spreadsheet";
import { getItems } from "./helpers/itemPrice";

export async function main() {
  const sheet = await getSheet();
  // get prices from bdo
  const rows = await sheet.getRows();
  const itemIDs = <any>[];
  rows.forEach((row) => {
    const val = row.get("item id");
    if (val) {
      itemIDs.push(String(val).trim());
    }
  });

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
  
  // Create a map of item ID to its API data for fast and order-independent lookup
  const itemPriceMap = new Map<string, { price: string; stock: string }>();
  for (const item of matrixItemsInfo) {
    if (item.length >= 3) {
      const id = item[0];
      const stock = item[1];
      const price = item[2];
      itemPriceMap.set(id, { price, stock });
    }
  }

  // update cells
  const rowCount = sheet.rowCount;
  await sheet.loadCells({
    startRowIndex: 0,
    endRowIndex: rowCount,
    startColumnIndex: 0,
    endColumnIndex: 5,
  });

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const itemId = String(row.get("item id") || "").trim();
    const rowIndex = i + 1; // row 0 is header

    // if shouldUpdate is 0, skip
    if (sheet.getCell(rowIndex, 4).value === 0) continue;

    if (!itemId) continue;

    const apiItem = itemPriceMap.get(itemId);
    if (apiItem) {
      console.log(
        `Updating row ${rowIndex + 1} (Item ID: ${itemId}) -> Price: ${apiItem.price}, Stock: ${apiItem.stock}`
      );
      sheet.getCell(rowIndex, 2).value = apiItem.price;
      sheet.getCell(rowIndex, 3).value = apiItem.stock;
    } else {
      console.log(`No API data found for row ${rowIndex + 1} (Item ID: ${itemId})`);
    }
  }

  await sheet.saveUpdatedCells();
  console.log("changes are saved");
}

// Function to chunk an array without mutating the original
function chunkArray(myArray: string[], chunk_size: number): string[][] {
  const results = [];
  const arrayCopy = [...myArray];

  while (arrayCopy.length) {
    results.push(arrayCopy.splice(0, chunk_size));
  }

  return results;
}
