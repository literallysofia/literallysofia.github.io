import React, { useState, useEffect } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import Head from "./head"
import Header from "./header/header"
import Footer from "./footer/footer"
import { loadSlim } from "@tsparticles/slim"

export default function Layout({ isNotFound, children }) {
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

  const options = {
    fpsLimit: 120,
    particles: {
      color: {
        value: "#71a7b2",
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: true,
        speed: 5,
        straight: false,
      },
      number: {
        value: 8,
      },
      opacity: {
        value: 0.1,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: {
          max: mobile || tablet ? 100 : 200,
          min: mobile ? 20 : 50,
        },
      },
    },
    detectRetina: true,
    fullScreen: {
      enable: false,
    },
  }

  useEffect(() => {
    setDevice()
    window.addEventListener("resize", setDevice)
  })

  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    <div id="root">
      <Head />

      {init && <Particles id="tsparticles" options={options} />}

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
