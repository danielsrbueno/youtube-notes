import { Body, Controller, Post } from "@nestjs/common"
import { CreateUserUseCase } from "src/modules/user/useCases/createUserUseCase/createUserUseCase"
import { CreateUserBody } from "./dtos/createUserBody"

@Controller("users")
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {

  }
  
  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password, createdAt } = body

    const user = await this.createUserUseCase.execute({ name, email, password, createdAt })
    return user
  }
}