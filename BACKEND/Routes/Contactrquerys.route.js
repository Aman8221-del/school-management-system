const express = require("express");
const router = express.Router();

const ContactqueryModel = require("../models/ContactQuery.model");
const authmiddleware = require("../middelware/authmiddleware");

router.post("/", async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    const newQuery = new ContactqueryModel({
      name,
      phone,
      message,
    });
    const savedquery = await newQuery.save();
    res.status(201).json({ message: "Query sent", data: savedquery });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all querys in manager dashboard

router.get("/", authmiddleware, async (req, res) => {
  try {
    const queries = await ContactqueryModel.find();
    res.status(201).json({ message: "queries found", queries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  await ContactqueryModel.findByIdAndDelete(req.params.id);
  res.status(201).json({ message: "Geleted successfully" });
});

module.exports = router;
