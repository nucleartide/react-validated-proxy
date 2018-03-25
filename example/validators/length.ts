interface Options {
  min: number
}

// Validate that a string has minimum length.
const validateLength =
  ({ min }: Options) =>
  (key: string, newValue: string, oldValue: string) => ({
    message: `${newValue} is too short.`,
    validation: newValue.length >= min,
  });

export default validateLength;
