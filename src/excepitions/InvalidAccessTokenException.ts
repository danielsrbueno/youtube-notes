import { HttpStatus } from "@nestjs/common";
import { AppException } from "./appExcepition";


export class InvalidAccessTokenException extends AppException {
  constructor () {
    super ({
      message: "Token de acesso inválido ou expirado",
      status: HttpStatus.UNAUTHORIZED,
    })
  }
}