import { Field, ID, ObjectType } from "type-graphql";
import { Prop, getModelForClass } from "@typegoose/typegoose";
import  * as mongoose from "mongoose"

@ObjectType()
class Project {
    @Field(type => ID)
    id: mongoose.Types.ObjectId

    @Field()
    @Prop({ required: true })
    name: String

    @Field()
    @Prop({ required: true })
    description: String

    @Field({ nullable: true, defaultValue: false })
    @Prop()
    complete: boolean

    @Field(type => ID)
    @Prop({ required: true })
    clientId: String
}

export default Project
export const ProjectModel = getModelForClass(Project);