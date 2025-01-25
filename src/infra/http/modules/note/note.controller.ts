import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common"
import { CreateNoteUseCase } from "src/modules/note/useCases/createNoteUseCase/createNoteUseCase"
import { AuthenticatedRequestModel } from "../auth/models/authenticatedRequestModel"
import { CreateNoteBody } from "./dtos/createNoteBody"
import { NoteViewModel } from "./viewModel/noteViewModel"
import { EditNoteUseCase } from "src/modules/note/useCases/editNoteUseCase/editNoteUseCase"
import { EditNoteBody } from "./dtos/editNoteBody"
import { DeleteNoteUseCase } from "src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase"
import { GetNoteUseCase } from "src/modules/note/useCases/getNoteUseCase/getNoteUseCase"
import { GetManyNotesUseCase } from "src/modules/note/useCases/getManyUseCase/getManyuseCase"

@Controller("notes")
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNotesUseCase: GetManyNotesUseCase
  ) {}

  @Post()
  async createNote(@Request() request: AuthenticatedRequestModel, @Body() body: CreateNoteBody) {
    const { title, description } = body

    const note = await this.createNoteUseCase.execute({
      title,
      description: description ?? "",
      userId: request.user.id
    })

    return NoteViewModel.toHttp(note)
  }

  @Put(":id")
  async editNote(@Request() request: AuthenticatedRequestModel, @Param("id") noteId: string, @Body() body: EditNoteBody) {
    const { title, description } = body

    await this.editNoteUseCase.execute({
      noteId,
      title,
      description: description ?? "",
      userId: request.user.id,
    })
  }

  @Delete(":id")
  async deleteNote(@Request() request: AuthenticatedRequestModel, @Param("id") noteId: string){
    const userId = request.user.id
    
    await this.deleteNoteUseCase.execute({
      noteId,
      userId
    })
  }

  @Get(":id")
  async getNote(@Request() request: AuthenticatedRequestModel, @Param("id") noteId: string) {
    const userId = request.user.id

    const note = await this.getNoteUseCase.execute({
      noteId,
      userId
    })
    
    return NoteViewModel.toHttp(note)
  }

  @Get()
  async getManyNotes(@Request() request: AuthenticatedRequestModel, @Query("page") page: string, @Query("perPage") perPage: string) {
    const userId = request.user.id

    const notes = await this.getManyNotesUseCase.execute({
      userId,
      page,
      perPage
    })

    return notes.map(note => NoteViewModel.toHttp(note))
  }
}