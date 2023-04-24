const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const crypto = require("crypto");

const app = express();

const id = crypto.randomBytes(16).toString("hex");

let phone = 'samsung s21';
let priceMin = undefined;
let priceMax = 1500;
let phoneQueriedOlx = phone.replace(/\s+/g, "-").toLowerCase();
var priceFilterOlx = `&search%5Bfilter_float_price:from%5D=${priceMin}&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`
var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/cluj-napoca/q-${phoneQueriedOlx}/?currency=RON&search%5Border%5D=filter_float_price:asc`;
//two apis for the normal and the filter
if (priceMin > 0 && priceMax > 0) {
    var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/cluj-napoca/q-${phoneQueriedOlx}/?currency=RON&search%5Border%5D=filter_float_price:asc${priceFilterOlx}`;
}
if (priceMin > 0 && priceMax === undefined) {
var priceFilterOlx = `search%5Bfilter_float_price%3Afrom%5D=${priceMin}&search%5Border%5D=filter_float_price%3Aasc&view=list`;
var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/cluj-napoca/q-${phoneQueriedOlx}/?currency=RON&${priceFilterOlx}`;
}

if (priceMin === undefined && priceMax > 0) {
    var priceFilterOlx = `search%5Border%5D=filter_float_price:asc&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
    var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/cluj-napoca/q-${phoneQueriedOlx}/?currency=RON&${priceFilterOlx}`;
    }


axios(urlSearchOlx).then((response) => {
  try {
    const html = response.data;
    const $ = cheerio.load(html);
    let articlesOlx = [];
    const locationOlx =
        {
          location: "Olx",
          articles: articlesOlx,
        };
    $(".css-1sw7q4x", html).each(function () {
      let id_ = id;
      let title = $(this).find(".css-16v5mdi").text().trim();
      let priceText = $(this).find(".css-10b0gli").children().remove().end().text();
      let price = priceText.split(" ").slice(0, -1).join();
      let moneda_schimb = priceText.split(" ").slice(-1).join();
      let locationAndDate = $(this).find(".css-veheph").text().split(" ");
      let urlRaw = $(this).find("a").attr("href");
      if (urlRaw == undefined) {
        urlRaw = "";
      }
      let url = `https://www.olx.ro${urlRaw}`;
      if (locationAndDate.length > 2) {
        var location = locationAndDate[0];
        var date = locationAndDate.slice(2).join("-");
      }

      if (price || date) {
        articlesOlx.push({id_, title, price, moneda_schimb, location, date, url });
      }
    });
    console.log(locationOlx);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
