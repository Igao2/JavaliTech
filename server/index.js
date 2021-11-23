const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const router = require("./src/routes");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mysqlConnection = require('./src/database/connection');
const fs = require('fs');

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

app.listen(3001, () => {
    console.log("Servidor ligado e disponivel em: http://localhost:3001");
    console.log("Para desligar o server, digite: ctrl + C")
})

app.get("/", (req, res) => {
    res.send("este é o server")
})






