import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase";
import { EditNoteUseCase } from "src/modules/note/useCases/editNoteUseCase/editNoteUseCase";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase";
import { GetManyNotesUseCase } from "src/modules/note/useCases/getManyUseCase/getManyuseCase";
import { NoteController } from "./note.controller";

@Module({
  controllers: [NoteController],
  imports: [DatabaseModule],
  providers: [
    CreateNoteUseCase,
    EditNoteUseCase,
    DeleteNoteUseCase,
    GetNoteUseCase,
    GetManyNotesUseCase 
  ]
})

export class NoteModule {}