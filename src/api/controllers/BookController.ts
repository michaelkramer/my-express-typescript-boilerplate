// // URL: https://www.goodreads.com/api/auth_user
// // HTTP method: GET
// import { Type } from "class-transformer";
// import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
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

// //@Authorized()
// @JsonController("/book")
// @OpenAPI({ security: [{ basicAuth: [] }] })
// export class UserController {
//   //constructor(private userService: UserService) {}

//   @Get()
//   //@ResponseSchema({}, { isArray: true })
//   public find(): Promise {}
// }
