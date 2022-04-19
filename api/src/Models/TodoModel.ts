import { Schema, model } from "mongoose";

interface TodoInterface {
    name: string
    description?: string
    complete: boolean
    readonly id: string
};

const todoSchema = new Schema<TodoInterface>({
    name: { type: String, required: true },
    description: { type: String },
    complete: { type: Boolean, required: true },
    id: { type: String, required: true }
});


export default model<TodoInterface>("Todo", todoSchema);