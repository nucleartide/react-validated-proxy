import isPresent from '../validators/presence';
import hasLength from '../validators/length';
import isUnique from '../validators/uniqueness';
import isEmail from '../validators/email';

export default {
  firstName: [
    isPresent(),
    hasLength({ min: 2 }),
  ],
  lastName: [
    isPresent(),
    hasLength({ min: 2 }),
  ],
  email: [
    isUnique(),
    isEmail(),
  ],
  job: [
    isPresent(),
  ],
};
