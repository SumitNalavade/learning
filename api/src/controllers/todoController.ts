import { Request, Response } from "express";
import TodoModel, { TodoClass } from "../Models/TodoModel";
import { v4 as uuid } from "uuid";

export const getAllTodos = async(req: Request, res: Response) => {
    const todos: TodoClass[] = await TodoModel.find({});
    return res.send({"todos": todos})
};

export const createNewTodo = async(req: Request, res: Response) => {
    const { name } = req.body;

    const newTodo: TodoClass = await TodoModel.create({ name, complete: false, id: uuid() })

    const todos = await TodoModel.find({});
    return res.status(200).send({todos})
}

export const deleteTodo = async(req: Request, res: Response) => {
    const { id } = req.params;

    await TodoModel.findOneAndDelete({id});
    const todos = await TodoModel.find({});

    res.status(200).send({todos});
}

export const updateTodo = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { name, complete } = req.body;

    await TodoModel.findOneAndUpdate({id}, { name, complete });
    const todos = await TodoModel.find({});

    res.status(200).send({todos});
}