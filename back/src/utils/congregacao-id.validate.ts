import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class CongregacaoIdValidateConstraint implements ValidatorConstraintInterface {
  validate(id: string) {
    if (!id) return true;
    return /^[1-9]{3}-[1-9]{3}-[1-9]{3}$/.test(id);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} não tem um id válido`;
  }
}

export function CongregacaoIdValidate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CongregacaoIdValidateConstraint,
    });
  };
}
