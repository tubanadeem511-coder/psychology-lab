// Shows where the person is in the test lifecycle: instructions, ready, test, results.
export default function StepIndicator({ steps, current }) {
  return (
    <ol className="steps" aria-label="Test progress">
      {steps.map((s, i) => (
        <li key={s} className={`steps__item ${i < current ? 'is-done' : ''} ${i === current ? 'is-current' : ''}`} aria-current={i === current ? 'step' : undefined}>
          <span className="steps__dot">{i < current ? '✓' : i + 1}</span>
          <span className="steps__label">{s}</span>
        </li>
      ))}
    </ol>
  );
}
