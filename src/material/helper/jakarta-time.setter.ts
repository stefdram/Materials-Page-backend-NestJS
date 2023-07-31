export const setCurrentJakartaTime = () => {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset();
  currentDate.setMinutes(currentDate.getMinutes() - timezoneOffset);
  const date_added = currentDate.toISOString();
  return date_added;
};
