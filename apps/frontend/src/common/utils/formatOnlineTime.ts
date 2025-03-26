export function formatOnlineTime(date: Date) {
  const now = new Date();
  const inputDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000); // Difference in seconds
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 15) {
    return `online`; // Less than 15 minutes, show "online"
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`; // Less than an hour, show minutes
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`; // Less than a day, show hours
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`; // Less than a week, show days
  } else {
    // If the date is older than a week, display the full date (xx.xx.xxxx)
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();
    return `${day}.${month}.${year}`;
  }
}