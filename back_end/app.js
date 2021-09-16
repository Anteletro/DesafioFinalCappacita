const express = require('express')
const app = express()
const blodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const themovie = require('./themovie')
const dataBase = require('./db')
var god;
var id;



app.use(express.static(__dirname+ '/front_end/'));


app.use(blodyParser.urlencoded({ extended: true }))


app.get("/", async(req, res) => {
    res.sendFile(__dirname+ '/index.html')
})

app.post("/db", async(req, res) => {
  const cliente = await dataBase.salvarNomes(req.body)
  return res.redirect('http://localhost:1525');
})

app.get("/user", async(req, res) => {
    const dados = dataBase.todos()
    res.send(dados)
})

app.get("/descricao/:id", async(req, res) => { 
  id = req.params.id
  id = {id: id.split(':').join('')}
  res.sendFile(__dirname + "/front_end/pagina2.html")
})

app.get("/bancoUni", async(req, res)=>{
  res.send(god)
})

app.get("/bancoId", async(req, res)=>{
  res.send(id)
})

app.get("/banco", async(req, res) => {
  const dados = [617502,467988,706972,809968,569016,466361,581726,848278,497698,508943,593910,37680]
  const db = await themovie.supew(dados)
  god = db
  res.send(db)
})



app.listen(1525)





