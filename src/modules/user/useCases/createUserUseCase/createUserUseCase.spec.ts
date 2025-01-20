import { compare } from "bcrypt"
import { UserRepositoryInMemory } from "../../repositories/UserReporitoryInMemory"
import { CreateUserUseCase } from "./createUserUseCase"

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })
  it("Should be able to create user", async () => {
    expect(userRepositoryInMemory.users).toEqual([])

    const user = await createUserUseCase.execute({
      name: "teste",
      email: "email@email.com",
      password: "teste",
      createdAt: new Date()
    })

    expect(userRepositoryInMemory.users).toEqual([user])
  })

  it("Should be able to create user with password encrypted", async () => {
    const userPasswordWithoutEncryption = "123123"

    const user = await createUserUseCase.execute({
      name: "teste",
      email: "email@email.com",
      password: userPasswordWithoutEncryption,
      createdAt: new Date()
    })

    const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password)

    expect(userHasPasswordEncrypted).toBeTruthy()
  })
})