// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// const socket = io("http://localhost:5000");

// export const Rules = () => {
//   const [room, setRoom] = useState("");
//   const [message, setMessage] = useState("");
//   const [recivedMessage, setRecivedMessage] = useState("");

//   const sendMessage = () => {
//     socket.emit("Send_Message", { message, room });
//   };

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("Join_Room", room);
//     }
//   };

//   useEffect(() => {
//     socket.on("recieved_message", (data) => {
//       setRecivedMessage(data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Rules</h1>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}>Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}>Send Message</button>
//       <h1>Message: {recivedMessage} </h1>
//     </div>
//   );
// };
