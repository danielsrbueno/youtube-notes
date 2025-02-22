import { Module } from '@nestjs/common'
import { UserModule } from './infra/http/modules/user/user.module'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './infra/http/modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { jwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard'
import { NoteModule } from './infra/http/modules/note/note.module'

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, NoteModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: jwtAuthGuard,
    },
  ],
})
export class AppModule {}
