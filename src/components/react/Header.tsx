import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import DarkModeToggle from './DarkModeToggle';
import { siteConfig } from '../../config';

interface HeaderProps {
  isNotFound?: boolean;
}

function DesktopNav() {
  return (
    <nav>
      {siteConfig.navLinks.map((link, index) => (
        <div className="nav-item" key={index}>
          <a href={link.url}>{link.name}</a>
        </div>
      ))}
    </nav>
  );
}

export default function Header({ isNotFound }: HeaderProps) {
  const [mobile, setMobile] = useState<boolean | null>(null);

  const checkDevice = () => {
    setMobile(window.matchMedia('(max-width: 55em)').matches);
  };

  useEffect(() => {
    checkDevice();

    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return (
    <header>
      <a href="/" className="navbar-brand">
        sofia silva
      </a>
      {isNotFound ? null : mobile ? (
        <MobileMenu />
      ) : (
        <>
          <div className="desktop-nav">
            <DesktopNav />
          </div>
          <div className="desktop-toggle">
            <DarkModeToggle />
          </div>
        </>
      )}
    </header>
  );
}
