export const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
export const randInt = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = (a) => a[randInt(0, a.length - 1)];
export const shuffle = (a) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = randInt(0, i); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};
