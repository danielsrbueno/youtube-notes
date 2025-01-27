import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "src/modules/user/repositories/UserRepository";
import { PrismaUserRepository } from "./prisma/repositories/PrismaUserRepository";
import { NoteRepository } from "src/modules/note/repositories/noteRepository";


@Module({
  providers: [PrismaService, {
    provide: UserRepository,
    useClass: PrismaUserRepository
  },
  {
    provide: NoteRepository,
    useClass: PrismaUserRepository
  }],
  exports: [UserRepository, NoteRepository]
})

export class DatabaseModule {

}