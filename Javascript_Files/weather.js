//weather API
//......................................................................

    //query span tag(s) that will be inserted with users location weather
    var weatherTempText = document.querySelector("#tempvalue");
    var weatherIcon = document.querySelector("#weatherIcon");
    var windValue = document.querySelector("#windValue");
    var humidityValue = document.querySelector("#humidityValue");
    //query span tag(s) that will be inserted with users location string
    var weatherLocationNode = document.querySelector("#btmboxRight").firstChild;

    //objects that have pertaining data
    var weatherSpeed = {};
    // var weatherTempImperial;
    // var weatherTempMetric;
    var weatherTemp = {
        imperial: "",
        metric: ""
    }
    // var weatherData;
    var weatherData = {
        imperial: "",
        metric: ""
    }
    // var weatherDataImperial; 

//returns weather data 
    function getWeather(){

        //fetch MERTRIC WEATHER weather and location data
        weatherData.metric = fetch(" ")
            .then( res => res.json())
            .then( res => {

            weatherData.metric = res; 
            weatherTemp.metric = ridNumbersAfterDecimal(weatherData.metric.main.temp) 
            weatherTempText.innerHTML = weatherTemp.metric + "&#176" 
            //GET LOCATION 
            weatherLocationNode.innerHTML = weatherData.metric.name;
            setTimeout( () => findWeatherType(),200);//is it cloudy, raining etc
        });

        //fetch IMPERIAL weather and location data
        weatherData.imperial = fetch("https://api.openweathermap.org/data/2.5/weather?id=2158177&APPID=554c812328e8a00bd093b1dace78d432&units=imperial")
            .then( res => res.json())
            .then( res => { 

                weatherData.imperial = res;
                weatherTemp.imperial = ridNumbersAfterDecimal(weatherData.imperial.main.temp) 
                humidityValue.innerHTML = "Humidity " + weatherData.imperial.main.humidity + "&#37;" 
                weatherSpeed = {
                    imperial: ridNumbersAfterDecimal(weatherData.imperial.wind.speed) + " mph",
                    metric: setTimeout( () => {(ridNumbersAfterDecimal(weatherSpeed.imperial/0.62137))},300) + " km/h"
                }

                windValue.innerHTML = weatherSpeed.metric
        });
    }

//function that finds the weather type (raining, cloud, clear etc)
function findWeatherType (){

        //make fancy code that decides whether (lel) the images get night or day images
        var nightOrDay = ""
        if (basicTime > 7 && basicTime < 18){
            nightOrDay = "day";
        }
        else {
            nightOrDay = "night";
        }

        //if weather is cloudy
        if (weatherData.metric.weather[0].main === "Clouds"){
            //if the clouds.all data is less than 100, show sun/cloud img
            if (weatherData.metric.clouds.all > 50) {
                if (nightOrDay === "day"){
                    weatherIcon.src = "Assets/WeatherIcons/day_cloud_clear.svg";
                }
                else{
                    weatherIcon.src = "Assets/WeatherIcons/night_cloud.svg";
                }
            }
            //if clouds.all data is > 100 show only cloud image
            else if (weatherData.metric.clouds.all < 50){
                if (nightOrDay === "day" || nightOrDay === "night"){
                    weatherIcon.src = "Assets/WeatherIcons/cloud.svg";
                }
            }
        }

        //if weather is rainy
        if (weatherData.metric.weather[0].main === "Rain"){
            if (nightOrDay === "day"){
                weatherIcon.src = "Assets/WeatherIcons/raining.svg"
            }
            else{
                weatherIcon.src = "Assets/WeatherIcons/night_rain.svg"
            }
        }

        //if weather is clear
        if (weatherData.metric.weather[0].main === "Clear"){
            if (nightOrDay === "day"){
                weatherIcon.src = "Assets/WeatherIcons/day_clear.svg"
            }
            else{
                weatherIcon.src = "Assets/WeatherIcons/night_clear.svg"
            }
        } 
    }

