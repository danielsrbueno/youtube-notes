import { ExecutionContext, Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { IS_PUBLIC_KEY } from "../decorators/isPublic"
import { Reflector } from "@nestjs/core"
import { InvalidAccessTokenException } from "src/excepitions/InvalidAccessTokenException"

@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
  
  handleRequest(err, user) {
    if (err || !user) 
      throw err || new InvalidAccessTokenException()
    
    return user
  }
}