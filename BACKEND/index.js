require("dotenv").config();
const express = require("express");
const db = require("./db/db");
const cors = require("cors");

app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const router = require("./Routes/studentsRoute");
// app.use("/students", router);

const authrouter = require("./Routes/Auth.route");
app.use("/", authrouter);

const adminnoticerouter = require("./Routes/AdminNotice.route");
app.use("/notice", adminnoticerouter);

const contactQueryrouter = require("./Routes/Contactrquerys.route");
app.use("/query", contactQueryrouter);

const Applicationrouter = require("./Routes/Application.route");
app.use("/application", Applicationrouter);

app.listen("4000", (req, res) => {
  console.log("server started at 4000");
});
