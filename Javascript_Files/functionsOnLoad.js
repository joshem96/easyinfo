setTimeout(() => {
    getNasaImg();
    getGeoLocation();
    findTime();
    //insert weather once user accepts to share location
    var insertData = setInterval(() => {
        if (typeof locationObject.latitude === "number"){
            getWeather(); 
                locationNode.style.width = "";
            if (locationNode.offsetWidth >= 67){
                locationNode.style.width = "60px";
                locationNode.style.top = "-6px";
            }
            else {
                locationNode.style.width = "67";
                locationNode.style.top = "";
            }
            clearInterval(insertData);
        }   
    }, 500);
},100,);
