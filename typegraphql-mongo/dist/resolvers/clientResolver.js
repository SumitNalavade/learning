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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const clientSchema_1 = __importStar(require("../Schemas/clientSchema"));
const projectSchema_1 = __importStar(require("../Schemas/projectSchema"));
let AddClientInput = class AddClientInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddClientInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddClientInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddClientInput.prototype, "phone", void 0);
AddClientInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddClientInput);
let UpdateClientInput = class UpdateClientInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateClientInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateClientInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateClientInput.prototype, "phone", void 0);
UpdateClientInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateClientInput);
let ClientResolver = class ClientResolver {
    async client(id) {
        return await clientSchema_1.ClientModel.findById(id);
    }
    async clients() {
        return await clientSchema_1.ClientModel.find();
    }
    async projects(client) {
        const foundClient = (await clientSchema_1.ClientModel.findOne(client)).toObject();
        console.log(foundClient._id.toString());
        return await projectSchema_1.ProjectModel.find({ clientId: foundClient._id.toString() });
    }
    async addClient(addClientData) {
        const { name, email, phone } = addClientData;
        const newClient = (await clientSchema_1.ClientModel.create({ name, email, phone })).save();
        return newClient;
    }
    async deleteClient(id) {
        projectSchema_1.ProjectModel.deleteMany({ clientId: id });
        return clientSchema_1.ClientModel.findByIdAndDelete(id);
    }
    async updateClient(id, data) {
        return clientSchema_1.ClientModel.findByIdAndUpdate(id, data, { new: true });
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => clientSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "client", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => [clientSchema_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "clients", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(returns => [projectSchema_1.default]),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [clientSchema_1.default]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => clientSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddClientInput]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "addClient", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => clientSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "deleteClient", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => clientSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateClientInput]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "updateClient", null);
ClientResolver = __decorate([
    (0, type_graphql_1.Resolver)(clientSchema_1.default)
], ClientResolver);
exports.default = ClientResolver;
//# sourceMappingURL=clientResolver.js.map