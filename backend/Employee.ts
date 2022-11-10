const mongoose_ = require("mongoose");
const Schema = mongoose_.Schema;

const EmployeeSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: Number,
});

module.exports = mongoose_.model("Employees", EmployeeSchema);


