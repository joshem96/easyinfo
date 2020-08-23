//Variables
//.............................................................
    // var timeAndDatePackage = require('date-and-time'); // NPM time-and-date package
    
    var time; // becomes string of raw new Date 
    var date; 
    var currentTime = { 
        format: "12",
        twentyFourHour:  "",
        twelveHour: ""
    }   
    var basicTime = "";
    var timeNode = document.querySelector("#timeValue");
    var dateNode = document.querySelector("#dateValue");
    var imperialDate;
    var metricDate;
//find current time
//.............................................................
    function findTime(){
        var timeNow = '';
        time = new Date;
        time = time.toTimeString();
        for (var i = 0; i < 8; i++){
            timeNow = timeNow + time[i];
        }
        //find basic time used for setting day/night value
        for (var i = 0; i < 2; i++){
            basicTime = basicTime + timeNow[i];
        } 
debugger;
        currentTime.twentyFourHour = ridNumbersAfterDecimal(timeNow);
        currentTime.twelveHour = moment(currentTime.twentyFourHour, ["HH.mm"]).format("hh:mm A");
        currentTime.twelveHour = ridFirstZero(currentTime.twelveHour);
        //12 hour time is handled by packages.js
    }

//insert current time into btmLeftBox
//.............................................................
    function insertCurrentTime(){
        findTime();
        timeNode.innerHTML = "";
        if (currentTime.format === "12"){
            timeNode.innerHTML = currentTime.twelveHour;
        }
        else {
            timeNode.innerHTML = currentTime.twentyFourHour;
        }
        dateNode.innerHTML = "";
        dateNode.innerHTML = findDateAndDay();
    }

    function findDateAndDay(){

        date = new Date;
        date = date.toString();
        let dateArray = date.split(" ");
        dateArray = dateArray.splice(0,3);

        var day = dateArray[0];
        var month = dateArray[1];
        var todayDate = dateArray[2];

        imperialDate = day + " " + month + " " + todayDate;
        metricDate = day + " " + todayDate + " " + month;

        return metricDate;
    }
    
    // var switchLabel = document.querySelectorAll(".switch-label");
    // switchLabel[1].dataOn === "24 Hour"

// //13:05 => 01:05 PM
// var twelveHourTime = date.transform(currentTime.twentyFourHour, 'HH:mm', 'hh:mm A');