import { useState, useEffect } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { shuffle } from '../../utils/stats.js';

const POOL = ['apple', 'river', 'candle', 'window', 'garden', 'pencil', 'mirror', 'forest', 'bridge', 'ladder', 'button', 'pillow', 'anchor', 'basket', 'jacket', 'marble', 'ribbon', 'saddle', 'tunnel', 'violin'];
const STUDY_SECONDS = 8;

export default function ShortTermTest({ onComplete }) {
  const [words] = useState(() => shuffle(POOL).slice(0, 6));
  const [options] = useState(() => shuffle([...words, ...shuffle(POOL.filter((w) => !words.includes(w))).slice(0, 6)]));
  const [phase, setPhase] = useState('study');
  const [secs, setSecs] = useState(STUDY_SECONDS);
  const [picked, setPicked] = useState([]);

  useEffect(() => {
    if (phase !== 'study') return undefined;
    if (secs === 0) { setPhase('recall'); return undefined; }
    const id = setTimeout(() => setSecs(secs - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secs]);

  const toggle = (w) => setPicked((p) => (p.includes(w) ? p.filter((x) => x !== w) : [...p, w]));
  const submit = () => {
    if (!picked.length) return;
    const correct = picked.filter((w) => words.includes(w)).length;
    onComplete({ correct, wrong: picked.length - correct, total: words.length });
  };

  return (
    <Card className="arena">
      {phase === 'study' ? (
        <>
          <p aria-live="polite">Memorize these words. Hiding in {secs}s.</p>
          <ul className="word-list">{words.map((w) => <li key={w}>{w}</li>)}</ul>
        </>
      ) : (
        <>
          <p>Select every word you remember ({picked.length} selected).</p>
          <div className="options" role="group" aria-label="Choose the words you saw">
            {options.map((w) => (
              <button key={w} type="button" aria-pressed={picked.includes(w)} className={`option ${picked.includes(w) ? 'is-selected' : ''}`} onClick={() => toggle(w)}>{w}</button>
            ))}
          </div>
          <Button onClick={submit} disabled={!picked.length}>Check answers</Button>
        </>
      )}
    </Card>
  );
}
