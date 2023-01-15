# Marketplace Api For Massive MMORPG

## About Project

- BDO's cooking system is massive. Which recipe gives you more money or what's the money per-hour is always dynamic in the game because of market place's auction system. To prevent manual calculation everytime, which is obviously overwhelming, I created this project.
- Note that this is for personal use and is not intended to harm the game mechanics..

## Before Usage

- You need the provide your own envrionment variables. Required envrionment variables can be found in [.env.example](.env.example).
- How the sheet template should be structured is shown [example.xlsx](example.xlsx). You can provide your own item IDs.

## Scrape json response

```json
{
  "marketList": [
    {
      "mainKey": 10003,
      "sumCount": 0,
      "name": "Elsh Longsword",
      "grade": 1,
      "minPrice": 72000
    },
    {
      "mainKey": 10005,
      "sumCount": 0,
      "name": "Azwell Longsword",
      "grade": 1,
      "minPrice": 163000
    },
    {
      "mainKey": 10006,
      "sumCount": 0,
      "name": "Ain Longsword",
      "grade": 1,
      "minPrice": 302000
    },
    {
      "mainKey": 10007,
      "sumCount": 7,
      "name": "Seleth Longsword",
      "grade": 1,
      "minPrice": 46500
    }
  ],
  "resultCode": 0,
  "resultMsg": ""
}
```
