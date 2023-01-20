"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv = require("dotenv");
var app = (0, express_1["default"])();
dotenv.config();
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Express app listening on port ".concat(PORT));
});
app.get("/", function (req, res) {
    res.send("Hello World");
});
