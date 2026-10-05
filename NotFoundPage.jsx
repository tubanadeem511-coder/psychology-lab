import PageContainer from '../components/layout/PageContainer.jsx';
import Button from '../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <PageContainer title="Page not found" intro="That page doesn't exist. Head back to the list of tests.">
      <Button to="/">Browse tests</Button>
    </PageContainer>
  );
}
