//Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization() {
    document.getElementById("card").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons() {
    document.getElementById("card").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADAS PELOS ALUNOS
function new_game() {
    game = new BlackJack();
    debug(game);
    player_new_card();
    dealer_new_card();
    dealer_new_card();
}

function update_dealer(state) {
    //player_move() ;
    //if(state== )

}

function update_player(state) {
    
    //dealer_move();
}

function dealer_new_card() {
    update_dealer();
}

function player_new_card() {
    update_player();
}

function dealer_finish() {

}

