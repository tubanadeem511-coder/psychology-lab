// Accessible bar for in-test progress (e.g. round 3 of 10) or score display.
export default function ProgressBar({ value, max = 100, label, tone = 'indigo' }) {
  const pct = Math.round((Math.min(value, max) / max) * 100);
  return (
    <div className="progress">
      {label && <div className="progress__label"><span>{label}</span><span>{pct}%</span></div>}
      <div className="progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label || 'Progress'}>
        <div className={`progress__fill progress__fill--${tone}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
