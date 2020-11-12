import React, { useState, useEffect } from "react"
import "./header.scss"
import Burger from "../burger/burger"
import Menu from "../menu/menu"

const Header = () => {
  const [scroll, setScroll] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      if (document.documentElement.scrollTop > 0) setScroll("scroll")
      else setScroll("")
    }
  })

  return (
    <header className={scroll}>
      <span className={"navbar-brand " + scroll}>S</span>

      <Burger aria-label="Toggle navigation" open={open} setOpen={setOpen} />
      <Menu open={open} setOpen={setOpen} />
    </header>
  )
}

export default Header
