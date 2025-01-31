export const ExceptionsMessage = {
  IsNotEmpty: (prop: string) => `O campo ${prop} é obrigatório`,
  IsEmail: "Digite seu email",
  IsString: (prop: string) => `O campo ${prop} deve ser um texto`,
  MinLength: (prop: string, min: number) => `O campo ${prop} deve ter no mínimo ${min} caracteres`,
}