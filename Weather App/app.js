const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');
const { response } = require("express");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render('home');
});

app.post("/", (req, res) => {
    const cityName = req.body['city-name'],
    units = req.body.tempMeasure,
    appid = "c3d19ea65b79a7dd5fca50e6ff9323e5",
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&appid=' + appid + '&units=' + units;
    const futureForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + '&units=' + units + '&appid=' + appid;
    let mainDiv = document.createElement('div');

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data),
            cityName = weatherData.name,
            temp = weatherData.main.temp,
            humidity = weatherData.main.humidity,
            pressure = weatherData.main.pressure,
            windSpeed = weatherData.wind.speed,
            desc = weatherData.weather[0].description,
            icon = weatherData.weather[0].icon,
            imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            let todayDiv = document.createElement('div'),
            imageDiv = document.createElement('div'),
            imgSection = document.createElement('img', {src: imageURL}),
            dataDiv = document.createElement('div'),
            cityNameSection = document.createElement('h2'),
            tempSection = document.createElement('p'),
            pressureSection = document.createElement('p'),
            humiditySection = document.createElement('p'),
            windSpeedSection = document.createElement('p'),
            descSection = document.createElement('p'),
            unit = units === "Celsius" ? "<sup>o</sup>C" : units === "Kelvin" ? "K" : "<sup>o</sup>F",
            windUnit = units === "Fahrenheit" ? "miles/hour" : "meter/sec";

           
            cityNameSection.innerText = "City " + cityName;
            tempSection.innerText = "Temperature " + temp + unit;
            pressureSection.innerText = "Pressure " + pressure + "hPa";
            humiditySection.innerText = "Humidity " + humidity + "%";
            windSpeedSection.innerText = "Wind Speed " + windSpeed + windUnit;
            descSection.innerText = "Weather Descripation " + desc;

            imageDiv.append(imgSection);

            dataDiv.append(cityNameSection);
            dataDiv.append(tempSection);
            dataDiv.append(pressureSection);
            dataDiv.append(humiditySection);
            dataDiv.append(windSpeedSection);
            dataDiv.append(descSection);

            todayDiv.append(imageDiv);
            todayDiv.append(dataDiv);

            mainDiv.append(todayDiv);

        })
    });
    
    https.get(futureForecastURL, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            let i = weatherData.list.length - 6,
            futureForecastSection = document.createElement('div');
            // console.log(weatherData.list[0]);
            let weatherList = [];
            for(; i >= 0; i -= 8){
               weatherList.push(weatherData.list[i]);
            }
            for(i = weatherList.length - 1; i >= 0; i--){
                let icon = weatherList[i].weather.icon,
                imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
             }
        });
    })

})

app.listen(3000, () =>{
    console.log("Server Start...");
})
