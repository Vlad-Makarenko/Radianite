const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config({ path: "./.env" });

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';;


app.listen(PORT, () =>
  console.log(`server is running on http://${HOST}:${PORT}`)
);
