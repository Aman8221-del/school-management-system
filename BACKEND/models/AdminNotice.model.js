const mongoose = require("mongoose");

const AdminNotice = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    audience: {
      type: String,
      enum: ["student", "teacher", "all"],
      default: "all",
    },
  },
  { timestamps: true },
);

const NoticeModel= mongoose.model("AdminNotices", AdminNotice)
module.exports= NoticeModel
