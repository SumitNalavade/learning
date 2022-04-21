import { getModelForClass, prop } from "@typegoose/typegoose";

export class TodoClass {
    @prop({ required: true })
    public name: string;

    @prop()
    public description: string;

    @prop({ required: true })
    public complete: boolean;

    @prop({ required: true })
    public id: string
}

export default getModelForClass(TodoClass);