const Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validate that an email has the correct format.
const validateEmail =
  () =>
  (key: string, newValue: string, oldValue: string) => ({
    message: 'Invalid email.',
    validation: Email.test(newValue),
  });

export default validateEmail;
