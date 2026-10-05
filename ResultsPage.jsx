import { useState } from 'react';
import { getResults, clearResults } from '../services/storage.js';
import { getTest, tests } from '../tests/registry.js';
import PageContainer from '../components/layout/PageContainer.jsx';
import ResultCard from '../components/results/ResultCard.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';

const sample = { title: 'Reaction Time', icon: '⚡', score: 72, metrics: { Average: '284 ms', Best: '231 ms', 'False starts': 0 } };

export default function ResultsPage() {
  const [results, setResults] = useState(getResults);

  return (
    <PageContainer title="My results" intro="Every completed test is saved here, on this device only.">
      {results.length === 0 ? (
        <>
          <Card className="empty">
            <h2>No results yet</h2>
            <p>Complete a test and your score will appear here. This is what a result looks like:</p>
            <Button to="/">Take your first test</Button>
          </Card>
          <div className="grid"><ResultCard result={sample} sample /></div>
        </>
      ) : (
        <>
          <div className="grid">
            {results.map((r) => {
              const t = getTest(r.testId) || tests[0];
              return <ResultCard key={r.id} result={{ ...r, title: t.title, icon: t.icon }} />;
            })}
          </div>
          <Button variant="ghost" onClick={() => { clearResults(); setResults([]); }}>Clear my data</Button>
        </>
      )}
    </PageContainer>
  );
}
