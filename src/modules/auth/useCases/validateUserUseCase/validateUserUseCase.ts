import { UserRepository } from "src/modules/user/repositories/UserRepository"
import { Injectable } from "@nestjs/common"
import { compare } from "bcrypt"
import { AuthValuesIcorrectException } from "../../exceptions/AuthValuesIcorrectException"

interface ValidateUserRequest {
  email: string
  password: string
}

@Injectable()
export class ValidateUserUseCase {
  constructor (private userRepository: UserRepository) {}

  async execute({ email, password }: ValidateUserRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new AuthValuesIcorrectException()

    const isPasswordMatched = await compare(password, user.password)

    if (!isPasswordMatched) throw new AuthValuesIcorrectException()

    return user
  }
}