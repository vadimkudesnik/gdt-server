import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ResetPasswordDto {
	@IsEmail({}, { message: 'Введите корректный адрес электронной почты' })
	@IsNotEmpty({ message: 'Поле не может быть пустным' })
	email: string
	
	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaToken: string

	@IsOptional()
	@IsString({ message: 'Captcha должен быть строковыми данными.' })
	captchaAnswer: string
}
