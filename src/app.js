const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyPaser = require('body-parser');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));
app.use(bodyPaser.urlencoded({extended: true}));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Yasha',
        footerMessage: 'Copywrite Snowpaw Studios'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Yasha',
        footerMessage: 'Copywrite Snowpaw Studios'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help page",
        message: "This is the awesome help page",
        name: "Yasha",
        footerMessage: 'Copywrite Snowpaw Studios'
    })
})

// WEATHER API STUFF!!
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        });
    }
    //address search
    const location = req.query.address;
    
    geocode(location, (error, data)=>{
            if(error){
               return res.send({error});
            }
    
            forecast(data.latitude, data.longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error});
                }

                res.send({
                    location: data.location,
                    forecast: forecastData.message,
                    address: location
                })
                               
            });
            
        });   

});




app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term!'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        message: 'This help page does not exist!',
        footerMessage: 'Copyright Snowpaw Studios'
    });
});

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        message: 'This page does not exist on the server!',
        footerMessage: 'Copywrite Snowpaw Studios'
    });
});

app.listen(port, ()=>{
    console.log(`Server up on port ${port}.`);
});
