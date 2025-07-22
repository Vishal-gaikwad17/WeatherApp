const { json } = require('body-parser');
const { log } = require('console');
const express = require('express');
const https = require("https");
const ejs = require('ejs');
const path = require('path');
const e = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

//home route
app.get("/",(req,res)=>{
    res.render("home");
})


//weather route
app.post("/weather",(req,res)=>{

    const city = req.body.city;
    const apiKey ='700f81da5624512fd66ad5746a08f578';
    //Base-url
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
 //getting api data
    https.get(url,function(response){

      if(response.statusCode == 200){

       response.on("data",(data)=>{
       const weatherData = JSON.parse(data);
        
       const temp = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const humidity = weatherData.main.humidity;
       const icon = weatherData.weather[0].icon;
       const imageURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

       const weather = {
        temp,
        weatherDescription,
        humidity,
       imageURL
       };

       res.render("weather",{
           weather,
       });
    
    })
    }
    else{
        res.render("weather",{weather:null,error:"city not found"});
    }
});

    
});



app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})