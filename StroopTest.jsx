import { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { pick } from '../../utils/stats.js';

const COLORS = [{ name: 'Red', hex: '#c62828' }, { name: 'Blue', hex: '#1565c0' }, { name: 'Green', hex: '#2e7d32' }, { name: 'Purple', hex: '#6a1b9a' }];
const TOTAL = 20;
const make = () => Array.from({ length: TOTAL }, () => {
  const word = pick(COLORS);
  const ink = Math.random() < 0.5 ? word : pick(COLORS.filter((c) => c !== word));
  return { word, ink };
});

export default function StroopTest({ onComplete }) {
  const [trials] = useState(make);
  const [i, setI] = useState(0);
  const [log, setLog] = useState([]);
  const t0 = useRef(0);
  useEffect(() => { t0.current = performance.now(); }, [i]);

  const answer = (name) => {
    const t = trials[i];
    const entry = { ok: name === t.ink.name, rt: performance.now() - t0.current, congruent: t.word === t.ink };
    const all = [...log, entry];
    if (i + 1 >= TOTAL) return onComplete({ trials: all });
    setLog(all); setI(i + 1);
  };

  const t = trials[i];
  return (
    <Card className="arena">
      <ProgressBar value={i} max={TOTAL} label={`Trial ${i + 1} of ${TOTAL}`} tone="indigo" />
      <p>Choose the <strong>ink color</strong>, not the word.</p>
      <div className="stroop-word" style={{ color: t.ink.hex }}>{t.word.name}</div>
      <div className="options">
        {COLORS.map((c) => <button key={c.name} type="button" className="option" onClick={() => answer(c.name)}>{c.name}</button>)}
      </div>
    </Card>
  );
}
