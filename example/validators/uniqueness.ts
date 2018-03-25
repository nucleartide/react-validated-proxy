const ReservedEmails = ['foo@bar.com', 'admin@example.com'];

const validateUniqueness = () => (key: string, newValue: string, oldValue: string) => ({
  message: `${newValue} is taken`,
  validation: ReservedEmails.indexOf(newValue) > -1,
});

export default validateUniqueness;
