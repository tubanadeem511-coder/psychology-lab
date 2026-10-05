import { useState, useEffect, useRef } from 'react';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { clamp } from '../utils/scoring.js';
import { rand, mean } from '../utils/random.js';

const COLORS = [
  { name: 'Red', css: '#c62828' }, { name: 'Blue', css: '#1565c0' },
  { name: 'Green', css: '#2e7d32' }, { name: 'Purple', css: '#7b1fa2' },
];
const N = 20;
export const score = ({ trials }) => {
  const acc = trials.filter((t) => t.ok).length / trials.length;
  const avg = (c) => mean(trials.filter((t) => t.congruent === c && t.ok).map((t) => t.rt));
  const interference = Math.round(avg(false) - avg(true)) || 0;
  return {
    score: Math.round(clamp(acc * 100 - Math.max(0, mean(trials.map((t) => t.rt)) - 800) / 20)),
    metrics: { Accuracy: `${Math.round(acc * 100)}%`, 'Interference': `${interference} ms` },
    insight: 'Interference is how much slower you were when the word and ink disagreed. Reading is automatic, so your brain must suppress it.',
  };
};
const makeTrials = () => Array.from({ length: N }, (_, i) => {
  const ink = rand(4); const congruent = i % 2 === 0;
  const word = congruent ? ink : (ink + 1 + rand(3)) % 4;
  return { ink, word, congruent };
});

export default function StroopTest({ onComplete }) {
  const [trials] = useState(makeTrials);
  const [i, setI] = useState(0);
  const results = useRef([]);
  const t0 = useRef(0);
  useEffect(() => { t0.current = performance.now(); }, [i]);

  const answer = (c) => {
    const t = trials[i];
    results.current.push({ ok: c === t.ink, rt: performance.now() - t0.current, congruent: t.congruent });
    if (i + 1 >= N) onComplete({ trials: results.current }); else setI(i + 1);
  };
  const t = trials[i];
  return (
    <div>
      <ProgressBar value={i} max={N} label="Progress" />
      <p className="hud" style={{ marginTop: '.75rem' }}>Choose the INK color, not the word.</p>
      <div className="stroop-word" style={{ color: COLORS[t.ink].css }}>{COLORS[t.word].name}</div>
      <div className="opts">
        {COLORS.map((c, k) => <button key={c.name} className="opt" onClick={() => answer(k)}>{c.name}</button>)}
      </div>
    </div>
  );
}
