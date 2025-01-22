import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

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
  @MinLength(6)
  password: string

  createdAt: Date
}