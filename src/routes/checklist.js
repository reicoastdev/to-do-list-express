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

router.get("/:id", async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (err) {
    res
      .status(422)
      .render("pages/error", { error: "Erro ao exibir as Listas" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const checklist = await Checklist.create({ name });
    res.status(200).json(checklist);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = router;
