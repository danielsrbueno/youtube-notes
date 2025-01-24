import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory"
import { makeNote } from "../../factories/noteFactory"
import { GetManyNotesUseCase } from "./getManyuseCase"
import { makeUser } from "src/modules/user/factories/userFactory"
import { Note } from "../../entities/note"

let noteRepositoryInMemory: NoteRepositoryInMemory
let getManyNotesUseCase: GetManyNotesUseCase

describe("Get Many Notes", () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory()
    getManyNotesUseCase = new GetManyNotesUseCase(noteRepositoryInMemory)
  })

  it("Should be able to get many notes", async () => {
    const user = makeUser({})
    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }))

    noteRepositoryInMemory.notes = notes

    const result = await getManyNotesUseCase.execute({
      userId: user.id
    })

    expect(result).toEqual(notes)
  })

  it("Should be able to get only user notes", async () => {
    const user1 = makeUser({})
    const user2 = makeUser({})

    const notes = [...new Array(10)].map((_, index) => makeNote({ userId: index < 5 ? user1.id : user2.id }))

    noteRepositoryInMemory.notes = notes

    const result = await getManyNotesUseCase.execute({
      userId: user2.id
    })

    expect(result).toHaveLength(5)
  })

  it("Should be able to control notes per page", async () => {
    const user = makeUser({})

    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }))

    noteRepositoryInMemory.notes = notes

    const result =  await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: "8"
    })

    expect(result).toHaveLength(8)
  })

  it("Should be able to control notes page", async () => {
    const user = makeUser({})

    const notes = [...new Array(10)].map((_, i) => makeNote({ userId: user.id, title: i < 5 ? "page 1" : "page 2" }))

    noteRepositoryInMemory.notes = notes

    let result: Note[]

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: "5",
      page: "2"
    })

    expect(result[0].title).toEqual('page 2')

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: "5",
      page: "1"
    })

    expect(result[0].title).toEqual('page 1')
  })
})