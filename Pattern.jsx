import { useState, useRef } from 'react';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { rand, shuffle } from '../utils/random.js';

const N = 8;
function make() {
  const t = rand(3); let seq; let ans; const s = 1 + rand(8);
  if (t === 0) { const d = 2 + rand(5); seq = [0, 1, 2, 3].map((k) => s + k * d); ans = s + 4 * d; }
  else if (t === 1) { const b = 1 + rand(3); seq = [0, 1, 2, 3].map((k) => b * 2 ** k); ans = b * 16; }
  else { const a = 3 + rand(5); const b = 1 + rand(2); seq = [s, s + a, s + a - b, s + 2 * a - b]; ans = s + 2 * a - 2 * b; }
  const wrong = shuffle([ans + 1, ans - 1, ans + 2, ans - 2, ans + 3, ans + 10]).filter((x) => x !== ans && x > 0).slice(0, 3);
  return { seq, ans, options: shuffle([ans, ...wrong]) };
}
export const score = ({ correct, total, ms }) => ({
  score: Math.round((correct / total) * 100),
  metrics: { Correct: `${correct}/${total}`, 'Time per question': `${(ms / total / 1000).toFixed(1)} s` },
  insight: 'Pattern problems use fluid reasoning: finding the rule (add, double, alternate) rather than recalling facts.',
});

export default function PatternTest({ onComplete }) {
  const [qs] = useState(() => Array.from({ length: N }, make));
  const [q, setQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const start = useRef(performance.now());
  const cur = qs[q]; const chosen = answers[q];
  const last = q === N - 1;

  const next = () => {
    if (chosen === undefined) return;
    if (!last) { setQ(q + 1); return; }
    const correct = qs.filter((x, i) => answers[i] === x.ans).length;
    onComplete({ correct, total: N, ms: performance.now() - start.current });
  };

  return (
    <div>
      <div className="hud"><span>Question {q + 1} of {N}</span></div>
      <ProgressBar value={q} max={N} label="Progress" />
      <p className="big" style={{ fontSize: '2rem' }}>{cur.seq.join(', ')}, ?</p>
      <div className="opts" role="radiogroup" aria-label="Choose the next number">
        {cur.options.map((o) => (
          <button key={o} role="radio" aria-checked={chosen === o} className={`opt ${chosen === o ? 'is-selected' : ''}`} onClick={() => setAnswers({ ...answers, [q]: o })}>{o}</button>
        ))}
      </div>
      <div className="nav-row">
        <Button variant="ghost" disabled={q === 0} onClick={() => setQ(q - 1)}>Previous</Button>
        <Button disabled={chosen === undefined} onClick={next}>{last ? 'Finish' : 'Next'}</Button>
      </div>
    </div>
  );
}
