import { isNotEmpty, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
import { ExceptionsMessage } from '../data/ExceptionsMessage'

export function IsNotEmptyCustom(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmptyCustom',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isNotEmpty(value)
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return ExceptionsMessage.IsNotEmpty(validationArguments.property)
        }
      }
    })
  }
}