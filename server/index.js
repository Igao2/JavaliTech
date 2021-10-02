const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("testando");
})

app.listen(3001, () => {
    console.log("servidor ligado e disponivel em: http://localhost:3002");
})