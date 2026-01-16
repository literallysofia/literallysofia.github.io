import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import DarkModeToggle from './DarkModeToggle';
import { siteConfig } from '../../config';

interface HeaderProps {
  isNotFound?: boolean;
}

function DesktopNav() {
  const navigate = (url: string) => {
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

export default function Header({ isNotFound }: HeaderProps) {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [scroll, setScroll] = useState(false);

  const checkDevice = () => {
    setMobile(window.matchMedia('(max-width: 55em)').matches);
  };

  const checkScroll = () => {
    setScroll(document.documentElement.scrollTop > 0);
  };

  useEffect(() => {
    checkDevice();
    checkScroll();

    window.addEventListener('resize', checkDevice);
    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const brandStyle = {
    fontSize: scroll ? '3em' : '6em',
    transition: 'font-size 0.4s ease-out',
  };

  const desktopMenuStyle = {
    display: 'flex',
    paddingBottom: scroll ? '0' : '2em',
    transition: 'all 0.4s ease-out',
  };

  return (
    <header data-scroll={scroll.toString()}>
      <span className="navbar-brand" style={brandStyle}>
        S
      </span>
      {isNotFound ? null : mobile ? (
        <MobileMenu />
      ) : (
        <div className="desktop-menu" style={desktopMenuStyle}>
          <DesktopNav />
          <DarkModeToggle />
        </div>
      )}
    </header>
  );
}
