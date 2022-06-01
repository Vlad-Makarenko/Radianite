const Player = require('./Player');
const Card = require('../models/Card');


export class Game {
    /**
     * 
     * @param {Player} p1 
     * @param {Player} p2 
     * @param {string} room 
     * @param {*} socket 
     */
    constructor(p1, p2, room, socket){
        this.p1 = p1;
        this.p2 = p2;
        this.room = room;
        this.socket = socket;
    } 

    gameInit(){
        try {
            const cards = await Card.getAll();
            this.p1.deck = cards;
            this.p2.deck = cards;
        } catch (error) {
            console.error(error)
        }
    }
}