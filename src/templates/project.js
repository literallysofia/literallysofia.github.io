import React from "react"

const Project = ({ portfolio }) => {
  const { title, live, source, stack, image } = portfolio.frontmatter
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ContentWrapper>
        <Content>
          <Text dangerouslySetInnerHTML={{ __html: portfolio.html }} />
          <Stack>{stack}</Stack>
          <ButtonsWrapper>
            <ButtonLink target="_blank" solid href={live} rel="noreferrer">
              <StyledIcon icon={faLink} />
              Visit
            </ButtonLink>
            <ButtonLink target="_blank" href={source} rel="noreferrer">
              <StyledIcon icon={faGithub} />
              Source
            </ButtonLink>
          </ButtonsWrapper>
        </Content>
        <Image fluid={image.childImageSharp.fluid} />
      </ContentWrapper>
    </Wrapper>
  )
}

export default Project
