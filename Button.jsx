import { Link } from 'react-router-dom';

// Renders <button>, <Link> (via `to`) or <a> (via `href`) with the same styling.
export default function Button({ variant = 'primary', size = 'md', to, href, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} btn--${size} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type={rest.type || 'button'} className={cls} {...rest}>{children}</button>;
}
