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
    game = new BlackJack()
    debug(game)
    player_new_card()
    dealer_new_card()
    dealer_new_card()
}

function update_dealer(state) {
    let dealer_info = ""
    let dealer_cards = game.get_dealer_cards()
    dealer_info += "Dealer Cards: "
    for (let i = 0; i < dealer_cards.length; i++) {
        dealer_info += dealer_cards[i].Value + " of " + dealer_cards[i].Suit
        if (i < dealer_cards.length - 1) {
            dealer_info += ", "
        }
    }
    if (state == game.state.gameEnded) {
        let dealer_cards = game.get_dealer_cards()
        dealer_info += "Dealer Cards: "
        for (let i = 0; i < dealer_cards.length; i++) {
            dealer_info += dealer_cards[i].Value + " of " + dealer_cards[i].Suit
            if (i < dealer_cards.length - 1) {
                dealer_info += ", "
            }
        }
        if (state.dealerWon) {
            dealer_info += "dealer wins"
        } else {
            dealer_info += "dealer loses"
        }
        document.getElementById("dealer_cards").innerHTML = dealer_info
        finalize_buttons()
    }

}
/*
function update_player(state) {
    let playerCards = game.get_player_cards()

    //dealer_move()
}*/
function update_player(state) {
    //ideia: por um h1 ou p na direita, onde será o valor total
    let player_info = ""
    let player_cards = game.get_player_cards()
    player_info += "Player Cards: "
    for (let i = 0; i < player_cards.length; i++) {
       player_info += player_cards[i].Value + " of " + player_cards[i].Suit
       //player_info+=" "+ game.get_cards_value(player_cards) 
        if (i < player_cards.length - 1) {
            player_info += ", "
        }
    }
    if (state == game.state.gameEnded) {
        for (let i = 0; i < player_cards.length; i++) {
            player_info += player_cards[i].Value + " of " + player_cards[i].Suit
            if (i < player_cards.length - 1) {
                player_info += ", "
            }
        }
        if (state.dealerWon) {
            player_info += "player loses"
        } else {
            player_info += "player won"
        }
        //document.getElementById("player_cards").innerHTML = player_info
        finalize_buttons()
    }
    document.getElementById("player_cards").innerHTML = player_info
}

function dealer_new_card() {
    game.dealer_move()
    update_dealer(game.get_game_state())
    return game.get_game_state()
}

function player_new_card() {
    game.player_move()
    update_player(game.get_game_state())
    //game.get_cards_value(game.get_player_cards)
    return game.get_game_state()
}

function dealer_finish() {
    let state = game.get_game_state()
    game.setDealerTurn(true)

    while (!state.gameEnded && game.get_cards_value(game.get_dealer_cards()) < MIN_POINTS_DEALER) {
        dealer_new_card()
        state = game.get_game_state()
    }

    update_dealer(state)
}