import { IsPasswordMatchingConstrait } from '@/libs/common/decorators/is-password-matching.decorator'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	Validate
} from 'class-validator'

export class RegisterDTO {
	@IsString({ message: 'Логин должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Логин обязателен для ввода.' })
	login: string

	@IsString({ message: 'Email должен быть строковыми данными.' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязателен для ввода.' })
	email: string

	@IsString({ message: 'Пароль должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Пароль обязателен для ввода.' })
	@MinLength(8, { message: 'Пароль должен содержать минимум 8 символов.' })
	@MaxLength(40, { message: 'Паоль должен содержать не более 40 символов.' })
	password: string

	@IsString({ message: 'Имя должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Имя обязателен для ввода.' })
	name: string

	@IsString({ message: 'Фамилия должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Фамилия обязателен для ввода.' })
	surname: string

	@IsString({ message: 'Отчество должен быть строковыми данными.' })
	secondname: string

	@IsString({
		message: 'Пароль подтверждения должен быть строковыми данными.'
	})
	@IsNotEmpty({ message: 'Пароль подтверждения обязателен для ввода.' })
	@MinLength(8, { message: 'Пароль должен содержать минимум 8 символов.' })
	@MaxLength(40, { message: 'Паоль должен содержать не более 40 символов.' })
	@Validate(IsPasswordMatchingConstrait, { message: 'Пароли не совпадают' })
	passwordRepeat: string

	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaToken: string

	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaAnswer: string
}
