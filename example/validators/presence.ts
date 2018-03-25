const validatePresence = () => <T extends {}>(key: string, newValue: T, oldValue: T) => ({
  message: `${key} is missing`,
  validation: Boolean(newValue),
});

export default validatePresence;
