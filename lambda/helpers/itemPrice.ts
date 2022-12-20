import axios from 'axios';

export async function getItems(ids: any) {
  const item = await axios({
    url: 'https://trade.tr.playblackdesert.com/Trademarket/GetWorldMarketSearchList',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'BlackDesert',
    },
    data: {
      searchResult: ids /* ids should be string by comma seperated */,
    },
  });

  return item.data.resultMsg;
}
