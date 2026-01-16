import { useState } from 'react';
import Burger from './Burger';
import DarkModeToggle from './DarkModeToggle';
import { siteConfig } from '../../config';

interface MobileMenuProps {
  setOpen?: (open: boolean) => void;
}

function Nav({ setOpen }: MobileMenuProps) {
  const navigate = (url: string) => {
    if (setOpen) setOpen(false);
    const element = document.querySelector(url);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      {siteConfig.navLinks.map((link, index) => (
        <div className="nav-item" key={index}>
          <button onClick={() => navigate(link.url)}>{link.name}</button>
        </div>
      ))}
    </nav>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const menuStyle = {
    display: open ? 'flex' : 'none',
    position: 'fixed' as const,
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    top: 0,
    left: 0,
    opacity: open ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      {open && (
        <div className="menu" style={menuStyle}>
          <Nav setOpen={setOpen} />
          <DarkModeToggle />
        </div>
      )}
    </>
  );
}
