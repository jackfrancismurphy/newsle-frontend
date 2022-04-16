/* Internal values */

// To be changed with emojis in time.
const TICK_STRING = "tick for now"

const CROSS_STRING = "cross for now"

let headlineArray = []

let headlineArrayLower = [] 

const RESULT_PTAG = document.getElementById("result_text")

const GUESS_BOX = document.getElementById("guess_box")

const GUESS_BUTTON = document.getElementById("button")

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

function getHeadlines(headlines_json){
    document.getElementById("presented_headline").innerText = headlines_json.scrambled_headline
    headlineArray = headlines_json.headline.split(" ")
    headlineArrayLower = headlines_json.headline.toLowerCase().split(" ")
    GUESS_BOX.disabled = false;
    GUESS_BUTTON.disabled = false;
}

function onSubmit(){
    checkGuess()
    winningConditions()
}

function checkGuess() {
    const PLAYER_GUESS = GUESS_BOX.value.toLowerCase()

    if (headlineArrayLower.includes(PLAYER_GUESS)){
        RESULT_PTAG.innerText = TICK_STRING
        const GUESS_POSITION = headlineArrayLower.indexOf(PLAYER_GUESS)
        var updatedHeadline = document.getElementById("presented_headline").innerText.split(" ")
        updatedHeadline[GUESS_POSITION] = headlineArray[GUESS_POSITION]

        // below we are changing the inner text of the <h2> element on the html file.  
        document.getElementById("presented_headline").innerText = updatedHeadline.join(" ")

    } else {
        RESULT_PTAG.innerText = CROSS_STRING
    }
}


function winningConditions(){
    if (document.getElementById("presented_headline").innerText === headlineArray.join(" ")){
        document.getElementById("congratulations_text").innerText = "Congratulations!"
    }  
}
