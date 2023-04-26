const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const crypto = require("crypto");

const app = require("express")();
app.use(require("cors")());

const id = crypto.randomBytes(16).toString("hex");

/* let city = 'cluj-napoca'
  let priceMin = 150;
  let priceMax = undefined;
  let phone = 'samsung-s21';
  var priceFilterOlx = `&search%5Bfilter_float_price:from%5D=${priceMin}&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
  var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc`;
  if (city) {
    var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc`;
    if (priceMin > 0 && priceMax > 0) {
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc${priceFilterOlx}`;
    }
    if (priceMin > 0 && priceMax === undefined) {
      var priceFilterOlx = `search%5Bfilter_float_price%3Afrom%5D=${priceMin}&search%5Border%5D=filter_float_price%3Aasc&view=list`;
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&${priceFilterOlx}`;
    }
  
    if (priceMin === undefined && priceMax > 0) {
      var priceFilterOlx = `search%5Border%5D=filter_float_price:asc&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&${priceFilterOlx}`;
    }
  }
  if (!city) {
    if (priceMin > 0 && priceMax > 0) {
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc${priceFilterOlx}`;
    }
    if (priceMin > 0 && priceMax === undefined) {
      var priceFilterOlx = `search%5Bfilter_float_price%3Afrom%5D=${priceMin}&search%5Border%5D=filter_float_price%3Aasc&view=list`;
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&${priceFilterOlx}`;
    }
  
    if (priceMin === undefined && priceMax > 0) {
      var priceFilterOlx = `search%5Border%5D=filter_float_price:asc&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&${priceFilterOlx}`;
    }
  }
 
 const promise1 = axios(urlSearchOlx);

 const olx = Promise.all([promise1]).then((resolve) =>{

      const data = resolve[0].data;
      const $ = cheerio.load(data);
      let articlesOlx = [];
      const locationOlx = {
        location: "Olx",
        articles: articlesOlx,
      };
      $(".css-1sw7q4x", data).each(function () {
        let id_ = id;
        let title = $(this).find(".css-16v5mdi").text().trim();
        let priceText = $(this)
          .find(".css-10b0gli")
          .children()
          .remove()
          .end()
          .text();
        let price = priceText.split(" ").slice(0, -1).join().replace(',', '');
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
          articlesOlx.push([{
            id_,
            title,
            price,
            moneda_schimb,
            location,
            date,
            url,
          }]);
        }
      }); 
      return(locationOlx.articles[0]);


 })

 console.log(olx); */

app.get("/", (req, res) => {
  res.status(200).send("<h1>James' Stock Data API</h1>");
});
app.get("/city", async (req, res) => {
  let { city, phone } = req.params;
  let { priceMin, priceMax } = req.query;

  try {
    city = "cluj-napoca";
    priceMin = 150;
    priceMax = undefined;
    phone = "samsung-s21";
    priceFilterOlx = `&search%5Bfilter_float_price:from%5D=${priceMin}&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
    urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc`;
    if (city) {
      var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc`;
      if (priceMin > 0 && priceMax > 0) {
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc${priceFilterOlx}`;
      }
      if (priceMin > 0 && priceMax === undefined) {
        var priceFilterOlx = `search%5Bfilter_float_price%3Afrom%5D=${priceMin}&search%5Border%5D=filter_float_price%3Aasc&view=list`;
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&${priceFilterOlx}`;
      }

      if (priceMin === undefined && priceMax > 0) {
        var priceFilterOlx = `search%5Border%5D=filter_float_price:asc&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/${city}/q-${phone}/?currency=RON&${priceFilterOlx}`;
      }
    }
    if (!city) {
      if (priceMin > 0 && priceMax > 0) {
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&search%5Border%5D=filter_float_price:asc${priceFilterOlx}`;
      }
      if (priceMin > 0 && priceMax === undefined) {
        var priceFilterOlx = `search%5Bfilter_float_price%3Afrom%5D=${priceMin}&search%5Border%5D=filter_float_price%3Aasc&view=list`;
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&${priceFilterOlx}`;
      }

      if (priceMin === undefined && priceMax > 0) {
        var priceFilterOlx = `search%5Border%5D=filter_float_price:asc&search%5Bfilter_float_price:to%5D=${priceMax}&view=list`;
        var urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/q-${phone}/?currency=RON&${priceFilterOlx}`;
      }
    }

    const promise1 = axios(urlSearchOlx);

    const olxInfo = Promise.all([promise1]).then((resolve) => {
      const data = resolve[0].data;
      const $ = cheerio.load(data);
      let articlesOlx = [];
      $(".css-1sw7q4x", data).each(function () {
        let id_ = id;
        let title = $(this).find(".css-16v5mdi").text().trim();
        let priceText = $(this)
          .find(".css-10b0gli")
          .children()
          .remove()
          .end()
          .text();
        let price = priceText.split(" ").slice(0, -1).join().replace(",", "");
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
          articlesOlx.push([
              {
              id_,
              title,
              price,
              moneda_schimb,
              location,
              date,
              url,
            }]
          );
        }
      });

      res.status(200).send({
        olx: articlesOlx
      }
      )
      

    });
  } catch (error) {
    console.log(error);
  }
});

//two apis for the normal and the filter

app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
