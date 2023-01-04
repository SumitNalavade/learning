"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("reflect-metadata");
const clientResolver_1 = __importDefault(require("./resolvers/clientResolver"));
const projectResolver_1 = __importDefault(require("./resolvers/projectResolver"));
const PORT = process.env.PORT || 5000;
async function main() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [clientResolver_1.default, projectResolver_1.default],
        validate: { forbidUnknownValues: false }
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    mongoose_1.default.connect("mongodb://127.0.0.1:27017/graphql-express");
    const db = mongoose_1.default.connection;
    db.on("error", () => console.error("Mongoose connection error"));
    db.once("open", () => console.log("Mongoose database connected"));
    const { url } = await server.listen(PORT);
    console.log(`GraphQL server listening at ${url}`);
}
main();
//# sourceMappingURL=index.js.map