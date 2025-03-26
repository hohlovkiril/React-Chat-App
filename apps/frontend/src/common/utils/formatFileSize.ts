export function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`; // Менее 1 КБ
  const kb = size / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`; // Менее 1 МБ
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`; // Менее 1 ГБ
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`; // Больше 1 ГБ
}