export default function Card({ as: Tag = 'div', tone, interactive = false, className = '', children, ...rest }) {
  const cls = `card ${tone ? `card--${tone}` : ''} ${interactive ? 'card--interactive' : ''} ${className}`;
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
