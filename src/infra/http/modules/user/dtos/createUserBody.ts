import { IsStringCustom } from "src/infra/http/classValidator/decorators/IsStringCustom"
import { IsNotEmptyCustom } from "src/infra/http/classValidator/decorators/IsNotEmptyCustom"
import { IsEmailCustom } from "src/infra/http/classValidator/decorators/IsEmailCustom"
import { MinLengthCustom } from "src/infra/http/classValidator/decorators/MinLengthCustom"

export class CreateUserBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string

  @IsEmailCustom()
  @IsStringCustom()
  @IsNotEmptyCustom()
  email: string

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string
}