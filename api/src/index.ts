import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/todo");

app.use(express.json());

import TodoRouteFunctions from "./Utils/todoRouteFunctions";

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);;
});

app.get("/", (req, res, next) => {
    return res.send("Hello World");
});

// Read
app.get("/todos", TodoRouteFunctions.getAllTodos);

// Create
app.post("/todos", TodoRouteFunctions.createNewTodo);

// Destroy
app.delete("/todos/:id", TodoRouteFunctions.deleteTodo);

// Update
app.patch("/todos/:id", TodoRouteFunctions.updateTodo)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
    next(err);
});