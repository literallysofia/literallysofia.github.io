import React from "react"
import FontFaces from "../fonts/fonts"
import { createGlobalStyle } from "styled-components"
import { Head, Header, Footer } from "../components"

const GlobalStyle = createGlobalStyle`
  ${FontFaces};
`

export default ({ children }) => (
  <div id="root">
    <Head />
    <GlobalStyle/>
    <div>
      <Header />

      <div id="content">
        {children}
        <Footer />
      </div>
    </div>
  </div>
)
