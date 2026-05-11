const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true, // 5A, 6B repeat na ho
  },

  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Teacher
    default: null,
  },

  // optional (future ke liye useful)
  section: {
    type: String, // A, B, C
    default: "",
  },

  // optional (future features)
  subjects: [
    {
      type: String, // Math, Science
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const classesModel = mongoose.model("class", classSchema);
module.exports = classesModel;
