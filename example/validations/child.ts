import User from './user';
import isNumber from '../validators/number';

export default {
  ...User,
  age: isNumber({ op: '<', value: 18 }),
};
