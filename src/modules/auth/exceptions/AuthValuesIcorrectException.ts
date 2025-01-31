import { HttpStatus } from "@nestjs/common"
import { AppException } from "src/excepitions/appExcepition"

export class AuthValuesIcorrectException extends AppException {
  constructor() {
    super({
      message:"Email ou senha incorretos",
      status: HttpStatus.UNAUTHORIZED,
    })
  }
}