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


