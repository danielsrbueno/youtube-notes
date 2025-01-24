import { NoteRepository } from "../../repositories/noteRepository"

interface GetManyNotesRequest {
  userId: string
  page?: string
  perPage?: string
}

export class GetManyNotesUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ userId, page, perPage }: GetManyNotesRequest) {
    const DEFAUT_PAGE = 1
    const DEFAUT_PER_PAGE = 20

    const currentPage = Number(page) || DEFAUT_PAGE
    const currentPerPage = Number(perPage) || DEFAUT_PER_PAGE

    const notes = await this.noteRepository.findManyByUserId(
      userId,
      currentPage,
      currentPerPage
    )

    return notes
  }
}