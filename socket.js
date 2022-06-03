const User = require("./models/User");
const Game = require("./Game/Game");
const Player = require("./Game/Player");

var waitingPlayers = [];

async function addWaitingPlayers(userId, socket, room) {
  const user = await new User().findBy("id", userId);
  if (user) {
    const member = {
      login: user.login,
      socket: socket,
      room: room,
    };
    waitingPlayers.push(member); //TODO: Add disconnect
  }
}

module.exports = (socket) => {
  console.log(`Socket with id: ${socket.id} --- Connected `);

  socket.on("initGame", async (data) => {
    socket.join(data.room);
    await addWaitingPlayers(data.userId, socket, data.room);
    console.log(waitingPlayers);
    // TODO: 1. Проверять что если уже два юзера на одну комнату то эмитить "старт гейм" обом юзерам и создавать класс гейм
    //          (ВОЗМОЖНО в конструкторе уже эмитить старт гейм что бы сразу отдать туда карты и тд инфу..)
    //       2. Если же только один юзер то эмитить "вэйтинг" и на клиенете ставить лоадер в ожидание опонента
    //       3. Добавить функцию которая будет делать пары взависимости от комнаты и на будщее нужно будет как то
    //          лочить комнаты что бы третий не мог присоедениться
  });

  socket.on("startGame", (data) => {});

  socket.on("disconnect", () => {
    //TODO: NEED REMAKE & DEVELOPE
    waitingPlayers.filter((data) => data.socket.id !== socket.id);
    console.log(waitingPlayers);
    console.log(`Socket with id: ${socket.id} --- Disconnected`);
  });
};
