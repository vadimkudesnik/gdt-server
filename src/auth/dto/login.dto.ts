import {
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class LoginDTO {
	@IsString({ message: 'Логин должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Логин обязателен для ввода.' })
	login: string

	@IsString({ message: 'Пароль должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Пароль обязателен для ввода.' })
	@MinLength(8, { message: 'Пароль должен содержать минимум 8 символов.' })
	@MaxLength(40, { message: 'Паоль должен содержать не более 40 символов.' })
	password: string

	@IsOptional()
	@IsString({
		message:
			'Код двухфакторной аутентификации должен быть строковыми данными.'
	})
	code: string

	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaToken: string

	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaAnswer: string
}
