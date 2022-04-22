"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
mongoose_1.default.connect("mongodb://localhost:27017/todo");
app.use(express_1.default.json());
const todoRouteFunctions_1 = __importDefault(require("./Utils/todoRouteFunctions"));
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);
    ;
});
app.get("/", (req, res, next) => {
    return res.send("Hello World");
});
// Read
app.get("/todos", todoRouteFunctions_1.default.getAllTodos);
// Create
app.post("/todos", todoRouteFunctions_1.default.createNewTodo);
// Destroy
app.delete("/todos/:id", todoRouteFunctions_1.default.deleteTodo);
// Update
app.patch("/todos/:id", todoRouteFunctions_1.default.updateTodo);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next(err);
});
//# sourceMappingURL=index.js.map