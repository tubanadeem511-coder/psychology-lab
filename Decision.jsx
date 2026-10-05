import { useState, useRef } from 'react';
import Button from '../components/ui/Button.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { mean } from '../utils/random.js';

const SCENARIOS = [
  { q: 'Your project is behind schedule. What do you do?', o: [['Cut scope and ship on time', 1], ['Ask for an extra week and keep scope', 2], ['Keep full scope and hope overtime catches you up', 3]] },
  { q: 'You can keep a stable job or join a young startup with equity.', o: [['Stay where you are', 1], ['Freelance for the startup first', 2], ['Join the startup', 3]] },
  { q: 'You have $1,000 spare to invest.', o: [['Put it in a savings account', 1], ['Buy a broad index fund', 2], ['Buy one volatile stock', 3]] },
  { q: 'Your group disagrees with your plan and you have little data.', o: [['Go with the group', 1], ['Propose a small trial', 2], ['Proceed with your plan', 3]] },
  { q: 'You are at an unfamiliar restaurant.', o: [['Order something familiar', 1], ['Ask what is popular', 2], ['Order the most unusual dish', 3]] },
];
export const score = ({ risks, ms }) => {
  const avg = mean(risks);
  const style = avg < 1.67 ? 'Cautious' : avg < 2.34 ? 'Balanced' : 'Bold';
  return {
    tendency: true, score: Math.round(((avg - 1) / 2) * 100),
    metrics: { 'Risk style': style, 'Decision time': `${(ms / risks.length / 1000).toFixed(1)} s` },
    insight: `There are no right answers here. Your choices lean ${style.toLowerCase()}. Risk tolerance varies by context, so one short quiz is only a snapshot.`,
  };
};

export default function DecisionTest({ onComplete }) {
  const [q, setQ] = useState(0);
  const [picks, setPicks] = useState({});
  const start = useRef(performance.now());
  const s = SCENARIOS[q]; const last = q === SCENARIOS.length - 1;
  const next = () => {
    if (picks[q] === undefined) return;
    if (!last) { setQ(q + 1); return; }
    onComplete({ risks: SCENARIOS.map((x, i) => x.o[picks[i]][1]), ms: performance.now() - start.current });
  };
  return (
    <div>
      <div className="hud"><span>Scenario {q + 1} of {SCENARIOS.length}</span></div>
      <ProgressBar value={q} max={SCENARIOS.length} label="Progress" />
      <h3 style={{ marginTop: '1rem' }}>{s.q}</h3>
      <div className="opts opts--stack" role="radiogroup">
        {s.o.map(([text], k) => (
          <button key={text} role="radio" aria-checked={picks[q] === k} className={`opt ${picks[q] === k ? 'is-selected' : ''}`} onClick={() => setPicks({ ...picks, [q]: k })}>{text}</button>
        ))}
      </div>
      <div className="nav-row">
        <Button variant="ghost" disabled={q === 0} onClick={() => setQ(q - 1)}>Previous</Button>
        <Button disabled={picks[q] === undefined} onClick={next}>{last ? 'See my style' : 'Next'}</Button>
      </div>
    </div>
  );
}
