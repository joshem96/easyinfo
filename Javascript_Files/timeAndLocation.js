//Variables
//.............................................................
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
        basicTime = ""; 
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
        currentTime.twentyFourHour = ridNumbersAfterDecimal(timeNow);
        // setTimeout(() => {
            currentTime.twelveHour = moment(currentTime.twentyFourHour, ["HH.mm"]).format("hh:mm A");
            if (currentTime.twelveHour[0] === "0"){
                currentTime.twelveHour = ridFirstZero(currentTime.twelveHour);  
            }        
        // }, 300);

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
    
//LOCATION SELECTOR
//.......................................................
    var locationSelector = document.querySelector(".locationSelector");
    var locationNode = document.querySelector(".locationNode");

    //when location toggle handle clicked..
    radio[2].addEventListener("click",( (e) => { 
        //temporarily disable handle
        e.target.style = "pointer-events: none";
        setTimeout(() => {
            e.target.style = "";
        }, 1000);

        locationToggle();
    }));
    
    //switch between viewing current chosen location and changing it
    function locationToggle(){ 
        //viewing location => changing location (toggle)
        if (locationNode.classList.contains("on")){

            //transition method
            locationNode.style.opacity = 0;
            setTimeout(() => {
                locationNode.classList.remove("on");
            }, 150);
            setTimeout(() => {
                locationSelector.classList.add("on");
            }, 160);
            setTimeout(() => {
                locationSelector.style.opacity = 1;  
            }, 170);

            locationSelector.value = "";

        }
        //changing location => viewing location (toggle)
        else if (locationSelector.classList.contains("on")){

            //transition method
            locationSelector.style.opacity = 0;
            setTimeout(() => {
                locationSelector.classList.remove("on");
            }, 150);
            setTimeout(() => {
                locationNode.classList.add("on");
                locationNode.style.opacity = 1;  
            }, 190);

            //only change location if locationSelector value is greater than 2
            if (locationSelector.value.length > 1){
                locationNode.innerHTML = locationSelector.value; //currentCity;
                locationNode.style.width = "";
                locationNode.style.whitespace = "nowrap";

                //change the name of city in btm right box 
                weatherLocationNode.innerHTML = locationNode.innerText;

                //remove spaces from string to calculate width 
                var nodeString = locationNode.innerText.toString().split(" ");
                if(nodeString[1]){
                    nodeString.forEach((item) => {
                        if (item === nodeString[0]){
                            nodeString = item.toString();
                        }
                        else{
                            nodeString = nodeString + item.toString();
                        }
                    })
                    locationNode.innerHTML = nodeString;
                }

                //change width of locationNode depending on length of users chosen location
                //this keeps the text in the center of the box at all times
                //for long words
                if (locationNode.offsetWidth >= 67){
                    locationNode.style.whitespace = "";
                    locationNode.style.width = "60px";
                    locationNode.style.top = "-6px";
                    locationNode.innerHTML = locationSelector.value;
                }
                //for short words
                else {
                    locationNode.style.whitespace = "";
                    locationNode.style.width = "67";
                    locationNode.style.top = "";
                    locationNode.innerHTML = locationSelector.value;
                }
            }
        } 
    }


