export const formatDisplayDate = (date: Date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`.replace(
    /\b(\d)\b/g,
    '0$1'
  );
};
