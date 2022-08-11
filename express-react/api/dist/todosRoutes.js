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
const uuid_1 = require("uuid");
const catchAsync_1 = __importDefault(require("./Utils/catchAsync"));
const index_1 = require("./index");
const TodoModel_1 = __importDefault(require("./Models/TodoModel"));
// Read
index_1.app.get("/todos", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield TodoModel_1.default.find({});
    return res.send({ "todos": todos });
})));
// Create
index_1.app.post("/todos", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    const newTodo = yield TodoModel_1.default.create({ name, description, complete: false, id: (0, uuid_1.v4)() });
    const todos = yield TodoModel_1.default.find({});
    return res.status(200).send({ todos });
})));
// Destroy
index_1.app.delete("/todos/:id", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield TodoModel_1.default.findOneAndDelete({ id });
    const todos = yield TodoModel_1.default.find({});
    res.status(200).send({ todos });
})));
// Update
index_1.app.patch("/todos/:id", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, complete } = req.body;
    yield TodoModel_1.default.findOneAndUpdate({ id }, { name, description, complete });
    const todos = yield TodoModel_1.default.find({});
    res.status(200).send({ todos });
})));
//# sourceMappingURL=todosRoutes.js.map