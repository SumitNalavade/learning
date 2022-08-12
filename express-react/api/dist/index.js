"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
mongoose_1.default.connect("mongodb://localhost:27017/todo");
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
app.use(express_1.default.json());
app.use("/todos", todoRoutes_1.default);
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);
    ;
});
app.get("/", (req, res, next) => {
    return res.send("Hello World");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next(err);
});
//# sourceMappingURL=index.js.map