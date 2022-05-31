const conn = require("../db/db");

module.exports = class Room {
    constructor(name, password='', player1='', player2='', status='waiting'){
        this.id = 0;
        this.name = name;
        this.password = password;
        this.player1 = player1;
        this.player2 = player2;
        this.status = status;
    }

    async isExist() {
        const query_str = `SELECT * FROM room WHERE name='${this.name}'`;
        const result = await conn.promise().query(query_str);
        return (result[0].length > 0)
    }

    async findOne(name) {
        const query_str = `SELECT * FROM room WHERE name='${name}'`;
        const result = await conn.promise().query(query_str);
        if(result[0].length){
            this.id = result[0][0]['id'];
            this.name = result[0][0]['name'];
            this.password = result[0][0]['password'];
            this.player1 = result[0][0]['player1'];
            this.player2 = result[0][0]['player2'];
            this.status = result[0][0]['status'];
            return this;
        }else {
            return null;
        }
    }
    
    async save() {
        console.log(this);
        if(await this.isExist()){
            const query_str = `UPDATE room SET player1='${this.player1}', player2='${this.player2}', status='${this.status}' WHERE name='${this.name}'`;
            await conn.promise().query(query_str);
        } else {
            const query_str = `INSERT INTO room(name, password, player1, player2, status) VALUES('${this.name}', '${this.password}', '${this.player1}', '${this.player2}', '${this.status}')`
            await conn.promise().query(query_str);
        }
    }
}