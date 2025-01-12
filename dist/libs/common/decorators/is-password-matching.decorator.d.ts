import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
export declare class IsPasswordMatchingConstrait implements ValidatorConstraintInterface {
    validate(passwordRepeat: string, args: ValidationArguments): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
