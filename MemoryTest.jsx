import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card.jsx';
import { randInt } from '../../utils/stats.js';

const MAX = 12;
export default function MemoryTest({ onComplete }) {
  const [seq, setSeq] = useState(() => Array.from({ length: 3 }, () => randInt(0, 8)));
  const [phase, setPhase] = useState('show');
  const [lit, setLit] = useState(null);
  const [pos, setPos] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (phase !== 'show') return undefined;
    const ids = [];
    seq.forEach((t, k) => {
      ids.push(setTimeout(() => setLit(t), 700 + k * 800));
      ids.push(setTimeout(() => setLit(null), 700 + k * 800 + 500));
    });
    ids.push(setTimeout(() => setPhase('input'), 700 + seq.length * 800));
    return () => ids.forEach(clearTimeout);
  }, [phase, seq]);

  const press = (t) => {
    if (phase !== 'input') return;
    if (t !== seq[pos]) return onComplete({ best });
    if (pos + 1 < seq.length) return setPos(pos + 1);
    if (seq.length >= MAX) return onComplete({ best: seq.length });
    setBest(seq.length); setSeq([...seq, randInt(0, 8)]); setPos(0); setPhase('show');
  };

  return (
    <Card className="arena">
      <p aria-live="polite">{phase === 'show' ? `Watch carefully. Sequence of ${seq.length}.` : `Your turn: tile ${pos + 1} of ${seq.length}`}</p>
      <div className="tile-grid">
        {Array.from({ length: 9 }, (_, i) => (
          <button key={i} type="button" className={`tile ${lit === i ? 'is-lit' : ''}`} disabled={phase !== 'input'} onClick={() => press(i)} aria-label={`Tile ${i + 1}`} />
        ))}
      </div>
    </Card>
  );
}
