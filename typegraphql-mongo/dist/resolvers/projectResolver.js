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
const projectSchema_1 = __importStar(require("../Schemas/projectSchema"));
const clientSchema_1 = __importStar(require("../Schemas/clientSchema"));
let AddProjectInput = class AddProjectInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProjectInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProjectInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], AddProjectInput.prototype, "complete", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddProjectInput.prototype, "clientId", void 0);
AddProjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddProjectInput);
let UpdateProjectInput = class UpdateProjectInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateProjectInput.prototype, "complete", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateProjectInput.prototype, "clientId", void 0);
UpdateProjectInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateProjectInput);
let ProjectResolver = class ProjectResolver {
    async project(id) {
        return projectSchema_1.ProjectModel.findById(id);
    }
    async projects() {
        return projectSchema_1.ProjectModel.find();
    }
    async client(project) {
        return clientSchema_1.ClientModel.findOne({ _id: project.clientId });
    }
    async addProject(addProjectData) {
        const newProject = await projectSchema_1.ProjectModel.create(addProjectData);
        newProject.save();
        return newProject;
    }
    async deleteProject(id) {
        return projectSchema_1.ProjectModel.findByIdAndDelete(id);
    }
    async updateProject(id, updateProjectData) {
        return projectSchema_1.ProjectModel.findByIdAndUpdate(id, updateProjectData, { new: true });
    }
};
__decorate([
    (0, type_graphql_1.Query)((returns) => projectSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, type_graphql_1.Query)((returns) => [projectSchema_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "projects", null);
__decorate([
    (0, type_graphql_1.FieldResolver)((returns) => clientSchema_1.default),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projectSchema_1.default]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "client", null);
__decorate([
    (0, type_graphql_1.Mutation)((returns) => projectSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "addProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => projectSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => projectSchema_1.default),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateProjectInput]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
ProjectResolver = __decorate([
    (0, type_graphql_1.Resolver)(projectSchema_1.default)
], ProjectResolver);
exports.default = ProjectResolver;
//# sourceMappingURL=projectResolver.js.map