import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

export default function TestCard({ test }) {
  return (
    <Card as="article" tone={test.tone} interactive className="test-card">
      <div className="test-card__icon" aria-hidden="true">{test.icon}</div>
      <div className="test-card__meta">
        <Badge tone={test.tone}>{test.category}</Badge>
        <span>{test.minutes} min</span>
        <span>{test.difficulty}</span>
      </div>
      <h3>{test.title}</h3>
      <p>{test.summary}</p>
      <Button to={`/test/${test.id}`} variant="secondary" aria-label={`Start ${test.title}`}>Start test</Button>
    </Card>
  );
}
