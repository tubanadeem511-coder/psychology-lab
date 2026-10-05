import { tests } from '../tests/registry.js';
import PageContainer from '../components/layout/PageContainer.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';

export default function LearnPage() {
  return (
    <PageContainer title="The science behind the tests" intro="What each experiment measures, and why it matters.">
      <div className="grid">
        {tests.map((t) => (
          <Card key={t.id} as="article" tone={t.tone}>
            <Badge tone={t.tone}>{t.category}</Badge>
            <h3>{t.title}</h3>
            <p>{t.why}</p>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
