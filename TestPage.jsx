import { useParams } from 'react-router-dom';
import { getTest } from '../tests/registry.js';
import PageContainer from '../components/layout/PageContainer.jsx';
import TestRunner from '../components/test/TestRunner.jsx';
import NotFoundPage from './NotFoundPage.jsx';

export default function TestPage() {
  const test = getTest(useParams().testId);
  if (!test) return <NotFoundPage />;
  return <PageContainer narrow><TestRunner key={test.id} test={test} /></PageContainer>;
}
