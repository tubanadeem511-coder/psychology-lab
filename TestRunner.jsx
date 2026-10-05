import { useState, useEffect } from 'react';
import { games } from '../../tests/modules.js';
import { scorers } from '../../tests/scoring.js';
import { saveResult } from '../../services/storage.js';
import InstructionsPanel from './InstructionsPanel.jsx';
import ResultCard from '../results/ResultCard.jsx';
import StepIndicator from '../ui/StepIndicator.jsx';
import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';

const STEPS = ['Instructions', 'Get ready', 'Test', 'Results'];
const ORDER = ['instructions', 'countdown', 'running', 'results'];

function Countdown({ onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) { onDone(); return undefined; }
    const id = setTimeout(() => setN(n - 1), 800);
    return () => clearTimeout(id);
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  return <Card className="arena"><p className="countdown" aria-live="assertive">{n || 'Go'}</p></Card>;
}

// instructions -> countdown -> running -> results. Restart remounts the game via `runKey`.
export default function TestRunner({ test }) {
  const [stage, setStage] = useState('instructions');
  const [runKey, setRunKey] = useState(0);
  const [result, setResult] = useState(null);
  const Game = games[test.id];

  const restart = () => { setResult(null); setRunKey((k) => k + 1); setStage('countdown'); };
  const finish = (raw) => {
    const { noBand, ...scored } = scorers[test.id](raw);
    const r = { id: `${Date.now()}`, testId: test.id, timestamp: new Date().toISOString(), noBand, ...scored };
    saveResult(r); setResult(r); setStage('results');
  };

  return (
    <>
      <StepIndicator steps={STEPS} current={ORDER.indexOf(stage)} />
      {stage === 'instructions' && <InstructionsPanel test={test} onStart={() => setStage('countdown')} />}
      {stage === 'countdown' && <Countdown key={runKey} onDone={() => setStage('running')} />}
      {stage === 'running' && (
        <>
          <Game key={runKey} onComplete={finish} />
          <div className="arena__actions"><Button variant="ghost" onClick={restart}>Restart</Button></div>
        </>
      )}
      {stage === 'results' && result && (
        <>
          <ResultCard result={{ ...result, title: test.title, icon: test.icon }} />
          <Card className="explain"><h3>What this measures</h3><p>{test.why}</p></Card>
          <div className="arena__actions">
            <Button onClick={restart}>Try again</Button>
            <Button variant="secondary" to="/results">View all results</Button>
            <Button variant="ghost" to="/">All tests</Button>
          </div>
        </>
      )}
    </>
  );
}
