const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const  http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
dotenv.config({ path: "./.env" });



const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';;

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/card', require('./routes/card.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/room', require('./routes/room.routes'))



const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: [ 'GET', 'POST' ]
  }
});

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('Join_Room', (room) => {
    socket.join(room)
  })

  socket.on('Send_Message', (data) => {
    console.log(data)
    socket.to(data.room).emit("recieved_message", data.message)
  })
})

server.listen(PORT, () =>
  console.log(`server is running on http://${HOST}:${PORT}`)
);
