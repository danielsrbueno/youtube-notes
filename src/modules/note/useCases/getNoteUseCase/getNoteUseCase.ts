import { Injectable, NotFoundException } from "@nestjs/common"
import { NoteRepository } from "../../repositories/noteRepository"
import { NoteWithoutPermissionException } from "../../exceptions/NoteWithoutPermissionException"

interface GetNoteRequest {
  noteId: string
  userId: string
}

@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId)

    if (!note) throw new NotFoundException()
    if (note.userId !== userId) throw new NoteWithoutPermissionException({actionName: "ver"})
    
    return note
  }
}