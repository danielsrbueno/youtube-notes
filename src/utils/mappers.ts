import { ValidationError } from "class-validator"

export const mapperValidationErrorToAppException = (errors: ValidationError[]) => {
  const errorList = {} as { [key:string]: string }

  errors.forEach(error => {
    errorList[error.property] = Object.values(error.constraints ?? {})[0]
  })

  return errorList
}