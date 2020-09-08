
//sets background image and weather every four hours 
//TO DO: change to 1 hour for non-programmer version
setInterval(() => {
    getNasaImg();
    if (typeof locationObject.latitude === "number"){
        console.log("update image and weather every four hours");
        getWeather();
    }
}, 14400000); 

//update time every 5 seconds
setInterval(() => {
    insertCurrentTime();
    nasaImageCheck();
}, 5000); 



