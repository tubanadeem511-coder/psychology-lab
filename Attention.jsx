import { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { clamp } from '../utils/scoring.js';
import { pick } from '../utils/random.js';

const TARGET = '▲';
export const score = ({ hits, misses, falseAlarms, targets }) => ({
  score: Math.round(clamp((hits / Math.max(1, targets)) * 100 - falseAlarms * 8)),
  metrics: { Hits: `${hits}/${targets}`, Misses: misses, 'False alarms': falseAlarms },
  insight: 'Missing targets shows attention drifting. False alarms show impulsive responding. Good performance needs both low.',
});

export default function AttentionTest({ onComplete }) {
  const [items] = useState(() => Array.from({ length: 30 }, () => (Math.random() < 0.25 ? TARGET : pick(['△', '■', '●', '◆']))));
  const [i, setI] = useState(0);
  const tally = useRef({ hits: 0, misses: 0, falseAlarms: 0 });
  const pressed = useRef(false);
  const respondRef = useRef(null);

  useEffect(() => {
    pressed.current = false;
    const id = setTimeout(() => {
      if (items[i] === TARGET && !pressed.current) tally.current.misses += 1;
      if (i + 1 >= items.length) onComplete({ ...tally.current, targets: items.filter((s) => s === TARGET).length });
      else setI(i + 1);
    }, 900);
    return () => { clearTimeout(id); };
  }, [i, items, onComplete]);

  const respond = () => {
    if (pressed.current) return;
    pressed.current = true;
    if (items[i] === TARGET) tally.current.hits += 1; else tally.current.falseAlarms += 1;
  };
  respondRef.current = respond;
  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); respondRef.current(); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div>
      <p>Respond only to the solid triangle ▲. Ignore everything else.</p>
      <div className="big" aria-live="off">{items[i]}</div>
      <ProgressBar value={i + 1} max={items.length} label="Progress" />
      <div className="nav-row"><Button size="lg" onClick={respond} style={{ width: '100%' }}>Target! (Space)</Button></div>
    </div>
  );
}
