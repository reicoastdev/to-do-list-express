const express = require("express");
const router = express.Router();
const Checklist = require("../models/checklist");

router.get("/", async (req, res) => {
  try {
    const checklists = await Checklist.find({});
    res.status(200).render("checklists/index", { checklists: checklists });
  } catch (err) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(422)
      .render("pages/error", { errors: "Erro ao carregar o formulário" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res.status(500).render("pages/error", {
      error: "Erro ao exibir a edição de lista de tarefas",
    });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;

  try {
    await Checklist.findByIdAndUpdate(req.params.id, { name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, errors } });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (err) {
    res
      .status(500)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(422)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("pages/error", { error: "Erro ao deletar a Lista de tarefas" });
  }
});
module.exports = router;
