"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const catchAsync_1 = __importDefault(require("./Utils/catchAsync"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
mongoose_1.default.connect("mongodb://localhost:27017/todo");
app.use(express_1.default.json());
const TodoModel_1 = __importDefault(require("./Models/TodoModel"));
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);
    ;
});
app.get("/", (req, res, next) => {
    return res.send("Hello World");
});
// Read
app.get("/todos", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield TodoModel_1.default.find({});
    return res.send({ "todos": todos });
})));
// Create
app.post("/todos", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const newTodo = new TodoModel_1.default({ name, description, complete: false, id: (0, uuid_1.v4)() });
    yield newTodo.save();
    return res.sendStatus(200);
})));
// Destroy
app.delete("/todos/:id", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield TodoModel_1.default.findOneAndDelete({ id });
    const todos = yield TodoModel_1.default.find({});
    res.status(200).send({ todos });
})));
// Update
app.patch("/todos/:id", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, complete } = req.body;
    yield TodoModel_1.default.findOneAndUpdate({ id }, { name, description, complete });
    const todos = yield TodoModel_1.default.find({});
    res.status(200).send({ todos });
})));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    next(err);
});
//# sourceMappingURL=index.js.map