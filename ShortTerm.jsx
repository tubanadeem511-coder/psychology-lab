import { useState, useEffect } from 'react';
import Button from '../components/ui/Button.jsx';
import { clamp } from '../utils/scoring.js';
import { shuffle } from '../utils/random.js';

const POOL = ['apple', 'river', 'candle', 'window', 'planet', 'garden', 'pencil', 'thunder', 'basket', 'mirror', 'saddle', 'violin', 'ladder', 'pepper', 'anchor', 'button', 'carpet', 'engine', 'forest', 'hammer', 'island', 'jacket', 'kettle', 'lemon'];
export const score = ({ hits, wrong, total }) => ({
  score: Math.round(clamp(((hits - wrong * 0.5) / total) * 100)),
  metrics: { Recalled: `${hits}/${total}`, 'Wrong picks': wrong },
  insight: 'Short-term memory holds information for seconds without rehearsal. Grouping words into a story or image helps you keep more.',
});

export default function ShortTermTest({ onComplete }) {
  const [words] = useState(() => { const s = shuffle(POOL); return { shown: s.slice(0, 6), options: shuffle(s.slice(0, 12)) }; });
  const [phase, setPhase] = useState('study');
  const [sel, setSel] = useState([]);
  useEffect(() => {
    if (phase !== 'study') return undefined;
    const id = setTimeout(() => setPhase('recall'), 8000);
    return () => { clearTimeout(id); };
  }, [phase]);

  const toggle = (w) => setSel((s) => (s.includes(w) ? s.filter((x) => x !== w) : [...s, w]));
  const submit = () => {
    if (!sel.length) return;
    const hits = sel.filter((w) => words.shown.includes(w)).length;
    onComplete({ hits, wrong: sel.length - hits, total: words.shown.length });
  };

  if (phase === 'study') return (
    <div><p>Memorize these words. They disappear in 8 seconds.</p>
      <div className="chips">{words.shown.map((w) => <span key={w} className="chip">{w}</span>)}</div>
      <div className="timerbar" /></div>
  );
  return (
    <div><p>Select every word you saw. Selected: {sel.length}</p>
      <div className="opts">{words.options.map((w) => (
        <button key={w} aria-pressed={sel.includes(w)} className={`opt ${sel.includes(w) ? 'is-selected' : ''}`} onClick={() => toggle(w)}>{w}</button>
      ))}</div>
      <div className="nav-row"><span /><Button disabled={!sel.length} onClick={submit}>Submit answers</Button></div></div>
  );
}
