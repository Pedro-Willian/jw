import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
class UuidValidateConstraint implements ValidatorConstraintInterface {
  validate(uuid: string) {
    if (!uuid) return true;
    return /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/.test(
      uuid,
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} não tem um id válido`;
  }
}

export function UuidValidate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UuidValidateConstraint,
    });
  };
}
