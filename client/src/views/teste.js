const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'teste'
});

connection.connect();

function dataQuery(codeId) {
  return new Promise(res => {
    connection.query('select * from table1;', (error, result) => {
      if (error) res(error);
      var result = JSON.parse(JSON.stringify(result));
      res(result);
    });
  });
}

async function searchResultManager(codeId) {
  var a = dataQuery(codeId);
  return await a;
}

searchResultManager("codeId").then(v => {
  console.log("ori:");
  console.log(v);
});

connection.end();



















// -------------------------------
request(req, res, function (err) {
  console.log(req.body)
})

let formInputs = new Promise((resolve, reject) => {

  request(req, res, function (err) {
    console.log(req.body.formInputs)
    resolve(req.body.formInputs)
  })

})
formInputs.then(result => {

  console.log(result)

  // upload(req, res, function (err) {
  //     console.log(req.body)
  //     res.json("oi")
  // })
  res.json("oi")

}).catch(error => {
  res.json(error)
});



// -------------------------


const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const fs = require('fs')
const definitions = require('../assets/definitions.json');
const multer = require('multer')
const uploadUser = multer({ dest: './public/userImages/' });

// var upload = ;
const upload = uploadUser.single('image');

class Register {
  registerQuery(req, res) {

    console.log(req.body)

    // request(req, res, function (err) {
    //     console.log(req.body)

    // })
    upload(req, res, function (err) {
      console.log(req.body)
    })

    var oi = req.body;
    res.json(oi)
  }
}

module.exports = new Register();



// --------------------------
const mysql = require('mysql');
const mysqlConnection = require('../database/connection');
const express = require('express');
const router = express.Router();
const SearchBar = require('../controllers/SearchBar');
const Register = require('../controllers/Register');



router.get("/search/:osId", SearchBar.searchQuery)
router.post("/register", Register.registerQuery)

module.exports = router;