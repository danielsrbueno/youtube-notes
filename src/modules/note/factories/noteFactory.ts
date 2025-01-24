import { Note } from "../entities/note"


type Override = Partial<Note>

export const makeNote = ({ id, ...override}: Override) => {
  return new Note({
    title: "Teste",
    description: "Testando",
    userId: "2",
    ...override
  }, id)
}