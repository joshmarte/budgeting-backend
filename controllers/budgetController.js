// DEPENDENCIES
const express = require("express");
const budgetData = require("../models/budgetData");

// CONFIGURATION
const budgetControllers = express.Router();

// READ
budgetControllers.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(budgetData[id] ? budgetData[id] : res.status(404).redirect());
});

budgetControllers.get("/", (req, res) => {
  res.json(budgetData);
});

budgetControllers.get("/type", (req, res) => {
  let { name } = req.query;

  let specificTrans = budgetData.filter((item) => {
    return item.item_name.toLowerCase() === name;
  });

  if (name) {
    res.json(specificTrans);
  } else {
    res.json(budgetData);
  }
});

// CREATE
budgetControllers.post("/", (req, res) => {
  budgetData.push(req.body);
  res.json(budgetData[budgetData.length - 1]);
});

// UPDATE
budgetControllers.put("/:arrayIndex", (req, res) => {
  if (budgetData[req.params.arrayIndex]) {
    budgetData[req.params.arrayIndex] = req.body;
    res.status(200).json(budgetData[req.params.arrayIndex]);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE
budgetControllers.delete("/:indexArray", (req, res) => {
  if (budgetData[req.params.indexArray]) {
    const deletedBudgetData = budgetData.splice(req.params.indexArray, 1);
    res.status(200).json(deletedBudgetData);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// EXPORT
module.exports = budgetControllers;
