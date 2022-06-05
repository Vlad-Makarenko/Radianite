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
    this.gameInit();

  }

  async gameInit() {
    try {
      const cards = await Card.getAll();
      this.p1.deck = cards;
      this.p2.deck = cards;
    } catch (error) {
      console.error(error);
    }
    this.p1.socket.to(this.p1.room).emit("startGame", {deck: this.p1.deck});
    this.p2.socket.to(this.p2.room).emit("startGame", {deck: this.p2.deck});

    this.p1.socket.on("TestMove", data => {
      console.log(data);
    })
    this.p2.socket.on("TestMove", data => {
      console.log(data);
    })
  }
};
