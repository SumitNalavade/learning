import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import catchAsync from "./Utils/catchAsync";

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/todo");

app.use(express.json());

import Todo from "./Models/TodoModel";

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);;
});

app.get("/", (req, res, next) => {
    return res.send("Hello World");
});

// Read
app.get("/todos", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const todos = await Todo.find({});
    return res.send({"todos": todos})
}));

// Create
app.post("/todos", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const newTodo = new Todo({name, description, complete: false, id: uuid()});
    await newTodo.save();

    return res.sendStatus(200);
}));

// Destroy
app.delete("/todos/:id", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    await Todo.findOneAndDelete({id: id});

    res.sendStatus(200);
}));

// Update
app.patch("/todos/:id", catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, complete } = req.body;

    await Todo.findByIdAndUpdate(id, { name, description, complete });

    res.sendStatus(200);
}))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
    next();
});