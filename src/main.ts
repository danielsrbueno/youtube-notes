import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationError, ValidationPipe } from '@nestjs/common'
import { IncorrectValuesException } from './excepitions/IncorrectValuesException'
import { mapperValidationErrorToAppException } from './utils/mappers'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors: ValidationError[]) {
      throw new IncorrectValuesException({
        fields: mapperValidationErrorToAppException(errors)
      })
    },
  }))
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()