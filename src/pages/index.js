import React from "react"
import { graphql } from "gatsby"
import { Layout, Hero, About, Experience, Projects } from "../components"

export default ({ data }) => (
  <Layout>
    <main>
      <Hero />
      <About data={data.about.edges} />
      <Experience data={data.experience.edges} />
      <Projects />
    </main>
  </Layout>
)

export const pageQuery = graphql`
  {
    about: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/about/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            education {
              date
              degree
              school
              web
            }
            languages {
              language
              icon
              level
            }
            skills
            tools
          }
          html
        }
      }
    }
    experience: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            jobs {
              date
              title
              company
              web
              bio
            }
          }
          html
        }
      }
    }
  }
`
