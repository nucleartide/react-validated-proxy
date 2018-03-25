const ReservedEmails = ['foo@bar.com', 'admin@example.com'];

// Validate that an email is not reserved.
const validateUniqueness =
  () =>
  (key: string, newValue: string, oldValue: string) => ({
    message: `${newValue} is taken.`,
    validation: ReservedEmails.indexOf(newValue) > -1,
  });

export default validateUniqueness;
