//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;
const MIN_POINTS_DEALER=17;

// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            let suits = ["spades", "hearts", "diamonds", "clubs"];
            let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
            // deck_aux = new Array();
            let deck_aux = [];
            for (var i = 0; i < values.length; i++) {
                for (var x = 0; x < suits.length; x++) {
                    /*
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;*/
                    var card = { Value: values[i], Suit: suits[x] };
                    //var card = values[i] + "_of_" + suits[x];
                    deck_aux.push(card);
                }
            }
            return deck_aux;

        };

        this.shuffle = function (deck) {
            let shuffledDeck = [];
            let indices = Array.from({ length: deck.length }, (_, i) => i);

            while (indices.length > 0) {
                const randomIndex = Math.floor(Math.random() * indices.length);
                const cardIndex = indices.splice(randomIndex, 1)[0];
                shuffledDeck.push(deck[cardIndex]);
            }

            return shuffledDeck;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        /*
        for (var i = 0; i < values.length; i++) {
            for (var x = 0; x < suits.length; x++) {
                let value = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        value = 10;
                    if (values[i] == "A")
                        value = 11;
                
            }
        }*/
        let valor = 0;
        for (const card of cards) {
            let value = card.Value;

            if (value === "A" && valor<11) {
                valor += 11;
            }
            else if (value === "A" && valor>=11){
                valor +=1;
            }
            else if (value === "K" || value === "Q" || value === "J") {
                valor += 10;
            } else {
                valor += parseInt(value);
            }
        }
        return valor;
    }

    dealer_move() {
        var carta= this.deck.pop()
        this.dealer_cards.push(carta)
        //this.dealerTurn = true;
        return this.get_game_state();

    }

    player_move() {
        var carta= this.deck.pop()
        this.player_cards.push(carta)
        //this.dealerTurn = false;
        return this.get_game_state();
    }

    get_game_state() {
        let dealer_pontos = this.get_cards_value(this.dealer_cards)
        let player_pontos = this.get_cards_value(this.player_cards)

        if (this.dealerTurn) {
            if (player_pontos > 21 || dealer_pontos == 21 || dealer_pontos > player_pontos && dealer_pontos>=MIN_POINTS_DEALER) {
                //player perde
                this.state.gameEnded=true
                this.state.dealerWon=true
                
            }
            if (dealer_pontos > 21 || player_pontos == 21 || dealer_pontos < player_pontos && dealer_pontos>=MIN_POINTS_DEALER) {
                //dealer perde
                this.state.gameEnded=true
                this.state.dealerWon=false
            }
            /*
            if (player_pontos < 21 && dealer_pontos < player_pontos) {
                this.state
                //continuar ou n

            }*/
            return this.state;
        }
        else{
            return this.state
        }
    }
}