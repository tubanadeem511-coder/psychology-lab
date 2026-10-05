import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Tests', end: true },
  { to: '/results', label: 'My results' },
  { to: '/learn', label: 'Learn' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]); // close menu after navigating

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand"><span className="navbar__logo" aria-hidden="true" />Psychology Lab</Link>
        <button className="navbar__toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen(!open)}>
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden="true" />
        </button>
        <nav id="nav-menu" className={`navbar__menu ${open ? 'is-open' : ''}`} aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="navbar__link">{l.label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
