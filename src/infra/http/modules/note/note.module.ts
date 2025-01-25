import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase";
import { EditNoteUseCase } from "src/modules/note/useCases/editNoteUseCase/editNoteUseCase";
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase";
import { NoteViewModel } from "./viewModel/noteViewModel";
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase";
import { GetManyNotesUseCase } from "src/modules/note/useCases/getManyUseCase/getManyuseCase";

@Module({
  controllers: [NoteViewModel],
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