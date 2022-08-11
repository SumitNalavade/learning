import { Router, Request, Response } from "express";
import catchAsync from "../Utils/catchAsync";
import { getAllTodos, createNewTodo, updateTodo, deleteTodo } from "../controllers/todoController";

const router = Router();

router.get("/", catchAsync(getAllTodos));

router.post("/", catchAsync(createNewTodo));

router.delete("/:id", catchAsync(deleteTodo));

router.patch("/:id", catchAsync(updateTodo));

export default router;
