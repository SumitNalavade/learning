import { Schema, model } from "mongoose";

interface TodoInterface {
    name: string
    description: string
    complete: boolean
};

const todoSchema = new Schema<TodoInterface>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    complete: { type: Boolean, required: true }
});


export default model<TodoInterface>("Todo", todoSchema);