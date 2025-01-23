import { User } from "src/modules/user/entities/User"
import { ValidateUserUseCase } from "./validateUserUseCase"
import { UserRepositoryInMemory } from "src/modules/user/repositories/UserReporitoryInMemory"
import { hash } from "bcrypt"
import { makeUser } from "src/modules/user/factories/userFactory"
import { UnauthorizedException } from "@nestjs/common"

let validateUserUseCase: ValidateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("Validate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory)
  })

  it("Shold be able to return user when credentials are correct", async () => {
    const userPasswordWithoutEncryption = "cusze"

    const user = new User({
      name: "danzin",
      email: "drx@dan.com",
      password: await hash(userPasswordWithoutEncryption, 10),
      createdAt: new Date()
    })

    userRepositoryInMemory.users = [user]

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption
    })

    expect(result).toEqual(user)
  })

  it("Shold be able to throw error when credentials incorrect", async () => {
    const userPasswordWithoutEncryption = "cusze"

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10)
    })

    userRepositoryInMemory.users = [user]

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: "incorre"
      })
    }).rejects.toThrow(UnauthorizedException)
  })
})