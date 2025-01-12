import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class LoginEmailDTO {
	@IsString({ message: 'Email должен быть строковыми данными.' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязателен для ввода.' })
	email: string

	@IsString({ message: 'Пароль должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Пароль обязателен для ввода.' })
	@MinLength(8, { message: 'Пароль должен содержать минимум 8 символов.' })
	@MaxLength(40, { message: 'Паоль должен содержать не более 40 символов.' })
	password: string
}
