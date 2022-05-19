/* Internal values */

let headlineArray = []

let headlineArrayLower = [] 

const RESULT_PTAG = document.getElementById("cross")

const GUESS_BOX = document.getElementById("guess_box")

const GUESS_BUTTON = document.getElementById("submit_button")

const zeroth_millisec = new Date().getTime()

// Appearance functions and lines

GUESS_BOX.disabled = true;
GUESS_BUTTON.disabled = true;

function instructionsAppear(){
    document.getElementById("instructions_div").style.visibility = "visible";
}

function instructionsDisappear(){
    document.getElementById("instructions_div").style.visibility = "hidden";
}

/* External values */

 
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

GUESS_BOX.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        document.getElementById("submit_button").click();
    }
});

function getHeadlines(headlines_json){
    document.getElementById("presented_headline").innerText = headlines_json.scrambled_headline
    headlineArray = headlines_json.headline.split(" ")
    headlineArrayLower = headlines_json.headline.toLowerCase().split(" ")
    GUESS_BOX.disabled = false;
    GUESS_BUTTON.disabled = false;

    console.log(headlines_json.headline);
}

function checkGuess() {
    const PLAYER_GUESS = GUESS_BOX.value.toLowerCase().trim();

    if (headlineArrayLower.includes(PLAYER_GUESS)){
        RESULT_PTAG.innerText = ""
        const GUESS_POSITION = headlineArrayLower.indexOf(PLAYER_GUESS)
        GUESS_BOX.value = ""
        var updatedHeadline = document.getElementById("presented_headline").innerText.split(" ")
        updatedHeadline[GUESS_POSITION] = headlineArray[GUESS_POSITION]

        // below we are changing the inner text of the <h2> element on the html file.  
        document.getElementById("presented_headline").innerText = updatedHeadline.join(" ")

    } else {
        RESULT_PTAG.innerText = "❌"
        // Might need to set some attribute where this becomes visible, rather than setting the text
    }
}

function winningConditions(){
    if (document.getElementById("presented_headline").innerText === headlineArray.join(" ")){
        const final_millisec = new Date().getTime()
        document.getElementById("congratulations_text").innerText = `🎊📰 Congratulations! 📰🎊 \n Time: ${time_translator(zeroth_millisec,final_millisec)} minutes`
        // var final_millisec = new Date().getTime(); Can you define a variable in the way done below?
    }  
}

function time_translator(millisx_start, millisx_end){
    
    difference = millisx_end - millisx_start

    var result_hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var result_mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var result_secs = Math.floor((difference % (1000 * 60)) / 1000);

    return result_mins
}

