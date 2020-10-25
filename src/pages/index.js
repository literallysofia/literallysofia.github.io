import React from "react"
import { graphql } from "gatsby"
import { Layout, Hero, About, Experience, ExtraCurricular, Portfolio } from "../components"

export default ({ data }) => (
  <Layout>
    <main>
      <Hero data={data.hero.edges} />
      <About data={data.about.edges} />
      <Experience data={data.experience.edges} />
      <ExtraCurricular data={data.extra.edges} />
      <Portfolio data={data.portfolio.edges} />
    </main>
  </Layout>
)

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            subtitle
            slogan
          }
          html
        }
      }
    }
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
              web,
              details
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
    extra: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/extra-curricular/" } }
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
    portfolio: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/portfolio/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            projects {
              title
              abstract
              github
              behance
              keywords
            }
          }
          html
        }
      }
    }
  }
`
