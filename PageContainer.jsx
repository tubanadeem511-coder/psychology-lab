export default function PageContainer({ title, intro, narrow = false, children }) {
  return (
    <div className={`container page ${narrow ? 'container--narrow' : ''}`}>
      {title && <h1 className="page__title">{title}</h1>}
      {intro && <p className="page__intro">{intro}</p>}
      {children}
    </div>
  );
}
