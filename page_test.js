let player_guess = "dog"

const answer_array = "Biggest squeeze for public sector pay in 20 years BBC.com".split(" ")
if (answer_array.includes(player_guess) == true){console.log("It's in there")}
else{console.log("It's not in there")};


headline = "Boris Johnson says tens of thousands could be sent to Rwanda under relocation plan for asylum seekers – UK politics live - The Guardian"

current_sentence = "Bsrio onnJsoh asys snte fo onduathss uolcd be nset ot awnaRd rneud erolniocta pnla rof mluyas sesekre  UK iosplcti ievl  eTh andiuarG"

player_guess = "says"

function word_replacer(headline, player_guess, current_sentence){
    if (headline.includes(player_guess)){
        var guess_position = headline.indexOf(player_guess)
        var updated_position = current_sentence.replace(updated_position[guess_position], player_guess)
        return updated_position
    } 
}

print(word_replacer(headline, player_guess, current_sentence))