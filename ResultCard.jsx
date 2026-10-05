import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { getBand } from '../../utils/scoring.js';

// Expects the standardized result shape: { title, icon, score, metrics, timestamp }
export default function ResultCard({ result, sample = false }) {
  const band = getBand(result.score);
  return (
    <Card as="article" className="result">
      <header className="result__head">
        <span aria-hidden="true">{result.icon}</span>
        <h3>{result.title}</h3>
        {sample ? <Badge tone="slate">Sample</Badge> : result.noBand ? <Badge tone="slate">Profile</Badge> : result.tendency ? <Badge tone="slate">Tendency</Badge> : <Badge tone={band.tone}>{band.label}</Badge>}
      </header>
      <p className="result__score">{result.score}<small>/100</small></p>
      <ProgressBar value={result.score} label={result.tendency ? 'Risk tolerance' : 'Score'} tone={band.tone} />
      <dl className="result__metrics">
        {Object.entries(result.metrics).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
      </dl>
      {result.timestamp && <p className="result__date">{new Date(result.timestamp).toLocaleDateString()}</p>}
    </Card>
  );
}
