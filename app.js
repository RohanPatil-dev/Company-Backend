const express = require("express");
const app = express();
const PORT = 8081;

// import path
const path = require("path")

const cors = require("cors")
const bodyParser = require("body-parser")

// import db connection
const {connection} = require("./DB connection/connection")

app.use(cors())
app.use(bodyParser.json())

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));


// connection
connection("mongodb://127.0.0.1:27017/company").then(() => {
    console.log("MongoDB is connected successfully..........");
 }).catch((err) => {
    console.log(err);
 });


//  routes
const userRoute = require("./Routes/user")
const projectRoute = require("./Routes/project")

app.use("/",userRoute)
app.use("/project",projectRoute)

app.listen(PORT, () => console.log("Server running on port " + PORT));