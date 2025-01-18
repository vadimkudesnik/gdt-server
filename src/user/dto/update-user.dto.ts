import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDTO {
	@IsString({ message: 'Логин должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Логин обязателен для ввода.' })
	login: string

	@IsString({ message: 'Email должен быть строковыми данными.' })
	@IsEmail({}, { message: 'Некорректный формат email' })
	@IsNotEmpty({ message: 'Email обязателен для ввода.' })
	email: string

	@IsString({ message: 'Имя должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Имя обязателен для ввода.' })
	name: string

	@IsString({ message: 'Фамилия должен быть строковыми данными.' })
	@IsNotEmpty({ message: 'Фамилия обязателен для ввода.' })
	surname: string

	@IsString({ message: 'Отчество должен быть строковыми данными.' })
	secondname: string

	@IsBoolean({ message: 'Должно быть булевым значением' })
	isTwoFactorEnabled: boolean
}
