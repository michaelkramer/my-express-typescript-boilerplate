// import { Type } from "class-transformer";
// import { IsEmail, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
// import {
//   //Authorized,
//   Body,
//   Delete,
//   Get,
//   JsonController,
//   OnUndefined,
//   Param,
//   Post,
//   Put,
//   Req,
// } from "routing-controllers";
// import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

// import { UserNotFoundError } from "../errors/UserNotFoundError";
// import { User } from "../models/User";
// import { UserService } from "../services/UserService";

// @JsonController("/Seed")
// @OpenAPI({ security: [{ basicAuth: [] }] })
// export class UserController {
//   constructor(private userService: UserService) {}

//   @Get()
//   @ResponseSchema(UserResponse, { isArray: true })
//   public find(): Promise<User[]> {
//     return this.userService.find();
//   }
// }
