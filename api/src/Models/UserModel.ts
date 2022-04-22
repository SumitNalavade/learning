import { getModelForClass, prop } from "@typegoose/typegoose";
import { TodoClass } from "./TodoModel";

export class UserClass {
    @prop({ required: true })
    public username: string;

    @prop({ required: true })
    public password: string

    @prop()
    public todos: [TodoClass]
};

export default getModelForClass(UserClass);