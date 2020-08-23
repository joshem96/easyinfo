
//sets background image and weather every four hours 
//TO DO: change to 1 hour for non-programmer version
setInterval(() => {
    console.log("update image and weather every four hours");
    getNasaImg();
    getWeather();

}, 14400000); 

//update time every 5 seconds
setInterval(() => {
    console.log("update time");
    insertCurrentTime();
}, 5000); 

// setTimeout(() => {
//     currentTime.twelveHour = moment(currentTime.twentyFourHour, ["HH.mm"]).format("hh:mm A");
//     currentTime.twelveHour = ridFirstZero(currentTime.twelveHour);
//     insertCurrentTime();
// },510,);

// setInterval(() => {
//     console.log("update time");
//     findTime();
//     currentTime.twelveHour = ridFirstZero(currentTime.twelveHour);
//     insertCurrentTime();
// }, 5000); 



