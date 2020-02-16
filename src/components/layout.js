import React from "react"
import { Head, Header, Footer } from '../components';

export default ({ children }) => (
  <div id="root">
    <Head />

    <div>
      <Header />

      <div id="content">
        {children}
        <Footer />
      </div>
    </div>
  </div>
)
