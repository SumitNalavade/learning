import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import catchAsync from "./Utils/catchAsync";

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/todo");

app.use(express.json());

import TodoModel, { TodoClass } from "./Models/TodoModel";

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);;
});

app.get("/", (req, res, next) => {
    return res.send("Hello World");
});

// Read
app.get("/todos", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const todos: TodoClass[] = await TodoModel.find({});
    return res.send({"todos": todos})
}));

// Create
app.post("/todos", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    const newTodo: TodoClass = await TodoModel.create({ name, description, complete: false, id: uuid() })

    const todos = await TodoModel.find({});
    return res.status(200).send({todos})
}));

// Destroy
app.delete("/todos/:id", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await TodoModel.findOneAndDelete({id});
    const todos = await TodoModel.find({});

    res.status(200).send({todos});
}));

// Update
app.patch("/todos/:id", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, complete } = req.body;

    await TodoModel.findOneAndUpdate({id}, { name, description, complete });
    const todos = await TodoModel.find({});

    res.status(200).send({todos});
}))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
    next(err);
});