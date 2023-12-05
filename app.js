const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Minha Lista de Tarefas</h1>");
  res.statusCode = 200;
});

app.listen(3000, () => {
  console.log("Servidor ativo!");
});
