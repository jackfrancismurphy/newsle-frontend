
const tick_string = "tick for now"

const cross_string = "cross for now"



function checkGuess() {
    const element = document.getElementById("test_div")

    let player_guess = document.getElementById("guess_box").value.toLowerCase()
    const answer_array = "Biggest squeeze for public sector pay in 20 years BBC.com".toLowerCase().split(" ")

    if (answer_array.includes(player_guess) == true){
        element.innerText = tick_string
    } else {
        element.innerText = cross_string
    };
}