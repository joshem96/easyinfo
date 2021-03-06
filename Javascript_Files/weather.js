//weather API
//......................................................................

    //GET GEOLOCATION FROM USER
    //...............
        var locationObject = {
            latitude: "",
            longitude: "",
            name: "" 
        } 
        var fetchWeatherData;
        function getGeoLocation(){
            if ("geolocation" in navigator){ 
                navigator.geolocation.getCurrentPosition( (position) => {
                    locationObject.latitude = position.coords.latitude 
                    locationObject.longitude = position.coords.longitude
                    fetchWeatherData = 
                    "https://api.openweathermap.org/data/2.5/weather?lat="
                    + locationObject.latitude 
                    + "&lon=" 
                    + locationObject.longitude
                    + "&APPID=554c812328e8a00bd093b1dace78d432&units=";
                });
            }
            else {
                consoleLog("location unavailable");
            }
        }

    //WEATHER API FUCNTION, OBJECTS AND VARIABLES
    //...............

        //query span tag(s) that will be inserted with users location weather
        var weatherTempText = document.querySelector("#tempvalue");
        var weatherIcon = document.querySelector("#weatherIcon");
        var windValue = document.querySelector("#windValue");
        var humidityValue = document.querySelector("#humidityValue");
        //query span tag(s) that will be inserted with users location string
        var weatherLocationNode = document.querySelector("#currentLocation");

        // weather objects that have pertaining data
        var weatherSpeed = { };
        var weatherTemp = {
            imperial: "",
            metric: ""
        }
        var weatherData = {
            imperial: "",
            metric: ""
        }

        //return weather data from API and insert relevant INNERHTML
        function getWeather(){
            // getGeoLocation();
            //fetch MERTRIC WEATHER weather and location data
            weatherData.metric = fetch(fetchWeatherData + "metric")
                .then( res => res.json())
                .then( res => {
                    weatherData.metric = res; 
                    weatherTemp.metric = ridNumbersAfterDecimal(weatherData.metric.main.temp);
                    weatherLocationNode.innerHTML = weatherData.metric.name;
                    locationNode.innerHTML = weatherData.metric.name;
                    //setTimeout( () => findWeatherType(),200);//is it cloudy, raining etc
                    findWeatherType(); //is it cloudy, raining etc
                    //insert weather values depending on which system is in place
                    windValue.innerHTML = (currentMeasurement === "metric") ? weatherSpeed.metric : weatherSpeed.imperial;
                    weatherTempText.innerHTML = (currentMeasurement === "metric") ? weatherTemp.metric + "&#176" : weatherTemp.imperial + "&#176";
                    (locationNode.offsetWidth >= 67) ? locationNode.style.width = "60px" : locationNode.style.width = "67";
                    (locationNode.offsetWidth >= 67) ? locationNode.style.top = "-6px" : locationNode.style.top = "";
                });

            //fetch IMPERIAL weather and location data
            weatherData.imperial = fetch(fetchWeatherData + "imperial")
                .then( res => res.json())
                .then( res => { 
                    weatherData.imperial = res;
                    weatherTemp.imperial = ridNumbersAfterDecimal(weatherData.imperial.main.temp);
                    humidityValue.innerHTML = "Humidity " + weatherData.imperial.main.humidity + "&#37;";
                    weatherSpeed = {
                        imperial: ridNumbersAfterDecimal(weatherData.imperial.wind.speed) + " mph",
                        metric: ridNumbersAfterDecimal(weatherData.imperial.wind.speed/0.62137) + " km/h"
                    }
                    //insert weather values depending on which system is in place
                    windValue.innerHTML = (currentMeasurement === "metric") ? weatherSpeed.metric : weatherSpeed.imperial;
                    weatherTempText.innerHTML = (currentMeasurement === "metric") ? weatherTemp.metric + "&#176" : weatherTemp.imperial + "&#176";
                    (locationNode.offsetWidth >= 67) ? locationNode.style.width = "60px" : locationNode.style.width = "67";
                    (locationNode.offsetWidth >= 67) ? locationNode.style.top = "-6px" : locationNode.style.top = "";
                });
            
                //TO DO:
                //find out why the below code didnt work. it was almost as if the weatherdata.metric fetch was skipped cause it took too long
                //then went on .then to the code below? strange.

            // //insert weather values depending on which system is in place
            // .then( () => {
            // windValue.innerHTML = (currentMeasurement === "metric") ? weatherSpeed.metric : weatherSpeed.imperial;
            // weatherTempText.innerHTML = (currentMeasurement === "metric") ? weatherTemp.metric + "&#176" : weatherTemp.imperial + "&#176";
            // // //debugger;
            // // if (weatherTempText.innerHTML < 1){
            // //     debugger;
            // // }
            // // console.log("result:" + weatherTempText.innerHTML);
            // // weatherTempText.innerHTML = weatherTempText.innerHTML + "&#176";
            // });
        }

        //function that finds the weather type (raining, cloud, clear etc) & inserts pertaining image
        function findWeatherType (){

            //fancy code that decides if the images get night or day images
            var nightOrDay = (basicTime > 7 && basicTime < 18) ? nightOrDay = "day" : nightOrDay = "night";
            
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




