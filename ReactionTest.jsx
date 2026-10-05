import { useState, useEffect, useRef } from 'react';
import Card from '../../components/ui/Card.jsx';

const TRIALS = 5;
export default function ReactionTest({ onComplete }) {
  const [phase, setPhase] = useState('idle');
  const [msg, setMsg] = useState('Click to start');
  const [times, setTimes] = useState([]);
  const [falseStarts, setFalseStarts] = useState(0);
  const t0 = useRef(0);

  useEffect(() => {
    if (phase !== 'wait') return undefined;
    const id = setTimeout(() => { t0.current = performance.now(); setPhase('go'); }, 1500 + Math.random() * 2500);
    return () => clearTimeout(id);
  }, [phase]);

  const click = () => {
    if (phase === 'idle') { setPhase('wait'); setMsg('Wait for green…'); return; }
    if (phase === 'wait') { setFalseStarts(falseStarts + 1); setPhase('idle'); setMsg('Too soon! Click to try again.'); return; }
    const rt = performance.now() - t0.current;
    const next = [...times, rt];
    if (next.length >= TRIALS) return onComplete({ times: next, falseStarts });
    setTimes(next); setPhase('idle'); setMsg(`${Math.round(rt)} ms. Click for the next trial.`);
  };

  return (
    <Card className="arena">
      <p>Trial {times.length + 1} of {TRIALS}</p>
      <button type="button" className={`reaction reaction--${phase}`} onClick={click}>{phase === 'go' ? 'Click now!' : msg}</button>
    </Card>
  );
}
