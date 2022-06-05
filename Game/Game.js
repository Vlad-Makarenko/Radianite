const Player = require("./Player");
const Card = require("../models/Card");

module.exports = class Game {

  /**
   *
   * @param {Player} p1
   * @param {Player} p2
   */
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.players = [p1, p2];
    this.#gameInit();
    this.#addEventListener();

  }

  async #gameInit() {
    try {
      const cards = await Card.getAll();
      this.p1.deck = cards;
      this.p2.deck = cards;
    } catch (error) {
      console.error(error);
    }
    
    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2]
      data.socket.to(data.room).emit("startGame", {player: data.name, opponent: opponent.name });
      data.startHandCards(1);
    })

    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2]
      data.sendData();
      data.socket.to(data.room).emit('opponentInfo', {
        health: opponent.health, 
        name: opponent.name, 
        handCards: opponent.handCards,  // TODO: Change this
        radianite: opponent.radianite, 
      })
    })

  }

  #addEventListener(){
    this.players.forEach((player, index) => {
      const opponent = this.players[(index + 1) % 2]
      player.socket.on("TestMove", data => {
        console.log(data);
        player.socket.to(player.room).emit("opponentTable",{cards: [data]}); //TODO: update handCards
      })
    })
  }
};
