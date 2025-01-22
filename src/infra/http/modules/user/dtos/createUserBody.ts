import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  createdAt: Date
}