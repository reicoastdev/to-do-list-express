const express = require("express");
const path = require("path");
const app = express();

const methodOverride = require("method-override");

const checklistRouter = require("./src/routes/checklist");
const rootRouter = require("./src/routes/index");
const taskRouter = require("./src/routes/task");

// database
require("./config/database");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/checklists", checklistRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simple);
app.use("/", rootRouter);

// views engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// iniciar servidor
app.listen(3000, () => {
  console.log("Servidor ativo!");
});
