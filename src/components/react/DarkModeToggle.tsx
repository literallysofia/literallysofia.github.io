import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches));
  }, []);

  useEffect(() => {
    if (isDark === undefined) return;

    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isDark) {
      htmlElement.classList.remove('light-mode');
      htmlElement.classList.add('dark-mode');
      bodyElement.classList.remove('light-mode');
      bodyElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.classList.remove('dark-mode');
      htmlElement.classList.add('light-mode');
      bodyElement.classList.remove('dark-mode');
      bodyElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  if (isDark === undefined) return null;

  return (
    <div id="toggle-container">
      <input
        type="checkbox"
        id="dn"
        aria-label="Dark mode toggle"
        checked={isDark}
        onChange={(e) => setIsDark(e.target.checked)}
      />
      <label id="toggle" className="toggle" htmlFor="dn">
        <span id="sun">
          <span className="crater crater-1" />
          <span className="crater crater-2" />
          <span className="crater crater-3" />
        </span>
        <span className="star star-1" />
        <span className="star star-2" />
        <span className="star star-3" />
        <span className="star star-4" />
        <span className="star star-5" />
        <span className="star star-6" />
      </label>
    </div>
  );
}
