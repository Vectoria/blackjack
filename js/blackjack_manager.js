//Blackjack oop

let game = new BlackJack

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
    let dealerCards = game.get_dealer_cards()

    // Construir uma string para mostrar as cartas do jogador
    let dealerCardsString = "Player's Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardsString += dealerCards[i].Value + " of " + dealerCards[i].Suit
        if (i < dealerCards.length - 1) {
            dealerCardsString += ", "
        }
    }

    // Verificar o estado do jogo passado como argumento
    if (state.gameEnded) {
        if (state.dealerWon) {
            dealerCardsString += " - Dealer Wins!"
        } else {
            dealerCardsString += " - Dealer Lose!"
        }
    }

    // Atualizar a string no elemento HTML associado ao jogador
    document.getElementById("player").innerHTML = dealerCardsString

    // Executar a função finalize_buttons() se o jogo terminou
    if (state.gameEnded) {
        finalize_buttons()
    }
/*
    if (state == game.state.gameEnded) {

    }*/
    //player_move() 
    //if(state== )

}
/*
function update_player(state) {
    let playerCards = game.get_player_cards()

    //dealer_move()
}*/
function update_player(state) {
    let playerCards = game.get_player_cards()

    // Construir uma string para mostrar as cartas do jogador
    let playerCardsString = "Player's Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        playerCardsString += playerCards[i].Value + " of " + playerCards[i].Suit
        if (i < playerCards.length - 1) {
            playerCardsString += ", "
        }
    }

    // Verificar o estado do jogo passado como argumento
    if (state.gameEnded) {
        if (state.dealerWon) {
            playerCardsString += " - Player lose!"
        } else {
            playerCardsString += " - Player Wins!"
        }
    }

    // Atualizar a string no elemento HTML associado ao jogador
    document.getElementById("player_cards").innerHTML = playerCardsString

    // Executar a função finalize_buttons() se o jogo terminou
    if (state.gameEnded) {
        finalize_buttons()
    }
}


function dealer_new_card() {
    game.dealer_move()
    return game.get_game_state()

}

function player_new_card() {
    game.player_move()
    //game.get_cards_value(game.get_player_cards)
    return game.get_game_state()
}

function dealer_finish() {
    //TODO
    let estado=game.get_game_state()
    game.setDealerTurn(true)
    while(!estado==game.state.gameEnded){
        dealer_new_card
    }
}

