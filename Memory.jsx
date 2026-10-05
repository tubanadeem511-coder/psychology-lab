import { useState, useEffect } from 'react';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { clamp } from '../utils/scoring.js';
import { rand } from '../utils/random.js';

const MAX = 12;
export const score = ({ span }) => ({
  score: Math.round(clamp((span / 10) * 100)),
  metrics: { 'Longest span': span, 'Max possible': MAX },
  insight: `You repeated ${span} tiles in order. Most adults manage about 5 to 9 items, the "seven plus or minus two" limit of working memory.`,
});

export default function MemoryTest({ onComplete }) {
  const [seq, setSeq] = useState(() => [rand(9), rand(9), rand(9)]);
  const [phase, setPhase] = useState('show');
  const [lit, setLit] = useState(-1);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (phase !== 'show') return undefined;
    const ids = [];
    seq.forEach((t, i) => {
      ids.push(setTimeout(() => setLit(t), 600 + i * 800));
      ids.push(setTimeout(() => setLit(-1), 600 + i * 800 + 500));
    });
    ids.push(setTimeout(() => { setPos(0); setPhase('input'); }, 600 + seq.length * 800));
    return () => { ids.forEach(clearTimeout); };
  }, [phase, seq]);

  const tap = (i) => {
    if (phase !== 'input') return;
    if (i !== seq[pos]) { onComplete({ span: seq.length - 1 }); return; }
    if (pos + 1 < seq.length) { setPos(pos + 1); return; }
    if (seq.length >= MAX) { onComplete({ span: seq.length }); return; }
    setSeq([...seq, rand(9)]); setPhase('show');
  };

  return (
    <div>
      <div className="hud"><span>Sequence length: {seq.length}</span><span>{phase === 'show' ? 'Watch carefully' : 'Your turn'}</span></div>
      <div className="tiles">
        {Array.from({ length: 9 }, (_, i) => (
          <button key={i} className={`tile ${lit === i ? 'is-lit' : ''}`} disabled={phase !== 'input'} onClick={() => tap(i)} aria-label={`Tile ${i + 1}`} />
        ))}
      </div>
      <ProgressBar value={phase === 'input' ? pos : 0} max={seq.length} label="Repeated so far" />
    </div>
  );
}
