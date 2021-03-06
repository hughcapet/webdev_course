const mongoose = require("mongoose");
const credentials = require('./credentials');

mongoose.connect(
    `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.address}?retryWrites=true"`,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
    console.log("Successfully connected to DB");


});
