// import { useMessage } from "../hooks/message.hook";

module.export = class Player {
  constructor(name, deck, socket, health = 30, radianite = 1) {
    this.name = name;
    this.deck = deck;
    this.socket = socket;
    this.health = health;
    this.radianite = radianite;
    this.handCards = [];
  }

  changeHealth(sign, amount) {
    //if heal: sign +; if attack: sign -
    if (sign == "-") {
      this.health -= amount;
    } else {
      this.health += amount;
    }

    if(this.health <= 0){
        message ="You loose"; //rework
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
      let message ="Not enough radianite";
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


}
