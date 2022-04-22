import express, { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";
import catchAsync from "../Utils/catchAsync";

import TodoModel, { TodoClass } from "../Models/TodoModel";

export default {
    getAllTodos: catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const todos: TodoClass[] = await TodoModel.find({});
        return res.send({"todos": todos})
    }),

    createNewTodo: catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const { name, description } = req.body;
    
        const newTodo: TodoClass = await TodoModel.create({ name, description, complete: false, id: uuid() })
    
        const todos = await TodoModel.find({});
        return res.status(200).send({todos})
    }),

    deleteTodo: catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
    
        await TodoModel.findOneAndDelete({id});
        const todos = await TodoModel.find({});
    
        res.status(200).send({todos});
    }),

    updateTodo: catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const { name, description, complete } = req.body;
    
        await TodoModel.findOneAndUpdate({id}, { name, description, complete });
        const todos = await TodoModel.find({});
    
        res.status(200).send({todos});
    })
}