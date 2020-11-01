

//GLOBAL VARIABLES
//........................................................................................
    //GRID BOXES 
    var topBoxLeft = document.querySelector("#topBoxLeft");
    var topBoxRight = document.querySelector("#topBoxRight");
    var btmBoxLeft = document.querySelector("#btmBoxLeft");
    var btmBoxRight = document.querySelector("#btmBoxRight");
    var mainHeader = document.querySelector("header");

    var toggleBox = document.querySelector("section");

//DEVELOPER TOOLS
//..........................................................................................

    //KEYBOARD SHORTCUTS

        //THE GRID / GRID TOGGLE
        var gridToggleValue = 0;
        function gridToggle(){
            if (gridToggleValue === 0) {
                topBoxLeft.style.border = "";
                topBoxRight.style.border = "";
                btmBoxLeft.style.border = "";
                btmBoxRight.style.border = "";
                mainHeader.style.border = "";
                gridToggleValue = 1;
            }
            else {
                topBoxLeft.style.border = "transparent";
                topBoxRight.style.border = "transparent";
                btmBoxLeft.style.border = "transparent";
                btmBoxRight.style.border = "transparent";
                mainHeader.style.border = "transparent";
                gridToggleValue = 0;
            }
        }

        //force section hover on 
        function fakeHover(){
            if (!toggleBox.classList.contains("fakeSectionHover")){
                toggleBox.classList.add("fakeSectionHover");
            }
            else {
                toggleBox.classList.remove("fakeSectionHover");    
            }
        }

        //toggle between nasa image and backupimage
        function imageToggle(){
            stringToggle(nasaImage, nasaImage.src, "/", "Assets", "Assets/space_backup.jpeg", nasaImageUrl);
        }

        // !! DO NOT DELETE!!
        // //keyboard shortcuts
        // window.addEventListener("keypress",((e) => {
        //     //if user pressess I key
        //     //TOGGLE BACKGROUND BETWEEN API/BACKUP
        //     if (e.keyCode === 105){
        //         imageToggle();
        //     }

        //     //if user presses h key
        //     //FAKE HOVER ON SECTION 
        //     else if (e.keyCode === 104) {
        //         fakeHover(); 
        //     }

        //     //if user pressess g key
        //     //GRID TOGGLE 
        //     else if (e.keyCode === 103) {
        //         gridToggle(); 
        //     }
        // }));

    //RID ALL NUMBERS AFTER "." OR ":"
    //used to get rid of unessacary digits within time and temp value
    function ridNumbersAfterDecimal (numbers){ 
        var ogNumber = numbers;
        ogNumber = ogNumber.toString();
        var newNumber ="";

        //for loop through original number
        //once it hits a decimal point, break

        var charHop = 0;
        for(var i = 0; i < ogNumber.length; i++){ 
            if(ogNumber[i] === "." || ogNumber[i] === ":" && charHop === 1){
                if (ogNumber[i] === "."){
                    break;  
                } 
                else if (ogNumber[i] === ":"){
                    break;
                }
            }
            else{
                newNumber = newNumber + ogNumber[i];// so 1 + 6 would be 16
            }
            if (i === 4){
                charHop = 1;
            }
        }

        return newNumber
    }

    //RID FIRST 0 IF APPLICABLE FOR 12 HOUR TIME 
    function ridFirstZero(firstChar){
        if (firstChar[0] === "0"){
            var returnMe = "";
            for (var i = 0; i < firstChar.length; i++){
                if (i >= 1) {
                    returnMe = returnMe + firstChar[i]
                }
            }
            return returnMe; 
        }
    }

    //image toggle function
    //will toggle between 2 images depending on if a string contains a certain word
    function stringToggle(imageSourceNode, string, splitChar, certainWord, imageOne, imageTwo){
        if (string.split(splitChar || " ").includes(certainWord)){
            imageSourceNode.src = imageTwo;   
        }
        else {
            imageSourceNode.src = imageOne;
        }
    }

    //check if nasa image available (incase there is a problem with API)
    function nasaImageCheck(){
        setTimeout(() => {
            if (nasaImage.src.split("/").includes("undefined") || nasaImage.src.split("/").includes("video")  ) {
                nasaImage.src = "Assets/space_backup.jpeg";
            }
            else if (nasaImageUrl != undefined){
                if (nasaImageUrl.split(".").includes("nasa")){
                    nasaImage.src = nasaImageUrl;
                }
            }     
        }, 1000);
    }

    //consolelog function
    function consoleLog(string){
        console.log(string);
    }

//background image API
//........................................................................................
    //show nasa image, if error show backup image though catch/reject
    var nasaImage = document.querySelector("#nasaImage");
    var astronomyImage;
    var nasaImageUrl;
    var nasaAPIObject;
    //async await nasa image fetch code
    async function getNasaImg(){
        nasaAPIObject = await fetch("https://api.nasa.gov/planetary/apod?&api_key=wrD5MbnYM2YSAuALIoCjMMXDz9Cg36PZnKdX3t7D");
        nasaAPIObject = await nasaAPIObject.json();
        //debugger;
        nasaImageUrl = await nasaAPIObject.url;
        //if their is no NASA image available for today, show backup image
        (nasaAPIObject.code == 404) ? nasaImage.src = "Assets/space_backup.jpeg" : nasaImage.src = nasaImageUrl;
    }




