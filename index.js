const PORT = 5000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

let phone = 'samsung s21';
var phoneQueriedOlx = phone.replace(/\s+/g, '-').toLowerCase();
const urlSearchOlx = `https://www.olx.ro/electronice-si-electrocasnice/telefoane-mobile/cluj-napoca/q-${phoneQueriedOlx}/?currency=RON&search%5Border%5D=filter_float_price:desc`;

axios(urlSearchOlx)
    .then(response => {
        try{
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];
        $('.css-1sw7q4x', html).each(function(){
           let title = $(this).find('.css-16v5mdi').text().trim();
           let priceText = $(this).find('.css-10b0gli').children().remove().end().text();
           let price = priceText.split(' ').slice(0,-1).join();
           let moneda_schimb = priceText.split(' ').slice(-1).join();
           console.log(moneda_schimb, price)
           let locationAndDate = $(this).find('.css-veheph').text().split(" ");
           let urlRaw =  $(this).find('a').attr('href');
           if (urlRaw == undefined) {
            urlRaw = ''
           }
           let url = `https://www.olx.ro${urlRaw}`;
           if (locationAndDate.length > 2) {
                var location = locationAndDate[0];
                var date = locationAndDate.slice(2).join('-');
           }

           if (price || date) {
            articles.push({title, price, moneda_schimb, location, date, url})
           }
           
            
        })
       console.log(articles);

        }
        catch (error) {
            console.log(error);
        }
    })
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));