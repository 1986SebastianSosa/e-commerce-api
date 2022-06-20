require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("listen port: " + port));
