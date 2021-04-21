import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getManager } from 'typeorm';

export type TableData = {
  table: string;
  column?: string;
};

@ValidatorConstraint({ async: true })
class IfExistsValidateConstraint implements ValidatorConstraintInterface {
  private v = '';

  async validate(value: string, args?: ValidationArguments) {
    const { congregacaoId } = args.object as { congregacaoId: string };
    const params: TableData = args.constraints[0];
    let sql = `SELECT * FROM ${params.table} 
              WHERE "${params.column}" = '${value}'`;
    if (params.table !== 'congregacao')
      sql += ` and "congregacaoId" = '${congregacaoId}'`;
    try {
      const result: unknown[] = await getManager().query(sql);
      this.v = '';

      return !!result.length;
    } catch (error) {
      this.v = `Houve um erro na montagem do SQL. Coluna: '${params.column}'. Tabela: '${params.table}'`;
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const params: TableData = args.constraints[0];
    return (
      this.v ||
      `Não foi possível encontrar '${args.value}' na coluna '${params.column}' da tabela '${params.table}'`
    );
  }
}

export function IfExistsValidate(
  tableData: TableData,
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [
        { table: tableData.table, column: tableData.column || 'id' },
      ],
      validator: IfExistsValidateConstraint,
    });
  };
}
