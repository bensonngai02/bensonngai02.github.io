// Header and navigation links; edit to change site nav or brand.
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="name">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Benson Ngai
          </Link>
        </h1>
      </div>
      <nav className="menu">
        <a href="/#experiences">experiences</a>
        <a href="/#projects">projects</a>
        <a href="/#life">life</a>
        <Link to="/blog">blog</Link>
      </nav>
    </header>
  );
}

export default Header;
