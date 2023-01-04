import {
  Resolver,
  Query,
  Arg,
  FieldResolver,
  Root,
  InputType,
  Field,
  Mutation,
} from "type-graphql";

import Project, { ProjectModel } from "../Schemas/projectSchema";
import Client, { ClientModel } from "../Schemas/clientSchema";

@InputType()
class AddProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field({ defaultValue: false })
  complete?: boolean;

  @Field()
  clientId: string;
}

@InputType()
class UpdateProjectInput implements Partial<Project> {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string

  @Field({ nullable: true })
  complete: boolean

  @Field({ nullable: true })
  clientId: string
}

@Resolver(Project)
class ProjectResolver {
  @Query((returns) => Project)
  async project(@Arg("id") id: string) {
    return ProjectModel.findById(id);
  }

  @Query((returns) => [Project])
  async projects() {
    return ProjectModel.find()
  }

  @FieldResolver((returns) => Client)
  async client(@Root() project: Project) {
    return ClientModel.findOne({ _id: project.clientId })
  }

  @Mutation((returns) => Project)
  async addProject(@Arg("data") addProjectData: AddProjectInput) {
    const newProject = await ProjectModel.create(addProjectData)
    newProject.save()

    return newProject;
  }

  @Mutation(returns => Project)
  async deleteProject(@Arg("id") id: string) {
    return ProjectModel.findByIdAndDelete(id)
  }

  @Mutation(returns => Project)
  async updateProject(@Arg("id") id: string, @Arg("data") updateProjectData: UpdateProjectInput) {
    return ProjectModel.findByIdAndUpdate(id, updateProjectData, { new: true })
  }
}

export default ProjectResolver;
