import { ObjectType, Field, ID } from "type-graphql";
import { Prop, getModelForClass } from "@typegoose/typegoose";
import * as mongoose from "mongoose";

@ObjectType()
class Client {
    @Field(id => ID)
    _id: mongoose.Types.ObjectId

    @Field()
    @Prop({ required: true })
    name: String

    @Field()
    @Prop({ require: true })
    email: String

    @Field()
    @Prop({ required: true })
    phone: String
}

export default Client
export const ClientModel = getModelForClass(Client);