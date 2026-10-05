import { useState, useEffect, useRef } from 'react';
import { clamp } from '../utils/scoring.js';
import { mean } from '../utils/random.js';

const TRIALS = 5;
export const score = ({ times, falseStarts }) => {
  const avg = Math.round(mean(times));
  return {
    score: Math.round(clamp(100 - (avg - 200) / 4 - falseStarts * 5)),
    metrics: { Average: `${avg} ms`, Best: `${Math.min(...times)} ms`, 'False starts': falseStarts },
    insight: 'Typical visual reaction time is 200 to 300 ms. Tiredness, distraction and the device you use all shift it.',
  };
};
const TEXT = {
  idle: 'Click here to begin. Then wait for green.', wait: 'Wait for green…', go: 'CLICK NOW!',
  early: 'Too soon! Click to try this round again.', between: 'Click to continue.',
};

export default function ReactionTest({ onComplete }) {
  const [state, setState] = useState('idle');
  const [times, setTimes] = useState([]);
  const [fs, setFs] = useState(0);
  const [last, setLast] = useState(null);
  const t0 = useRef(0);
  const pressRef = useRef(null);

  useEffect(() => {
    if (state !== 'wait') return undefined;
    const id = setTimeout(() => { t0.current = performance.now(); setState('go'); }, 1500 + Math.random() * 2500);
    return () => { clearTimeout(id); };
  }, [state]);

  const press = () => {
    if (state === 'idle' || state === 'between' || state === 'early') { setState('wait'); return; }
    if (state === 'wait') { setFs((f) => f + 1); setState('early'); return; }
    if (state === 'go') {
      const rt = Math.round(performance.now() - t0.current);
      const next = [...times, rt];
      setTimes(next); setLast(rt);
      if (next.length >= TRIALS) { setState('done'); onComplete({ times: next, falseStarts: fs }); } else setState('between');
    }
  };
  pressRef.current = press;

  useEffect(() => {
    const onKey = (e) => { if (e.code === 'Space') { e.preventDefault(); pressRef.current(); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div>
      <div className="hud"><span>Round {Math.min(times.length + 1, TRIALS)} of {TRIALS}</span>{last && <span>Last: {last} ms</span>}</div>
      <div className={`arena arena--${state}`} role="button" tabIndex={0} onPointerDown={press}>{state === 'between' ? `${last} ms. ${TEXT.between}` : TEXT[state]}</div>
    </div>
  );
}
