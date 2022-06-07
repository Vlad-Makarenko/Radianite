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

    // Between 1 and max(2)
    let resTurn = Math.floor(Math.random() * 2) + 1;
    if (resTurn == 1) {
      this.p1.turn = true;
    } else {
      this.p2.turn = true;
    }

    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2];
      
      data.socket.emit("startGame", {
        player: data.name,
        opponent: opponent.name,
        turn: data.turn,
      });
      data.startHandCards(1);
    });

    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2];
      data.sendData();
      data.socket.emit("opponentInfo", {
        health: opponent.health,
        name: opponent.name,
        handCards: opponent.handCards, // TODO: Change this
        radianite: opponent.radianite,
      });
    });
  }

  #addEventListener() {
    this.players.forEach((player, index) => {
      const opponent = this.players[(index + 1) % 2];
      player.socket.on("changeTurn", () =>{
       player.turn = !player.turn;
       opponent.turn = !opponent.turn;
       opponent.socket.emit("changeTurn", {turn: opponent.turn});
       player.socket.emit("changeTurn", {turn: player.turn});
      })
      player.socket.on("moveCard", (data) => {
        player.changeHandCards(data);
        player.changeTableCards(data);
        // opponent.socket.emit("updateOpponentCards",  { cards: player.handCards })
        player.socket
          .to(player.room)
          .emit("updateOpponentCards", { cards: player.handCards });
        player.socket
          .to(player.room)
          .emit("updateOpponentTableCards", { cards: player.tableCards }); //TODO: update handCards
      });
    });
  }
};
