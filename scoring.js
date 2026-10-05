export const clamp = (n, min = 0, max = 100) => Math.min(max, Math.max(min, n));
export function getBand(score) {
  if (score >= 85) return { label: 'Exceptional', tone: 'teal' };
  if (score >= 65) return { label: 'Strong', tone: 'indigo' };
  if (score >= 40) return { label: 'Average', tone: 'amber' };
  return { label: 'Developing', tone: 'slate' };
}
