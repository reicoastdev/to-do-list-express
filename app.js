const express = require("express");
const path = require("path");
const app = express();
const checklistRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");

// database
require("./config/database");

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/checklists", checklistRouter);
app.use("/", rootRouter);

// views engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor ativo!");
});
