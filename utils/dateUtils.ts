export function formatDate(ts?: number) {
  if (!ts) return 'לא ידוע';
  const d = new Date(ts);
  return d.toLocaleDateString('he-IL', { year: '2-digit', month: '2-digit', day: '2-digit' }) +
    ' ' + d.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
} 