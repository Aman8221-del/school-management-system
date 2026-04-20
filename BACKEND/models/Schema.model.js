const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ModelSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "manager"],
    },
    username: {
      type: String,
      required: function () {
        return this.role === "student" || this.role === "teacher" || this.role === "admin";
      },
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    standerd: {
      type: String,
      required: function () {
        return this.role === "student" || this.role==="teacher";
      },
    },
    rollno: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    age: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    fathername: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone:{
      type:Number,
      required:function(){
        return this.role ==="student" || this.role==="teacher" || this.role==="manager"
      }
    },
    subject:{
      type:String,
      required:function(){
        return this.role==="teacher"
      }
    }
  },
  { timestamps: true },
);

ModelSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password, salt);
    this.password = hashedpassword;
  } catch (error) {
    consoel.log(error);
  }
});

const Model = mongoose.model("user", ModelSchema);

module.exports = Model;
