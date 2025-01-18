import { IsEmail, IsNotEmpty } from 'class-validator'

export class ResetPasswordDto {
	@IsEmail({}, { message: 'Введите корректный адрес электронной почты' })
	@IsNotEmpty({ message: 'Поле не может быть пустным' })
	email: string
}
