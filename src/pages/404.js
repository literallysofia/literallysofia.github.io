import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh !important;
  padding-bottom: 0 !important;
`

const StyledEmoji = styled.div`
  font-size: 3em;
  span:first-child {
    margin-right: 0.2em;
  }
`

const StyledSpan = styled.span`
  margin-bottom: 2em;
`

export default function NotFoundPage() {
  return (
    <Layout isNotFound={true}>
      <StyledMain>
        <StyledEmoji>
          <span role="img" aria-label="Magnifying glass">
            🔎
          </span>
          <span role="img" aria-label="Thinking face">
            🤔
          </span>
        </StyledEmoji>
        <h1>Page not found</h1>
        <StyledSpan>Hold on... This page doesn't exist!</StyledSpan>
        <Link to="/">
          <button className="default">Go home</button>
        </Link>
      </StyledMain>
    </Layout>
  )
}
