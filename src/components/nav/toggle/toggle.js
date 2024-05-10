import React, { useState, useEffect } from "react"
import { useSpring, animated } from "react-spring"
import "./toggle.scss"

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(undefined)

  const darkModeToggleSpring = useSpring({
    delay: 200,
    opacity: 1,
    from: { opacity: 0 },
  })

  useEffect(() => {
    setIsDark(localStorage.getItem('darkMode') === "true")
  }, [])

  useEffect(() => {
    var classNameDark = "dark-mode"
    var classNameLight = "light-mode"
    document.body.classList.add(isDark ? classNameDark : classNameLight)
    document.body.classList.remove(isDark ? classNameLight : classNameDark)
    localStorage.setItem("darkMode", isDark)
  }, [isDark])

  return (
    <animated.div style={darkModeToggleSpring} id="toggle-container">
      <input
        type="checkbox"
        id="dn"
        aria-label="Dark mode toggle"
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
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
    </animated.div>
  )
}
