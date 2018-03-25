import { IValidationMeta } from 'validated-proxy/dist/types/validation-result';

interface LessThan {
  op: '<',
  value: number
}

interface GreaterThanOrEqual {
  op: '>=',
  value: number
}

type Options =
  | LessThan
  | GreaterThanOrEqual
  ;

const welp = (x: never): never => { throw new Error('Unexpected object.') };

const message = (o: Options, key: string, newValue: number): string => {
  switch (o.op) {
  case '<':
    return `${key} is not less than ${o.value}.`;
  case '>=':
    return `${key} is not greater than or equal to ${o.value}.`;
  default:
    return welp(o);
  }
};

const validation = (o: Options, key: string, newValue: number): boolean => {
  switch (o.op) {
  case '<':
    return newValue < o.value;
  case '>=':
    return newValue >= o.value;
  default:
    return welp(o);
  }
};

// Validate that a number satisfies comparison rules.
const validateNumber =
  (o: Options) =>
  (key: string, newValue: number, oldValue: number): IValidationMeta => ({
    message: message(o, key, newValue),
    validation: validation(o, key, newValue),
  });

export default validateNumber;
