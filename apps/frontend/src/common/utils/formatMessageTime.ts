export function formatMessageTime(date: Date) {
  const inputDate = new Date(date);
  const hours = inputDate.getHours().toString().padStart(2, '0'); // Adds leading zero if necessary
  const minutes = inputDate.getMinutes().toString().padStart(2, '0'); // Adds leading zero if necessary
  return `${hours}:${minutes}`;
}