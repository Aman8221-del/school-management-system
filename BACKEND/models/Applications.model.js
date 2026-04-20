const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    leaveType: String,
    reason: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const ApplicationModel = mongoose.model("Application", ApplicationSchema);
module.exports = ApplicationModel;
