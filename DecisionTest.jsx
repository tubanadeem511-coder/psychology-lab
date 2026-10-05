import { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import ProgressBar from '../../components/ui/ProgressBar.jsx';

// risk: 1 = cautious, 2 = balanced, 3 = bold. There are no right answers.
const SCENARIOS = [
  { q: 'You are offered a new job with higher pay but less security at a young company.', o: [['Stay in your current job', 1], ['Ask to negotiate a trial period', 2], ['Take the new job', 3]] },
  { q: 'You have some savings to invest for five years.', o: [['Put it in a savings account', 1], ['Split between stable and growth funds', 2], ['Invest in a single high-growth company', 3]] },
  { q: 'Your team must choose a launch date. Waiting a month lowers the chance of problems.', o: [['Wait the extra month', 1], ['Launch with a small test group first', 2], ['Launch on the original date', 3]] },
  { q: 'You are traveling and the usual route is closed. A shortcut is unknown to you.', o: [['Take the long, known detour', 1], ['Check a map, then decide', 2], ['Try the shortcut', 3]] },
  { q: 'A friend invites you to join a risky but exciting side project.', o: [['Politely decline', 1], ['Join with a small, limited role', 2], ['Commit fully', 3]] },
];

export default function DecisionTest({ onComplete }) {
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState([]);
  const t0 = useRef(0);
  useEffect(() => { t0.current = performance.now(); }, [i]);

  const s = SCENARIOS[i];
  const choose = (k) => {
    const prev = answers[i];
    const copy = [...answers];
    copy[i] = { choice: k, risk: s.o[k][1], ms: prev ? prev.ms : performance.now() - t0.current };
    setAnswers(copy);
  };
  const last = i + 1 === SCENARIOS.length;

  return (
    <Card className="arena">
      <ProgressBar value={i} max={SCENARIOS.length} label={`Scenario ${i + 1} of ${SCENARIOS.length}`} tone="slate" />
      <h3>{s.q}</h3>
      <div className="options options--stack" role="group" aria-label="Choose an option">
        {s.o.map(([text], k) => (
          <button key={text} type="button" aria-pressed={answers[i]?.choice === k} className={`option ${answers[i]?.choice === k ? 'is-selected' : ''}`} onClick={() => choose(k)}>{text}</button>
        ))}
      </div>
      <div className="arena__actions">
        <Button variant="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</Button>
        <Button disabled={!answers[i]} onClick={() => (last ? onComplete({ answers }) : setI(i + 1))}>{last ? 'See results' : 'Next'}</Button>
      </div>
    </Card>
  );
}
