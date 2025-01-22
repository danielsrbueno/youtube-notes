import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common"
import { AuthRequestModel } from "./models/authRequestModel"
import { SignInUseCase } from "src/modules/auth/useCases/signInUseCase/signInUseCase"
import { LocalAuthGuard } from "./guards/localAuth.guard"
import { jwtAuthGuard } from "./guards/jwtAuth.guard"
import { Public } from "./decorators/isPublic"
import { AuthenticatedRequestModel } from "./models/authenticatedRequestModel"

@Controller()
export class AuthController{
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('singIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({ user: request.user })
    return { access_token }
  }

  @Get('test')
  @UseGuards(jwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user
  }
}