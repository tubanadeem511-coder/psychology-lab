import Card from '../ui/Card.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

export default function InstructionsPanel({ test, onStart }) {
  return (
    <Card className="instructions">
      <div className="instructions__head">
        <span className="instructions__icon" aria-hidden="true">{test.icon}</span>
        <div>
          <h2>{test.title}</h2>
          <div className="test-card__meta"><Badge tone={test.tone}>{test.category}</Badge><span>About {test.minutes} min</span></div>
        </div>
      </div>
      <p>{test.summary}</p>
      <h3>How it works</h3>
      <ol className="instructions__list">{test.steps.map((s) => <li key={s}>{s}</li>)}</ol>
      <aside className="instructions__why"><strong>Why this matters.</strong> {test.why}</aside>
      <Button size="lg" onClick={onStart}>Begin test</Button>
    </Card>
  );
}
