import { Injectable } from "@nestjs/common"
import { UserRepository } from "../../repositories/UserRepository"
import { User } from "../../entities/User"
import { hash } from "bcrypt"
import { UserWithSameEmailException } from "../../exceptions/UserWithSameEmailExceptions"


interface CreateUserRequest {
  name: string
  email: string
  password: string
}

@Injectable()
export class CreateUserUseCase {
  constructor (private userRepository: UserRepository){

  }

  async execute({name, email, password}: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if(userAlreadyExist) throw new UserWithSameEmailException()

    const user = new User({
      name,
      email,
      password: await hash(password, 10),
    })

    console.log(user, email, password)

    await this.userRepository.create(user)

    return user
  }
}