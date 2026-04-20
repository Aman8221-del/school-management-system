  const mongoose = require("mongoose");
  require("dotenv").config();
  const bcrypt= require("bcrypt")
  const express= require("express")
  const router= express.Router()
  

  const Model = require("../models/Schema.model");

  mongoose.connect(process.env.MONGODB_URL);

  const createSuperAdmin = async () => {
    try {
     const existingAdmin = await Model.findOne({
        email: "amanpayal935@gmail.com",
      });
      console.log("Mongo URL:", process.env.MONGODB_URL);
      if (existingAdmin) {
       console.log("this super Admin already exist");
       process.exit()
     
      }
     
      const admin = new Model({
        name: "aman kumar",
        username:"Aman@",
        email: "amanpayal935@gmail.com",
        password: 12345,
        role:"admin"
      });
      await admin.save()
      console.log("super admin created successfully")
      process.exit()
    } catch (error) {
      console.log("ERROR:",error)
      process.exit(1)
    }
  };

  createSuperAdmin()


