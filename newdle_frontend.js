
const TICK_STRING = "tick for now"

const CROSS_STRING = "cross for now"

const API_INFO = {headline: "Boris Johnson says tens of thousands could be sent to Rwanda under relocation plan for asylum seekers - UK politics live - The Guardian", scrambled_headline: "Bsrio onnJsoh asys snte fo onduathss uolcd be nset ot awnaRd rneud erolniocta pnla rof mluyas sesekre - UK iosplcti ievl - eTh andiuarG"}

const HEADLINE_ARRAY = API_INFO.headline.split(" ")
const HEADLINE_ARRAY_LOWER = API_INFO.headline.toLowerCase().split(" ")

const RESULT_PTAG = document.getElementById("result_text")

function checkGuess() {
    const PLAYER_GUESS = document.getElementById("guess_box").value.toLowerCase()


    if (HEADLINE_ARRAY_LOWER.includes(PLAYER_GUESS) == true){
        RESULT_PTAG.innerText = TICK_STRING
        const GUESS_POSITION = HEADLINE_ARRAY_LOWER.indexOf(PLAYER_GUESS)
        var updated_scramble = document.getElementById("presented_headline").innerText.split(" ")
        updated_scramble[GUESS_POSITION] = HEADLINE_ARRAY[GUESS_POSITION]
        // below we are changing the inner text of the <h2> element on the html file.  
        document.getElementById("presented_headline").innerText = updated_scramble.join(" ")
    } else {
        RESULT_PTAG.innerText = CROSS_STRING
    };
}
