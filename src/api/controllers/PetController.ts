import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  OnUndefined,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

import { PetNotFoundError } from "../errors/PetNotFoundError";
import { Pet } from "../models/Pet";
import { PetService } from "../services/PetService";
import { UserResponse } from "./UserController";

class BasePet {
  @IsNotEmpty()
  public name: string;

  @IsNumber()
  public age: number;
}

export class PetResponse extends BasePet {
  @IsNumber()
  public id: number;

  @ValidateNested()
  public user: UserResponse;
}

class CreatePetBody extends BasePet {
  @IsNumber()
  public userId: number;
}

@Authorized()
@JsonController("/pets")
@OpenAPI({ security: [{ basicAuth: [] }] })
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  @ResponseSchema(PetResponse, { isArray: true })
  public find(): Promise<Pet[]> {
    return this.petService.find();
  }

  @Get("/:id")
  @OnUndefined(PetNotFoundError)
  @ResponseSchema(PetResponse)
  public one(@Param("id") id: number): Promise<Pet | undefined> {
    return this.petService.findOne(id);
  }

  @Post()
  @ResponseSchema(PetResponse)
  public create(@Body({ required: true }) body: CreatePetBody): Promise<Pet> {
    const pet = new Pet();
    pet.age = body.age;
    pet.name = body.name;
    pet.userId = body.userId;

    return this.petService.create(pet);
  }

  @Put("/:id")
  @ResponseSchema(PetResponse)
  public update(@Param("id") id: number, @Body() body: BasePet): Promise<Pet> {
    const pet = new Pet();
    pet.age = body.age;
    pet.name = body.name;

    return this.petService.update(id, pet);
  }

  @Delete("/:id")
  public delete(@Param("id") id: number): Promise<void> {
    return this.petService.delete(id);
  }
}
