setTimeout(() => {
    getNasaImg();
    getGeoLocation();
    findTime();
    //insert weather once user accepts to share location
    var insertData = setInterval(() => {
        if (typeof locationObject.latitude === "number"){
            getWeather(); 
            //debugger;
            //add additonal styling to location text depending on the length of api location string
            clearInterval(insertData);
        }   
    }, 500);
},100,);
