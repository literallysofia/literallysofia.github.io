import React from "react"
import Head from "./head"
import Header from "./header/header"
import Footer from "./footer/footer"

export default ({ children }) => (
  <div id="root">
    <Head />
    <div>
      <Header />
      <div id="content">
        {children}
  {/*       <Footer /> */}
      </div>
    </div>
  </div>
)
