const mongoose = require("mongoose");

const dbURL = process.env.DB_URL || "mongodb://localhost:27017/graphql-express"

const connectDB = () => {
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:".red.underline.bold));
    db.once("open", () => {
        console.log("Datbase connected".green.underline.bold);
    });
}

module.exports = connectDB;