const express = require("express");
const router = express.Router();

const ApplicationModel = require("../models/Applications.model");
const authmiddleware = require("../middelware/authmiddleware");

router.post("/apply", authmiddleware, async (req, res) => {
  try {
    const { leaveType, reason } = req.body;
    const newApplication = new ApplicationModel({
      teacherId: req.user.id,
      leaveType,
      reason,
    });
    const saveApplication = await newApplication.save();
    res
      .status(201)
      .json({ message: "Application Submitted", data: saveApplication });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// teachers application dheke

router.get("/my-applications", authmiddleware, async (req, res) => {
  try {
    const appli = await ApplicationModel.find({
      teacherId: req.user.id,
    });
    res.status(201).json({ message: "data successfully get", data: appli });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// admin application dheke

router.get("/all", authmiddleware, async (req, res) => {
  try {
    const responce = await ApplicationModel.find()
      .populate("teacherId", "name email")
      .sort({ createdAt: -1 });
    res.json({ data: responce });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// admin application approve reject status

router.put("/status/:id", authmiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const responce = await ApplicationModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    res.json({ message: `Application ${status}`, data: responce });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
