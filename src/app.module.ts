import { Module } from '@nestjs/common'
import { UserModule } from './infra/http/modules/user/user.module'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './infra/http/modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { jwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard'

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: jwtAuthGuard,
    },
  ],
})
export class AppModule {}
