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

//clear loading wheel once all content has loaded
var loadWheel = document.querySelector(".loading-wheel");
var clearLoad = setInterval(() => {
    var loaded = [timeNode, locationNode, dateNode, weatherTemp.metric, windValue, humidityValue].every( (node) => node.innerText != "");
    if (loaded == true){
        document.querySelectorAll(".info-block").forEach( (item) => item.style = "") ;
        [loadWheel, loadWheel.parentElement].forEach( (item) => item.style = "display: none" );
        clearInterval(clearLoad);
    }   
}, 100);
