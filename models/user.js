const mongoose = require("mongoose");
const userSchema1 = new mongoose.Schema({
  ID: mongoose.Schema.Types.Number,
  NAME: mongoose.Schema.Types.String,
  PIC: mongoose.Schema.Types.String,
  DES: mongoose.Schema.Types.String,
  DATE: mongoose.Schema.Types.String,
  PRICE: mongoose.Schema.Types.Number,
  CPN: mongoose.Schema.Types.String,
});
const register = mongoose.model("Register", userSchema1);
module.exports = register;

