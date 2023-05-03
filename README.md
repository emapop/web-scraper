# web-scraper
Disclaimer: !This is an educational tool only, and it must not be used by others!
Description:
This is a web scraper app that will help you look for any phone on OLX regardless of the location. 
I developed this app because I wanted to do something similar to Compari.ro but for second-hand phone devices. 
I implemented 1 main API that will receive data from the OLX server.
This app is still in development phase, mostly from this project I learned how to work with hoisting, closure and promises in a node.js asynchronous environment.
I also designed the entire code and the data object architecture, and the app work ass follow:
first the api is called and I retrive the olx search data page, 
after I use cheerios to loop trought the DOM elements and find the correct css classes that will give me the html, 
I am afterwards looping trough the html using inbuild methods and design the correct structure
that will show me the data from the html in a structured way and I am pushing it into an object.
After this process I can mimic the olx search from the API that I built, I repeat.
This app was made only so I can learn programming concepts
and will not be used for comercial needs or published anywhere without any consent of olx storing it's data.
