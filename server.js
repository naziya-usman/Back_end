const data = require("./data");
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  const EmployeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    skills: [String],
    contact: {
      email: String,
      phone: String,
    },
    department: String,
    experience: Number,
  });

  const Employee = mongoose.model("Employee", EmployeeSchema);
  for (const empobj of data) {
    const employeeData = new Employee(empobj);
    employeeData.save().then((d) => {
      console.log("saved");
    });
  }

  app.get("/employees", (req, res) => {
    Employee.find({}).then((result) => {
      res.json(result);
    });
  });

  app.get("/employees/:id", (req, res) => {
    const employeedIdInRequest = req.params.id;
    Employee.findById(employeedIdInRequest).then((result) => {
      res.json(result);
    });
  });

  app.post("/employees", (req, res) => {
    const newEmployee = req.body;
    console.log(newEmployee);
    const employeeData = new Employee(newEmployee);
    employeeData.save().then((newData) => {
      console.log(newData);
      res.json(newData);
    });
  });
  // ////////////////////////
  app.put("/employees/:id", (req, res) => {
    const employeedIdInRequest = req.params.id;
    const update = req.body;
    Employee.findByIdAndUpdate(employeedIdInRequest, update, {
      new: true,
      runValidators: true,
    }).then((data) => {
      res.json(data);
    });
  });

  app.delete("/employees/:id", (req, res) => {
    const employeedIdInRequest = req.params.id;
    Employee.findByIdAndDelete(employeedIdInRequest)
      .then((result) => {
        console.log("Document deleted:", result);
        res.json("Document deleted:", result);
      })
      .catch((err) => {
        console.error("Error:", err);
        res.json(err);
      });
  });
}

function validation(emplyName) {
  if (
    !emplyName.name ||
    typeof emplyName.name != "string" ||
    emplyName.name.trim() == ""
  ) {
    throw Error("Name is required and must be a non-empty string");
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
