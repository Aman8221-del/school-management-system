const express = require("express");
const router = express.Router();

const classesModel = require("../models/ClassesSchema.model");

router.post("/class", async (req, res) => {
  try {
    const newclass = await classesModel.create(req.body);
    res.json(newclass);
  } catch (error) {
    res.status(500).json({ message: "error creating class" });
  }
});

router.get("/class", async (req, res) => {
  const classes = await classesModel.find().populate("classTeacher");
  res.json(classes);
});



router.put("/class/:id", async (req, res) => {
  try {
    const { classTeacher } = req.body;

    if (classTeacher) {
      const existing = await classesModel.findOne({
        classTeacher,
        _id: { $ne: req.params.id },
      });

      if (existing) {
        return res.json({
          message: "Teacher already assigned to another class",
        });
      }
    }

    const updated = await classesModel.findByIdAndUpdate(
      req.params.id,
      { classTeacher: classTeacher || null },
      { returnDocument: "after" },
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating class" });
  }
});





module.exports = router;
