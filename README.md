# qpx-api

[![npm version](https://badge.fury.io/js/qpx-api.svg)](http://badge.fury.io/js/qpx-api) 

> An API wrapper for QPX (Google flights).

The QPX API is [described here](https://developers.google.com/qpx-express/v1/).

## Install

```bash
npm i qpx-api -S
```

## Usage

First, create an instance of the API client:

```javascript
var QPXApi = require('qpx-api');

var QPXApiClient = new QPXApi({
  api_key: 'your api key',
  timeout: 5000 // timeout in milleseconds
});
```

Then,

```javascript
var data = {
  passengers: { adultCount: 1 },
  slice: [
    {
      origin: "YUL",
      destination: "LAS",
      date: "2016-11-11"
    }
  ],
  "solutions": 1
};

QPXApiClient.search(data, function (err, jsonResponse) {
    
});
```

It can also return a Promise :

```javascript
QPXApiClient.search(data).then(function (jsonResponse) {
    
}).catch(function (err) {
    
});
```
