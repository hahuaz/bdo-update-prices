const { COOKIE_REQUEST_TOKEN, COOKIE_TRADE_SESSION, BDOY_REQUEST_TOKEN } =
  process.env;

export async function main() {
  let increaser = 4;
  for (let index = 1; index < 30; index += increaser) {
    if (index !== 1) increaser = 5;

    const data = await fetch(
      "https://eu-trade.naeu.playblackdesert.com/Home/GetWorldMarketList",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          origin: "https://eu-trade.naeu.playblackdesert.com",
          pragma: "no-cache",
          referer: "https://eu-trade.naeu.playblackdesert.com/Home/list/hot",
          "sec-ch-ua":
            '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
          "x-requested-with": "XMLHttpRequest",
          cookie: `__RequestVerificationToken=${COOKIE_REQUEST_TOKEN}; TradeAuth_Session=${COOKIE_TRADE_SESSION}; lang=en-US;`,
        },
        // use URLSearchParams for form-urlencoded content type
        body: new URLSearchParams({
          __RequestVerificationToken: BDOY_REQUEST_TOKEN as string,
          mainCategory: String(index),
          subCategory: "1",
        }),
      }
    );

    const json = await data.json();

    // if you exceed main or sub category, response will be { marketList: [], resultCode: 0, resultMsg: '' }
    console.log(json);
  }
}
