import React from "react"
import styled from "styled-components"
import { bool, func } from "prop-types"

export const StyledBurger = styled.button`
  background: none;
  border: none;
  outline: none;
  height: 3em;
  width: 3em;
  position: relative;
  transform: scale(0.7);
  cursor: pointer;

  &:after {
    content: "";
    display: block;
    position: absolute;
    height: 150%;
    width: 150%;
    top: -25%;
    left: -25%;
  }

  .burger-lines:after {
    width: 2em;
    left: ${({ open }) => (open ? "0.5em" : "0")};
    top: ${({ open }) => (open ? "0.5em" : "-1em")};
    transform: ${({ open }) => (open ? "rotate(-135deg)" : "rotate(0)")};
  }

  .burger-lines:before {
    width: 2em;
    left: ${({ open }) => (open ? "0.5em" : "1em")};
    top: ${({ open }) => (open ? "0.5em" : "1em")};
    transform: ${({ open }) => (open ? "rotate(135deg)" : "rotate(0)")};
  }

  .burger-lines {
    top: 50%;
    margin-top: -0.125em;
    width: 100%;
    background-color: ${({ open }) =>
      open ? "transparent !important" : "inherit"};
  }

  .burger-lines,
  .burger-lines:after,
  .burger-lines:before {
    display: block;
    content: "";
    border-radius: 0.25em;
    height: 0.3em;
    position: absolute;
    transition: all 0.25s ease-in;
  }
`

export default function Burger({ open, setOpen }) {
  return (
    <StyledBurger id="burger" open={open} onClick={() => setOpen(!open)}>
      <div className="burger-lines" />
    </StyledBurger>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
}
