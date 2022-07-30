import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/todo");

import todoRouter from "./routes/todoRoutes";

app.use(express.json());
app.use("/todos", todoRouter);

app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Express app listening on PORT ${PORT}`);;
});

app.get("/", (req, res, next) => {
    return res.send("Hello World");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!');
    next(err);
});