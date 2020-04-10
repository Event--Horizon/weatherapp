const path = require("path");
const express = require('express');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000

// Custom modules
const forecast = require("./utils/forecast");
const geocode = require("./utils/geoCode");

// Define views for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views") 
const partialsPath = path.join(__dirname, "../templates/partials") 

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "Me Me "
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About",
    name: "Me Me "
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "HELP",
    name: "Me Me ",
    message: "my message to you"
  })
})

app.get('/help/*', (req, res) => {
  res.render('help', {
    title: "404",
    name : "me me",
    message: "404 Help Article Not Found"
  })

})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error : "Please provide and address"
    })
  }

  geocode(req.query.address, (error, {lat, long, location} = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }

    forecast(lat, long, (error, forceCastData) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        forecast: forceCastData,
        location: location,
        address: req.query.address
      });
    });
  });


})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query);
  res.send({
    products : "No Prods"
  });
})

app.get('*', (req, res) => {
  res.render('help', {
    title: "404",
    name : "me me",
    message: "404 Page Not Found"
  })
})

app.listen(PORT, () => {
  console.log('Server is up on port ' + PORT);
})