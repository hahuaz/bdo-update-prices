import axios from "axios";

/**
 * @param {string} ids - comma seperated string of item ids max 10
 *  */
export async function getItems(ids: any) {
  const item = await axios({
    url: "https://eu-trade.naeu.playblackdesert.com/Trademarket/GetWorldMarketSearchList",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "BlackDesert",
    },
    data: {
      searchResult: ids,
    },
  });

  return item.data.resultMsg;
}
