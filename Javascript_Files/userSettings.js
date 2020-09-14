//TIME AND MEASUREMENT TOGGLES
//............................................................................................
    var currentMeasurement = "metric";
    var measurementToggle = document.querySelectorAll(".switch-label");
    var radio = document.querySelectorAll(".switch-handle");

    radio[0].addEventListener("click",changeMeasurement);
    radio[1].addEventListener("click",changeMeasurement);

    function changeMeasurement(e){
        if (e.target.id ==="measurement"){
            if (currentMeasurement === "metric"){
                weatherTempText.innerHTML = weatherTemp.imperial + "&#176";
                currentMeasurement = "imperial";
                windValue.innerHTML = weatherSpeed.imperial
            }
            else if (currentMeasurement === "imperial"){
                weatherTempText.innerHTML = weatherTemp.metric + "&#176"; 
                currentMeasurement = "metric"; 
                windValue.innerHTML = weatherSpeed.metric
            }
        }

        if (e.target.id ==="time"){
            if (currentTime.format === "12"){
                timeNode.innerHTML = currentTime.twentyFourHour;
                currentTime.format = "24";
            }
            else if (currentTime.format === "24"){ 
                timeNode.innerHTML = currentTime.twelveHour;
                currentTime.format = "12";
            }
        }
    }

    var timeLabel = document.querySelector(".timeLabel");
    var measurementLabel = document.querySelector(".measurementLabel");
    var locationLabel = document.querySelector(".locationLabel");

    timeLabel.addEventListener("click",toggleBugFix);
    measurementLabel.addEventListener("click",toggleBugFix);
    locationLabel.addEventListener("click",toggleBugFix);

    //makes the toggle only actionable via radio
    function toggleBugFix(e){ 
        if (e.target.id === "switchLabel" && !e.target.classList.contains
        (measurementToggle[0] || measurementToggle[1] || measurementToggle[2] /* || locationNode  || locationSelector*/)){
            e.preventDefault();
        }
    }

//LOCATION SELECTOR TOGGLE
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

