//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;

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
            let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
            let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
           // deck_aux = new Array();
            let  deck_aux = [];
            for (var i = 0; i < values.length; i++) {
                for (var x = 0; x < suits.length; x++) {
                    /*
                    var weight = parseInt(values[i]);
                    if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                        weight = 10;
                    if (values[i] == "A")
                        weight = 11;*/
                    var card = { Value: values[i], Suit: suits[x]};
                    deck_aux.push(card);
                }
            }
            return deck_aux;

        };

        this.shuffle = function (deck) {

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
        let valor=0;
        for (const card of cards) {
            let value = card.Value;

            if (value === "A") {
                numAces++;
                valor += 11;
            } else if (value === "K" || value === "Q" || value === "J") {
                valor += 10;
            } else {
                valor += parseInt(value);
            }
        }
        return valor;
    }

    dealer_move() {
        this.dealerTurn = true;

    }

    player_move() {
        this.dealerTurn = false;
    }

    get_game_state() {

    }
}