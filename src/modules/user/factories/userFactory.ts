import { User } from "../entities/User"

type Override = Partial<User>

export const makeUser = ({ id, ...override }: Override) => {
  return new User ({
    name: "danzin",
    email: "drx@dan.com",
    password: "cusze",
    createdAt: new Date(),
    ...override
  },
  id)
}