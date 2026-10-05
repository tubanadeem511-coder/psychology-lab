import TestCard from './TestCard.jsx';

export default function TestGrid({ tests }) {
  return <div className="grid">{tests.map((t) => <TestCard key={t.id} test={t} />)}</div>;
}
