import React from 'react';
import { ThemeToggle } from '../ui/theme-toggle';

const NavBar = () => {
  return (
    <header>
      <h1>Scouts Ter Alwina</h1>
      <nav>
        <li>Link 1</li>
        <li>Link 2</li>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default NavBar;
