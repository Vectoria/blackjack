//Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21
const MIN_POINTS_DEALER=17

// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = []
        // array com as cartas do player
        this.player_cards = []
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            let suits = ["spades", "hearts", "diamonds", "clubs"];
            let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
            let deck_aux = [];
            for (var i = 0; i < values.length; i++) {
                for (var x = 0; x < suits.length; x++) {
                    var card = { Value: values[i], Suit: suits[x] }
                    deck_aux.push(card)
                }
            }
            return deck_aux

        };

        this.shuffle = function (deck) {
            let shuffledDeck = []
            let indices = Array.from({ length: deck.length }, (_, i) => i)

            while (indices.length > 0) {
                const randomIndex = Math.floor(Math.random() * indices.length)
                const cardIndex = indices.splice(randomIndex, 1)[0]
                shuffledDeck.push(deck[cardIndex])
            }

            return shuffledDeck
        }

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck())
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice()
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice()
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val) {
        this.dealerTurn = val
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let valor = 0
        let ace_num = 0
        for (const card of cards) {
            let value = card.Value

            if (value === "ace") {
                valor += 11
                ace_num ++
            }
            else if (value === "king" || value === "queen" || value === "jack") {
                valor += 10
            } else {
                valor += parseInt(value)
            }
        }
        if (valor > 21){
            valor -= 10*ace_num
        }
        return valor
    }

    dealer_move() {
        var carta= this.deck.pop()
        this.dealer_cards.push(carta)
        return this.get_game_state()

    }

    player_move() {
        var carta= this.deck.pop()
        this.player_cards.push(carta)
        return this.get_game_state()
    }

    get_game_state() {
        let dealer_pontos = this.get_cards_value(this.dealer_cards)
        console.log("Dealer points:", dealer_pontos)
        let player_pontos = this.get_cards_value(this.player_cards)
        console.log("Player points:", player_pontos)

        if (this.dealerTurn) {
            if (dealer_pontos >= MIN_POINTS_DEALER) {
                this.state.gameEnded = true
                if (dealer_pontos > MAX_POINTS) {
                    this.state.dealerWon = false
                } else if (dealer_pontos > player_pontos) {
                    this.state.dealerWon = true
                } else if (dealer_pontos < player_pontos) {
                    this.state.dealerWon = false
                } else {
                    this.state.dealerWon = false
                }
            }
        } else {
            if (player_pontos > MAX_POINTS) {
                this.state.gameEnded = true
                this.state.dealerWon = true
            } else {
                if (player_pontos == MAX_POINTS){
                    this.state.gameEnded = true
                    this.state.dealerWon = false
                }
            }
        }
    
        return this.state
    }
}
