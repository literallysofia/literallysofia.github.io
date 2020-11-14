import React, { useState, useEffect } from "react"
import Particles from "react-particles-js"
import Head from "./head"
import Header from "./header/header"
import Footer from "./footer/footer"

const Layout = ({ isNotFound, children }) => {
  const [mobile, setMobile] = useState(null)
  const [tablet, setTablet] = useState(null)

  const setDevice = () => {
    if (window.matchMedia("(max-width: 767.98px)").matches) {
      setMobile(true)
      setTablet(false)
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      setMobile(false)
      setTablet(true)
    } else {
      setMobile(false)
      setTablet(false)
    }
  }

  const bubbles = {
    particles: {
      number: {
        value: mobile ? 4 : 8,
      },
      size: {
        value: mobile ? 20 : 50,
        random: {
          enable: true,
          minimumValue: mobile || tablet ? 100 : 200,
        },
      },
      color: {
        value: "#71a7b2",
      },
      opacity: {
        value: 0.1,
      },
      links: {
        enable: false,
      },
      move: {
        speed: 5,
      },
    },
  }

  useEffect(() => {
    setDevice()
    window.addEventListener("resize", setDevice)
  })

  return (
    <div id="root">
      <Head />
      <Particles className="particles-js" params={bubbles} />
      <div>
        <Header isNotFound={isNotFound} />
        <div id="content">
          {children}
          {!isNotFound && <Footer />}
        </div>
      </div>
    </div>
  )
}

export default Layout
