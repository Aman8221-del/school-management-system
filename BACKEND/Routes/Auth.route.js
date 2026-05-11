const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Model = require("../models/Schema.model");
const classesModel = require("../models/ClassesSchema.model");
const authmiddleware = require("../middelware/authmiddleware");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const existingemail = await Model.findOne({ email: data.email });
    if (existingemail) {
      return res.status(400).json({ message: "user already exists" });
    }

    const existingusername = await Model.findOne({ username: data.username });
    if (existingusername) {
      return res
        .status(400)
        .json({ message: "username already used try another" });
    }
    //role control

    if (!data.role) {
      data.role = "student";
    }

    if (data.role === "admin") {
      return res.status(403).json({ message: "Not allowed" });
    }

    // role base validation

    if (data.role === "student") {
      if (!data.age || !data.classId || !data.fathername || !data.rollno) {
        return res.status(400).json({ message: "student field required" });
      }
    }

    const newUser = new Model(data);
    const response = await newUser.save();
    res.status(201).json({ message: "user registered successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Model.findOne({ email, username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const passwordIsmatch = await bcrypt.compare(password, user.password);

    if (!passwordIsmatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    //Token generate
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secretkey",
      { expiresIn: "1d" },
    );

    //response

    res
      .status(200)
      .json({ message: " login successfully", token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get all users

router.get("/", async (req, res) => {
  const { role, classId } = req.query;

  let query = {};

  if (role) query.role = role;

  if (classId) {
    query.classId = classId;
  }

  const users = await Model.find(query)
    .populate("classId", "className section");

  res.json(users);
});

// student profile

router.get("/profile", authmiddleware, async (req, res) => {
  try {
    const student = await Model.findById(req.user.id).select("-password");
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// real count of all users and classes

router.get("/dashboard-stats", async (req, res) => {
  const totalStudents = await Model.countDocuments({ role: "student" });
  const totalTeachers = await Model.countDocuments({ role: "teacher" });

  const totalClasses = await classesModel.distinct("className"); // unique classes
  // const totalAttendance = await TeacherAttendance.countDocuments();

  res.json({
    totalStudents,
    totalTeachers,
    totalClasses: totalClasses.length,
    // totalAttendance,
  });
});

// teacher ke liye class fetch

router.get("/my-classes", authmiddleware, async (req, res) => {
  try {
    const teacherId = req.user.id;

    const classes = await classesModel.find({
      classTeacher: teacherId,
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// for Approve

router.put("/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const updateddata = req.body;
    const response = await Model.findByIdAndUpdate(userid, updateddata, {
      new: true,
      runValidators: true,
    });
    if (!response) return res.status(404).json({ message: "user not found" });
    res.status(201).json({ message: "data updated successfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete

router.delete("/:id", async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
