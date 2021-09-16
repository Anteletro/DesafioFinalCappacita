const sqlite3 = require('sqlite3').verbose();
const usuarios = []
const banco = []
// open database in memory

async function re(){
    let db = new sqlite3.Database('cadrastro.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      //  console.log('Connected to the in-memory SQlite database.');
      });
     // var i = 0;
    
    db.serialize(function(){
     db.run("CREATE TABLE if not exists usr_info (nome varchar(300)); INSERT INTO usr_info(nome) VALUES ('Anônimo')");
    // db.run("INSERT INTO usr_info(nome) VALUES ('Anônimo')");
    db.all("SELECT * FROM usr_info",(error, rows,) => {
          rows.forEach( row =>{ 
          var k = {nome: ""}
          k.nome=`${row.nome}`,
          banco[0] = k })
         // i++
           });
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
       // console.log('Close the database connection.');
      });
    })
    }
//re()

function todos(){
    re()
   // console.log(banco)
  return banco;
  }


async function salvarNomes(nome) {
    let db = new sqlite3.Database('cadrastro.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
      //  console.log('Connected to the in-memory SQlite database.');
      });

    usuarios[0] = nome

db.serialize(function() {
  db.run("CREATE TABLE if not exists usr_info (nome varchar(300))");
  var stmt = db.prepare("INSERT INTO usr_info (nome) VALUES (?)");
  for (var u of usuarios) {
   // console.log(JSON.stringify(u));
    stmt.run(u.nome);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, nome FROM usr_info", function(err, row)
  {
    console.log(row.id + ": " + row.nome);
  });
  re()
});
console.log(nome)
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  //  console.log('Close the database connection.');
  });
}



module.exports = {salvarNomes,todos}