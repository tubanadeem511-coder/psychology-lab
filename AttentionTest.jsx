import { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { pick } from '../../utils/stats.js';

const TARGET = 'X';
const make = () => Array.from({ length: 30 }, () => (Math.random() < 0.25 ? TARGET : pick(['K', 'Y', 'N', 'H', 'V', 'Z'])));

export default function AttentionTest({ onComplete }) {
  const [items] = useState(make);
  const [i, setI] = useState(0);
  const idx = useRef(0);
  const responded = useRef(false);
  const counts = useRef({ hits: 0, misses: 0, falseAlarms: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const isTarget = items[idx.current] === TARGET;
      const c = counts.current;
      if (isTarget && responded.current) c.hits++;
      else if (isTarget) c.misses++;
      else if (responded.current) c.falseAlarms++;
      responded.current = false;
      idx.current++;
      if (idx.current >= items.length) { clearInterval(id); onComplete({ ...c }); } else setI(idx.current);
    }, 1000);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className="arena">
      <p>Press Respond only when you see <strong>{TARGET}</strong>.</p>
      <div className="stimulus" key={i} aria-live="polite">{items[i]}</div>
      <Button size="lg" onClick={() => { responded.current = true; }}>Respond</Button>
      <ProgressBar value={i} max={items.length} label="Progress" tone="teal" />
    </Card>
  );
}
