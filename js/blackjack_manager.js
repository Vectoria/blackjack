//Blackjack oop

let game = null

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object)
}

function buttons_initialization() {
    document.getElementById("card").disabled = false
    document.getElementById("stand").disabled = false
    document.getElementById("new_game").disabled = true
}

function finalize_buttons() {
    document.getElementById("card").disabled = true
    document.getElementById("stand").disabled = true
    document.getElementById("new_game").disabled = false
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
    let atras = document.getElementById("dealer")
    game = new BlackJack()
   // debug(game)
    buttons_initialization()
    player_new_card()
    dealer_new_card()
    const myImage = new Image(150,200)
    myImage.src="../img/png/card_back.png"
    atras.appendChild(myImage)
}

function update_dealer(state) {
    let dealer_info = ""
    let winner = ""
    let pontuacao = "Dealer - "
    let dealer_cards = game.get_dealer_cards()
    dealer_info += "Dealer Cards: "
    let apostador = document.getElementById("dealer")
    while (apostador.lastChild) {
        apostador.removeChild(apostador.lastChild)
    }
    for (let i = 0; i < dealer_cards.length; i++) {
        const myImage = new Image(150,200)
        myImage.src = "../img/png/" + dealer_cards[i].Value + "_of_" + dealer_cards[i].Suit + ".png"
        apostador.appendChild(myImage);
        dealer_info += dealer_cards[i].Value + " of " + dealer_cards[i].Suit
        if (i < dealer_cards.length - 1) {
            dealer_info += ", "
        }
    }
    pontuacao+=game.get_cards_value(dealer_cards)
    let player_info = ""
    let player_cards = game.get_player_cards()
    player_info += "Player Cards: "
    for (let i = 0; i < player_cards.length; i++) {
        player_info += player_cards[i].Value + " of " + player_cards[i].Suit
        if (i < player_cards.length - 1) {
            player_info += ", "
        }
    }
    if (state.gameEnded) {
        if (state.dealerWon) {
            winner += "DEALER WINS!"
        } else {
            winner += "PLAYER WINS!"
        }
        finalize_buttons()
    }
    document.getElementById("dealer_pontinhos").innerHTML = pontuacao + " Points"
    document.getElementById("winner").innerHTML = winner    
}

function update_player(state) {
    //ideia: por um h1 ou p na direita, onde será o valor total
    let player_info = ""
    let winner = ""
    let pontuacao ="Player - "
    let player_cards = game.get_player_cards()
    player_info += "Player Cards: "
    let jogador = document.getElementById("player")
    while (jogador.lastChild) {
        jogador.removeChild(jogador.lastChild)
    }
    for (let i = 0; i < player_cards.length; i++) {
        const myImage = new Image(150,200);
        myImage.src = "../img/png/" + player_cards[i].Value + "_of_" + player_cards[i].Suit + ".png"
        jogador.appendChild(myImage)
        player_info += player_cards[i].Value + " of " + player_cards[i].Suit
        if (i < player_cards.length - 1) {
            player_info += ", "
        }
        
    }
    pontuacao+=game.get_cards_value(player_cards)

    let dealer_info = ""
    let dealer_cards = game.get_dealer_cards()
    dealer_info += "Dealer Cards: "
    for (let i = 0; i < dealer_cards.length; i++) {
        dealer_info += dealer_cards[i].Value + " of " + dealer_cards[i].Suit
        if (i < dealer_cards.length - 1) {
            dealer_info += ", "
        }
    }
    if (state.gameEnded) {
        if (state.dealerWon) {
            winner += "DEALER WINS!"
        } else {
            winner += "PLAYER WINS!"
        }
        finalize_buttons()
    }
    document.getElementById("player_pontinhos").innerHTML = pontuacao + " Points"
    document.getElementById("winner").innerHTML = winner   
}
function dealer_new_card() {
    game.dealer_move()
    let dealerCards = game.get_dealer_cards()
    console.log("Dealer's new card:", dealerCards[dealerCards.length - 1])
    update_dealer(game.get_game_state())
    return game.get_game_state()
}

function player_new_card() {
    game.player_move()
    let PlayerCards = game.get_player_cards()
    console.log("Player's new card:", PlayerCards[PlayerCards.length - 1])
    update_player(game.get_game_state())
    return game.get_game_state()
}

function dealer_finish() {
    console.log("Dealer's turn started")
    game.setDealerTurn(true)
    let state = game.get_game_state()

    if (state.gameEnded && game.get_cards_value(game.get_dealer_cards()) >= MIN_POINTS_DEALER) {
        update_dealer(state)
    }

    while (!state.gameEnded && game.get_cards_value(game.get_dealer_cards()) < MIN_POINTS_DEALER) {
        console.log("Drawing a new card for the dealer")
        dealer_new_card()
        state = game.get_game_state()
        console.log("Dealer's state:", state)
        update_dealer(state)
    }

    console.log("Dealer's turn ended")
}

