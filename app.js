// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const budegtControllers = require("./controllers/budgetController");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json()); // Parse incoming JSON
app.use(cors());

// ROUTES
app.use("/transactions", budegtControllers);

app.get("/", (req, res) => {
  res.send("Welcome to the Budgeting App");
});

// ERROR HANDLING
app.get("*", (req, res) => {
  res
    .status(404)
    .redirect("https://github.com/joinpursuit/budgeting-app-project-prompt");
});

// EXPORT
module.exports = app;
