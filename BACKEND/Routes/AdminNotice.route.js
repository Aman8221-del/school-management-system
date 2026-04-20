const express = require("express");
const router = express.Router();

const NoticeModel = require("../models/AdminNotice.model");
const authmiddleware = require("../middelware/authmiddleware");

router.post("/", authmiddleware, async (req, res) => {
  try {
    const { title, description, audience } = req.body;

    const newnotice = new NoticeModel({
      title,
      description,
      audience,
      createdBy: req.user.id,
    });

    const savednotice = await newnotice.save();
    if (audience == "student")
      return res
        .status(201)
        .json({ message: "notice Created for students", data: savednotice });
    if (audience == "teacher")
      return res
        .status(201)
        .json({ message: "notice Created for teachers", data: savednotice });
    if (audience == "all")
      return res
        .status(202)
        .json({ message: "notice created for all", data: savednotice });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all notices

  router.get("/", authmiddleware, async (req, res) => {
    try {
      const usertype= req.query.type;
      
      let notices;

      console.log(usertype);
      if (usertype) {
        notices = await NoticeModel.find({
          $or: [{ audience: usertype }, { audience: "all" }],
        }).sort({ createdAt: -1 });
      } else {
        notices = await NoticeModel.find()
          .populate("createdBy", "name email")
          .sort({ createdAt: -1 });
      }
      res.json(notices);
    } catch (error) {
      console.log("GET NOTICE ERROR:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // delete notice

router.delete("/:id", async (req, res) => {
  try {
    const deletenotice = await NoticeModel.findByIdAndDelete(req.params.id);
    if (!deletenotice)
      return res.status(404).json({ message: "notice not found" });

    res.status(201).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
