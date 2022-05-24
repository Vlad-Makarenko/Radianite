const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';;

app.use(express.json({ extended: true }));
app.use('/api/card', require('./routes/card.routes'))
app.use('/api/auth', require('./routes/auth.routes'))





app.listen(PORT, () =>
  console.log(`server is running on http://${HOST}:${PORT}`)
);
