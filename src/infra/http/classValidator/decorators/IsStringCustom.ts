import { isString, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { ExceptionsMessage } from '../data/ExceptionsMessage'

export function IsStringCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsStringCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          return isString(value)
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionsMessage.IsString(validationArguments.property)
        }
      }
    })
  }
}