// All localStorage access goes through here. Versioned key + error-safe.
const KEY = 'psychlab:v1:results';
const MAX = 100;

export function getResults() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
export function saveResult(result) {
  try {
    const next = [result, ...getResults()].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch { return getResults(); }
}
export function clearResults() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}
