/* Internal values */

let headlineArray = []

let headlineArrayLower = [] 

let link = ""

let resultMins = 0

let resultSecs = 0

const RESULT_PTAG = document.getElementById("cross")

const GUESS_BOX = document.getElementById("guess_box")

const GUESS_BUTTON = document.getElementById("submit_button")

const zeroth_millisec = new Date().getTime()

/* Making boxes unavailable */

GUESS_BOX.disabled = true;
GUESS_BUTTON.disabled = true;


/* External values */

/* fetch initiates the process of getting the information from the API
.then(api_response) returns the promise of data from the URL. (It takes time to get the data)
.then(json_response) returns the data in .json format (it takes time to get the data)
Both retieving data and converting data takes time. That's why .then exists...
it executes when the data has actually been procured/converted */ 
fetch('http://localhost:5000/Game_info')
.then(api_response => {return api_response.json()})
.then(json_response => {
    getHeadlines(json_response)
});

// Main function

function onSubmit(){
    checkGuess()
    winningConditions()
}

// Functions otherwise

function getHeadlines(headlines_json){
    document.getElementById("presented_headline").innerText = headlines_json.scrambled_headline
    headlineArray = headlines_json.headline.split(" ")
    headlineArrayLower = headlines_json.headline.toLowerCase().split(" ")
    GUESS_BOX.disabled = false;
    GUESS_BUTTON.disabled = false;
    // left in to quickly check headline when testing
    console.log(headlines_json.headline);
}



function checkGuess() {
    const PLAYER_GUESS = GUESS_BOX.value.toLowerCase().trim();

    if (headlineArrayLower.includes(PLAYER_GUESS)){
        RESULT_PTAG.innerText = ""
        const GUESS_POSITION = headlineArrayLower.indexOf(PLAYER_GUESS)
        var updatedHeadline = document.getElementById("presented_headline").innerText.split(" ")
        updatedHeadline[GUESS_POSITION] = headlineArray[GUESS_POSITION]

        // below we are changing the inner text of the <h2> element on the html file.  
        document.getElementById("presented_headline").innerText = updatedHeadline.join(" ")

    } else {
        RESULT_PTAG.innerText = "❌"
    }
}

function winningConditions(){
    if (document.getElementById("presented_headline").innerText === headlineArray.join(" ")){
        const final_millisec = new Date().getTime()
        resultMins, resultSecs = time_translator(zeroth_millisec,final_millisec)
        document.getElementById("congratulations_text").innerText = `🎊📰 Congratulations! 📰🎊 \n ⌛ Time: ${resultMins}:${resultSecs} ⌛`
        createsLink(resultMins)
        document.getElementById('share_button').style.visibility = 'visible';
    }  
}

function time_translator(millisx_start, millisx_end){
    
    difference = millisx_end - millisx_start

    // Other variable added in case of future need
    var hrs_taken = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins_taken = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var secs_taken = Math.floor((difference % (1000 * 60)) / 1000);

    return mins_taken, secs_taken
}
function createsLink(time_taken){

    let mins_stamp = "" 
    
    if (time_taken <2){
        mins_stamp = "<2"
    }

    if (time_taken >= 2 && time_taken <4){
        mins_stamp = "<4"
    }
    if (time_taken >= 4 && time_taken <6){
        mins_stamp = "<6"
    }
    if (time_taken >= 6 && time_taken <8){
        mins_stamp = "<8"
    }
    if (time_taken >= 8 && time_taken <10){
        mins_stamp = "<10"
    }
    if (time_taken >10){
        mins_stamp = ">10"
    }
    link = `🟩📰⌛${mins_stamp}\n http://localhost:8000/`
}

function shareLink(){
    navigator.clipboard.writeText(link)
}