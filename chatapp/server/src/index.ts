import express from "express";
import * as dotenv from "dotenv";

const app = express();
dotenv.config()
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Howdy World")
})
