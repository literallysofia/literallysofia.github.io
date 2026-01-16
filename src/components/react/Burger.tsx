interface BurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Burger({ open, setOpen }: BurgerProps) {
  const burgerStyle = {
    background: 'none',
    border: 'none',
    outline: 'none',
    height: '3em',
    width: '3em',
    position: 'relative' as const,
    transform: 'scale(0.7)',
    cursor: 'pointer',
  };

  const linesStyle = {
    display: 'block',
    borderRadius: '0.25em',
    height: '0.3em',
    position: 'absolute' as const,
    transition: 'all 0.25s ease-in',
    top: '50%',
    marginTop: '-0.125em',
    width: '100%',
    backgroundColor: open ? 'transparent' : 'inherit',
  };

  const beforeStyle = {
    content: '""',
    display: 'block',
    borderRadius: '0.25em',
    height: '0.3em',
    position: 'absolute' as const,
    transition: 'all 0.25s ease-in',
    width: '2em',
    left: open ? '0.5em' : '1em',
    top: open ? '0.5em' : '1em',
    transform: open ? 'rotate(135deg)' : 'rotate(0)',
  };

  const afterStyle = {
    content: '""',
    display: 'block',
    borderRadius: '0.25em',
    height: '0.3em',
    position: 'absolute' as const,
    transition: 'all 0.25s ease-in',
    width: '2em',
    left: open ? '0.5em' : '0',
    top: open ? '0.5em' : '-1em',
    transform: open ? 'rotate(-135deg)' : 'rotate(0)',
  };

  return (
    <button id="burger" style={burgerStyle} onClick={() => setOpen(!open)}>
      <div className="burger-lines" style={linesStyle}>
        <span style={beforeStyle} />
        <span style={afterStyle} />
      </div>
    </button>
  );
}
