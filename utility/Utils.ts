export function getTwoDigitTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getDiffInSeconds(end: number): number {
  if (!end) {
    return 0;
  }

  const now = Date.now();
  const diffMs = end - now;
  return Math.max(0, Math.floor(diffMs / 1000));
}
