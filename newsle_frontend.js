/* Internal values */

let headlineArray = []

let headlineArrayLower = [] 

let link = ""

const RESULT_PTAG = document.getElementById("cross")

const GUESS_BOX = document.getElementById("guess_box")

const zeroth_millisec = new Date().getTime()

// Appearance functions and lines

GUESS_BOX.disabled = true;

function instructionsAppear(){
    document.getElementById("instructions_div").style.visibility = "visible";
}


function instructionsDisappear(){
    document.getElementById("instructions_div").style.visibility = "hidden";
}

/* External values */

 
fetch('https://newsle-backend-c6c785fcf3f1.herokuapp.com/Game_info')
.then(api_response => {return api_response.json()})
.then(json_response => {
    getHeadlines(json_response)
});

// Main function

function onSubmit(){

    checkGuess()
    winningConditions()
}


// Check Guess + helper functions


function getHeadlines(headlines_json){

    document.getElementById("presented_headline").innerText = headlines_json.scrambled_headline
    headlineArray = headlines_json.headline.split(" ")
    headlineArrayLower = headlines_json.headline.toLowerCase().split(" ")
    GUESS_BOX.disabled = false;
}

function getWordIndexes (headlineArray, guess){

    var indexes = [];
    for (var i = 0; i < headlineArray.length; i++){
        if(headlineArray[i] == guess){
            indexes.push(i)
        }
    }
    return indexes
}


function checkGuess() {

    const PLAYER_GUESS = GUESS_BOX.value.toLowerCase().trim();

    if (headlineArrayLower.includes(PLAYER_GUESS)){

        RESULT_PTAG.innerText = ""
        wordIndexes = getWordIndexes(headlineArrayLower,PLAYER_GUESS)
        var updatedHeadline = document.getElementById("presented_headline").innerText.split(" ")
        for (i of wordIndexes){
            updatedHeadline[i] = headlineArray[i]}  

        document.getElementById("presented_headline").innerText = updatedHeadline.join(" ")

    } else {
        RESULT_PTAG.innerText = "❌"
    }
}

// Winning Conditions + helper functions

function time_translator(millisx_start, millisx_end){
    
    difference = millisx_end - millisx_start

    // Other variable added in case of future need
    var hrs_taken = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins_taken = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var secs_taken = Math.floor((difference % (1000 * 60)) / 1000);

    return [mins_taken, secs_taken]
}


function winningConditions(){

    if (document.getElementById("presented_headline").innerText === headlineArray.join(" ")){
        const final_millisec = new Date().getTime()
        const time_results = time_translator(zeroth_millisec,final_millisec)
        document.getElementById("congratulations_text").innerText = `🎊📰 Congratulations! 📰🎊 \n ⌛ Time: ${time_results[0]}:${time_results[1]} ⌛`
        createsLink(time_results[0])
        // document.getElementById('share_button').style.visibility = 'visible' **AWAITING PR**;
    }  
}


function createsLink(time_taken){

    let mins_stamp = "" 
    
    if (time_taken <2){
        mins_stamp = "<2"
    }
    else if (time_taken <4){
        mins_stamp = "<4"
    }
    else if (time_taken <6){
        mins_stamp = "<6"
    }
    else if (time_taken <8){
        mins_stamp = "<8"
    }
    else if (time_taken <10){
        mins_stamp = "<10"
    }
    else {
        mins_stamp = ">10"
    }
    link = `🟩📰⌛${mins_stamp}\n https://jackfrancismurphy.github.io/newsle-frontend/`
}

function shareLink(){
    navigator.clipboard.writeText(link)
}
