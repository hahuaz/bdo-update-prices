# Marketplace API for Massive MMORPG  

## About the Project  

BDO's cooking system is complex, and calculating which recipe generates the most profit or the best money-per-hour can be overwhelming due to the dynamic marketplace auction system. To eliminate the need for manual calculations, I created this project.  

This tool is for **personal use only** and is **not intended to interfere with game mechanics or violate any terms of service**. If BDO staff deems any actions harmful, cloud computing will help to prevent the risk of an IP ban.  

## Setup & Requirements  

- You must provide your own environment variables. The required variables are listed in the [.env.example](.env.example) file.  
- The correct spreadsheet template structure is demonstrated in [example.xlsx](example.xlsx). You can customize it by adding your own item IDs.  

## Scrape json response
Following is an example of the json response from the marketplace API.

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
