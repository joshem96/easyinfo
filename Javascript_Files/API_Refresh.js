
//sets background image and weather every four hours 
setInterval(() => {
    getNasaImg();
    if (typeof locationObject.latitude === "number"){
        console.log("update image and weather every four hours");
        getWeather();
    }
}, 14400000); 

//update time and check if nasa img every 5 seconds
setInterval(() => {
    insertCurrentTime();
    nasaImageCheck();
}, 5000); 




