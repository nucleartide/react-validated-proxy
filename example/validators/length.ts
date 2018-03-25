interface Options {
  min: number
}

const validateLength = ({ min }: Options) => (key: string, newValue: string, oldValue: string) => ({
  message: `${newValue} is too short`,
  validation: newValue.length >= min,
});

export default validateLength;
