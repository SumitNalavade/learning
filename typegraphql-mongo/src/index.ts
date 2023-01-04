import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import * as dotenv from "dotenv"
dotenv.config()
import "reflect-metadata";

import { TypegooseMiddleware } from "./utils/typegoose-middleware";

import ClientResolver from "./resolvers/clientResolver";
import ProjectResolver from "./resolvers/projectResolver";

const PORT = process.env.PORT || 5000;

async function main() {
    const schema = await buildSchema({
        resolvers: [ClientResolver, ProjectResolver],
        validate: { forbidUnknownValues: false },
        globalMiddlewares: [TypegooseMiddleware]
    });

    const server = new ApolloServer({
        schema,
    })

    mongoose.connect("mongodb://127.0.0.1:27017/graphql-express")
    const db = mongoose.connection;
    db.on("error", () => console.error("Mongoose connection error"))
    db.once("open", () => console.log("Mongoose database connected"))

    const { url } = await server.listen(PORT)
    console.log(`GraphQL server listening at ${url}`);
}

main();