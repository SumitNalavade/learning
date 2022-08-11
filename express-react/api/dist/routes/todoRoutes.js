"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catchAsync_1 = __importDefault(require("../Utils/catchAsync"));
const todoController_1 = require("../controllers/todoController");
const router = (0, express_1.Router)();
router.get("/", (0, catchAsync_1.default)(todoController_1.getAllTodos));
router.post("/", (0, catchAsync_1.default)(todoController_1.createNewTodo));
router.delete("/:id", (0, catchAsync_1.default)(todoController_1.deleteTodo));
router.patch("/:id", (0, catchAsync_1.default)(todoController_1.updateTodo));
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map