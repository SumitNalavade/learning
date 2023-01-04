import {
  Resolver,
  Query,
  Arg,
  Mutation,
  InputType,
  Field,
  FieldResolver,
  Root
} from "type-graphql";

import Client, { ClientModel } from "../Schemas/clientSchema";
import Project, { ProjectModel } from "../Schemas/projectSchema";

@InputType()
class AddClientInput implements Partial<Client> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}

@InputType()
class UpdateClientInput implements Partial<Client> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string
}

@Resolver(Client)
class ClientResolver {
  @Query((returns) => Client)
  async client(@Arg("id") id: string) {
    return await ClientModel.findById(id)
  }

  @Query((returns) => [Client])
  async clients() {
    return await ClientModel.find()
  }
  
  @Mutation((returns) => Client)
  async addClient(@Arg("data") addClientData: AddClientInput) {
    const { name, email, phone } = addClientData;

    const newClient = (await ClientModel.create({ name, email, phone })).save()

    return newClient;
  }

  @Mutation(returns => Client)
  async deleteClient(@Arg("id") id: string) {
    ProjectModel.deleteMany({ clientId: id })

    return ClientModel.findByIdAndDelete(id)
  }

  @Mutation(returns => Client)
  async updateClient(@Arg("id") id: string, @Arg("data") data: UpdateClientInput) {
    return ClientModel.findByIdAndUpdate(id, data, { new: true })
  }
}

export default ClientResolver;
