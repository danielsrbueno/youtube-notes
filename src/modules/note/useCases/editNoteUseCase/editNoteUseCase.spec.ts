import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory"
import { makeNote } from "../../factories/noteFactory"
import { EditNoteUseCase } from "./editNoteUseCase"
import { makeUser } from "src/modules/user/factories/userFactory"
import { NoteNotFoundException } from "../../exceptions/NoteNotFoundException"
import { NoteWithoutPermissionException } from "../../exceptions/NoteWithoutPermissionException"

let noteRepositoryInMemory: NoteRepositoryInMemory
let editNoteUseCase: EditNoteUseCase

describe("Edit Note", () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory()
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory)
  })

  it("Should be able to edit note", async () => {
    const user = makeUser({})
    const note = makeNote({
      userId: user.id
    })

    noteRepositoryInMemory.notes = [note]

    await editNoteUseCase.execute({
      title: "foi atualizado",
      description: "updated",
      noteId: note.id,
      userId: user.id
    })

    expect(noteRepositoryInMemory.notes[0].title).toEqual("foi atualizado")
  })

  it("Should be able to throw error when not found note", async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: "atualizado",
        description: "tbm foi atualizado",
        noteId: "fake",
        userId: "fake"
      })
    }).rejects.toThrowError(NoteNotFoundException)
  })

  it("Should be able to throw error when note has another user", async () => {
    const note = makeNote({})

    noteRepositoryInMemory.notes = [note]

    expect(async () => {
      await editNoteUseCase.execute({
        title: "atualizado",
        description: "tbm foi atualizado",
        noteId: note.id,
        userId: "fake"
      })
    }).rejects.toThrowError(NoteWithoutPermissionException)
  })
})