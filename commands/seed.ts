import { Connection } from "typeorm";
import { User } from "../src/api/models/User";

export default class CreateUsers {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: "Timber", lastName: "Saw" },
        { firstName: "Phantom", lastName: "Lancer" },
      ])
      .execute();
  }
}
const cu = new CreateUsers();
cu.run();
