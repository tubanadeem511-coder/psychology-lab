export const rand = (n) => Math.floor(Math.random() * n);
export const pick = (a) => a[rand(a.length)];
export function shuffle(a) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = rand(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; }
export const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
