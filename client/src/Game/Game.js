import Player from "./Player";

export default class Game {
    /**
     * 
     * @param {Player} player 
     * @param {Player} opponent 
     */
    constructor(player, socket, opponent, states){
        this.player = player;
        this.socket = socket;
        this.opponent = opponent;
        this.states = states;
        this.field = {
            tableUserCards: [],
            tableOppCards: []
        }
        this.#addEventListener();
    }

      //   userCards,
      //   setUserCards,
      //   oppCards,
      //   setOppCards,
      //   tableUserCards,
      //   setTableUserCards,
      //   tableOppCards,
      //   setTableOppCards,
      //   moveCard,

    #addEventListener(){
        this.socket.on("playerInfo", data => {
            this.player.health = data.health;
            this.player.handCards = data.handCards;
            this.player.name = data.name;
            this.player.radianite = data.radianite;
            this.player.deck = data.deck;

            this.states.setUserCards(this.player.handCards);
        })

        this.socket.on("opponentInfo", data => {
            this.opponent.health = data.health;
            this.opponent.handCards = data.handCards;
            this.opponent.name = data.name;
            this.opponent.radianite = data.radianite;

            this.states.setOppCards(this.opponent.handCards);
        })

        this.socket.on("opponentTable", data => {
            this.states.setTableOppCards(data.cards);
        })

        
    }

}

