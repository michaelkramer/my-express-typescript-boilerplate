import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Pet } from "../../../src/api/models/Pet";

export default class CreatePets implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Pet)().createMany(10);
  }
}
