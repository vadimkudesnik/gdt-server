import { RegisterDTO } from '@/auth/dto/register.dto'
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({
	name: 'IsPasswordMatching',
	async: false
})
export class IsPasswordMatchingConstrait
	implements ValidatorConstraintInterface
{
	public validate(passwordRepeat: string, args: ValidationArguments) {
		const obj = args.object as RegisterDTO
		return obj.password == passwordRepeat
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public defaultMessage(validationArguments?: ValidationArguments): string {
		return 'Пароли не совпадают'
	}
}
