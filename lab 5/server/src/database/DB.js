const mongoose = require("mongoose");
const credentials = require('./credentials');

mongoose.connect(
    `mongodb+srv://${credentials.user}:${credentials.password}@bungina-jwl9m.mongodb.net/test?retryWrites=true"`,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
    console.log("Successfully connected to DB");
});

const Schema = mongoose.Schema;

let Draft = new Schema({
    title: String,
    markdown: String
});

module.exports.Draft = Draft;