// import { useMessage } from "../hooks/message.hook";

module.exports = class Player {
  constructor(name, socket, room, avatar, health = 30, radianite = 1) {
    this.name = name;
    this.socket = socket;
    this.room = room;
    this.avatar = avatar;
    this.health = health;
    this.radianite = radianite;
    this.deck = [];
    this.handCards = [];
    this.tableCards = [];
  }

  sendData() {
    this.socket.emit("playerInfo", {
      health: this.health,
      name: this.name,
      handCards: this.handCards,
      radianite: this.radianite,
      deck: this.deck,
      avatar: this.avatar,
    });
  }

  changeHandCards(data) {
    this.handCards = this.handCards.filter((card) => card.id !== data.id);
    this.socket.emit("updateHandCards", { cards: this.handCards });
  }

  changeTableCards(data) {
    this.tableCards.push(data);
    this.socket.emit("updateUserTableCards", { cards: this.tableCards });
  }

  changeHealth(sign, amount) {
    //if heal: sign +; if attack: sign -
    if (sign == "-") {
      this.health -= amount;
    } else {
      this.health += amount;
    }

    if (this.health <= 0) {
      message = "You loose"; //rework
    }
  }

  radianiteUp() {
    this.radianite += 1;
  }

  useRadianite(temp, amount) {
    temp = this.radianite; //we declare temp with this string in the start of the move
    if (amount < temp) {
      temp -= amount;
    } else {
      let message = "Not enough radianite";
      return message;
    }
    return temp;
  }

  startHandCards(n) {
    for (let i = 0; i < n; i++) {
      let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
      this.handCards.push(card);
      this.deck = this.deck.filter((data) => data.id != card.id);
    }
  }

  takeNewCard(count) {
    if (count <= this.deck.length) {
      for (let i = 0; i < count; i++) {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
        this.handCards.push(card);
        this.deck = this.deck.filter((data) => data.id != card.id);
      }
    } else {
      for (let i = 0; i < this.deck.length; i++) {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
        this.handCards.push(card);
        this.deck = this.deck.filter((data) => data.id != card.id);
      }
    }
  }
};
