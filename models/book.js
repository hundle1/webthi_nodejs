const mongoose = require("mongoose");
const userSchema2 = new mongoose.Schema({
    NAME: mongoose.Schema.Types.String,
    MAIL: mongoose.Schema.Types.String,
    DATE: mongoose.Schema.Types.String,
    CATE: mongoose.Schema.Types.Array,
    PEOPLE: mongoose.Schema.Types.Number,
    LONG: mongoose.Schema.Types.String,
});
const table = mongoose.model("Table", userSchema2);
module.exports = table;