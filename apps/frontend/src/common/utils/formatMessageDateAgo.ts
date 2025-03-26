export function formatMessageDateAgo(date: Date) {
  const now = new Date();
  const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Convert the input date to a Date object
  const inputDate = new Date(date);

  // Compare the date with today's date
  if (inputDate.toDateString() === now.toDateString()) {
    // If the date is today, show only the time
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    // If the date is older than today, show the day of the week
    const dayOfWeek = inputDate.getDay();
    return dayOfWeekNames[dayOfWeek];
  }
}