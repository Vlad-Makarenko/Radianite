import { useBattle } from "../hooks/battle.hook";

export default class Game {
    constructor(player, socket, opponent, states){
        this.player = player;
        this.socket = socket;
        this.opponent = opponent;
        this.states = states;
    }

    initHook(){
        console.log("USER CARDS:::: ",this.states.userCards);
        this.states.setUserCards([...this.states.userCards, {name: "Jopa"}])
    }

    moveCard(){
        console.log("drugaya jopa");
    }
}

