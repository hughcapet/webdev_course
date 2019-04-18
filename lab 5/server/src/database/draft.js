const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Draft = new Schema({
    title: String,
    markdown: String
});

module.exports.Draft = mongoose.model("Draft", Draft);
