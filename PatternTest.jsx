import { useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';
import { randInt, shuffle } from '../../utils/stats.js';

const TOTAL = 8;
function makeQuestion() {
  const kind = randInt(0, 2), a = randInt(1, 9);
  const all = [a];
  if (kind === 0) { const d = randInt(2, 7); for (let i = 0; i < 5; i++) all.push(all[i] + d); }
  else if (kind === 1) { const r = randInt(2, 3); for (let i = 0; i < 5; i++) all.push(all[i] * r); }
  else { const x = randInt(2, 6), y = randInt(1, 4); for (let i = 0; i < 5; i++) all.push(all[i] + (i % 2 ? -y : x)); }
  const answer = all[5], opts = new Set([answer]);
  while (opts.size < 4) opts.add(answer + randInt(-6, 6));
  return { seq: all.slice(0, 5), answer, options: shuffle([...opts]) };
}

export default function PatternTest({ onComplete }) {
  const [qs] = useState(() => Array.from({ length: TOTAL }, makeQuestion));
  const [i, setI] = useState(0);
  const [sel, setSel] = useState(null);
  const [correct, setCorrect] = useState(0);
  const q = qs[i];

  const next = () => {
    if (sel === null) return;
    const c = correct + (q.options[sel] === q.answer ? 1 : 0);
    if (i + 1 >= TOTAL) return onComplete({ correct: c, total: TOTAL });
    setCorrect(c); setI(i + 1); setSel(null);
  };

  return (
    <Card className="arena">
      <ProgressBar value={i} max={TOTAL} label={`Question ${i + 1} of ${TOTAL}`} tone="indigo" />
      <p className="sequence">{q.seq.join(', ')}, ?</p>
      <div className="options" role="group" aria-label="Choose the next number">
        {q.options.map((o, k) => (
          <button key={k} type="button" aria-pressed={sel === k} className={`option ${sel === k ? 'is-selected' : ''}`} onClick={() => setSel(k)}>{o}</button>
        ))}
      </div>
      <Button onClick={next} disabled={sel === null}>{i + 1 === TOTAL ? 'Finish' : 'Next'}</Button>
    </Card>
  );
}
