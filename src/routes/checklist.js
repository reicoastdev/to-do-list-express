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

router.get("/:id", async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
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

module.exports = router;
