import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmationDto {
	@IsString({ message: 'Подтверждение дожно быть трокой' })
	@IsNotEmpty({ message: 'Подтверждение не должно быть пустм' })
	token: string
}
