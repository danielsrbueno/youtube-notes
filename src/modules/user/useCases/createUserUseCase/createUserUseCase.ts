import { Injectable } from "@nestjs/common"
import { UserRepository } from "../../repositories/UserRepository"
import { User } from "../../entities/User"
import { hash } from "bcrypt"


interface CreateUserRequest {
  name: string
  email: string
  password: string
  createdAt: Date
}

@Injectable()
export class CreateUserUseCase {
  constructor (private userRepository: UserRepository){

  }

  async execute({name, email, password, createdAt}: CreateUserRequest) {
    const user = new User({
      name,
      email,
      password: await hash(password, 10),
      createdAt
    })

    await this.userRepository.create(user)

    return user
  }
}