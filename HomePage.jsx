import { tests } from '../tests/registry.js';
import TestGrid from '../components/test/TestGrid.jsx';
import Button from '../components/ui/Button.jsx';

// Decorative 4x4 grid that lights up in a sequence, echoing the memory test.
const lit = [1, 6, 11, 12, 7];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <h1>Test how your mind works.</h1>
            <p>Seven short experiments on memory, attention, speed and judgment. Finish one, see your score, and learn the science behind it.</p>
            <div className="hero__actions">
              <Button size="lg" href="#tests">Choose a test</Button>
              <Button size="lg" variant="ghost" to="/learn">Read the science</Button>
            </div>
          </div>
          <div className="hero__grid" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} className={lit.includes(i) ? 'is-lit' : ''} style={{ '--i': lit.indexOf(i) }} />
            ))}
          </div>
        </div>
      </section>
      <section id="tests" className="container section">
        <h2>Choose a test</h2>
        <p className="section__intro">Each one takes under ten minutes. Results are saved on this device.</p>
        <TestGrid tests={tests} />
      </section>
    </>
  );
}
