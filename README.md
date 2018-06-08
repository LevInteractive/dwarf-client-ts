# Dwarf Client Javascript

Consumer for [Dwarf URL Shortener server](https://github.com/LevInteractive/dwarf).

## Install

```bash
npm install dwarf-client-javascript
```

## Usage

```javascript
const { shorten, batchShorten } = require("dwarf-client-javascript");

// From your Dwarf server
const apiUrl = "http://localhost:3001";
const apiKey = "9c10936a9c23a7e48397f43dbf5d8159";

(async function main() {
  /**
   * Single request
   */
  let shortUrl = await shorten(apiUrl, apiKey, "http://longurl.example.com");
  console.log("SINGLE", shortUrl);
  // Output:
  // SINGLE http://localhost:3001/43e

  /**
   * Single request with fixed code
   */
  shortUrl = await shorten(
    apiUrl,
    apiKey,
    "http://longurl-fixed.example.com",
    "fixed"
  );
  console.log("SINGLE FIXED", shortUrl);
  // Output:
  // SINGLE FIXED http://localhost:3001/fixed

  /**
   * Single request with expanded return
   */
  shortUrl = await shorten(
    apiUrl,
    apiKey,
    "http://longurl.example.com",
    null,
    true
  );
  console.log("SINGLE EXPANDED", shortUrl);
  // Output:
  // SINGLE EXPANDED {
  //   longUrl: 'http://longurl.example.com',
  //   shortUrl: 'http://localhost:3001/43e'
  // }

  /**
   * Batch request
   */
  let urls = await batchShorten(apiUrl, apiKey, [
    "http://longurl1.example.com",
    "http://longurl2.example.com",
    "http://longurl3.example.com"
  ]);
  console.log("BATCH", urls);
  // Output:
  // BATCH [
  //   'http://localhost:3001/43c',
  //   'http://localhost:3001/43d',
  //   'http://localhost:3001/43b'
  // ]

  /**
   * Batch request with expanded return
   */
  urls = await batchShorten(
    apiUrl,
    apiKey,
    [
      "http://longurl1.example.com",
      "http://longurl2.example.com",
      "http://longurl3.example.com"
    ],
    true
  );
  console.log("BATCH EXPANDED", urls);
  // Output:
  // BATCH EXPANDED [
  //   {
  //     longUrl: 'http://longurl1.example.com',
  //     shortUrl: 'http://localhost:3001/43c'
  //   },
  //   {
  //     longUrl: 'http://longurl2.example.com',
  //    shortUrl: 'http://localhost:3001/43d'
  //   },
  //   {
  //     longUrl: 'http://longurl3.example.com',
  //     shortUrl: 'http://localhost:3001/43b'
  //   }
  // ]
})();
```
