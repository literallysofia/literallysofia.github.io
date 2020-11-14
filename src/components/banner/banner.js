import React from "react"
import "./banner.scss"
import { socialMedia } from "../../config"
import Portrait from "../../images/portrait.png"
import { useSpring, animated, config } from "react-spring"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedinIn,
  faBehance,
} from "@fortawesome/free-brands-svg-icons"

const Banner = ({ data }) => {
  const { frontmatter } = data[0].node
  const { title, subtitle, slogan } = frontmatter

  const DefaultSpring = useSpring({
    config: config.stiff,
    delay: 600,
    opacity: 1,
    from: { opacity: 0 },
  })

  const ImageSpring = useSpring({
    config: config.wobbly,
    delay: 200,
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(40px)" },
  })

  const SubtitleSpring = useSpring({
    config: config.gentle,
    delay: 200,
    opacity: 1,
    transform: "translateX(0px)",
    from: { opacity: 0, transform: "translateX(40px)" },
  })

  const TitleSpring = useSpring({
    config: config.gentle,
    delay: 300,
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(40px)" },
  })

  const SloganSpring = useSpring({
    config: config.gentle,
    delay: 400,
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(40px)" },
  })

  const socialIcon = socialName => {
    switch (socialName) {
      case "GitHub":
        return <FontAwesomeIcon icon={faGithub} />
      case "Linkedin":
        return <FontAwesomeIcon icon={faLinkedinIn} />
      case "Behance":
        return <FontAwesomeIcon icon={faBehance} />
      default:
        return null
    }
  }

  const openMail = () => {
    window.location.href = `mailto:sofialcfsilva@gmail.com`
  }

  return (
    <div id="banner">
      <div className="banner-content">
        <div className="image-wrapper">
          <animated.img style={ImageSpring} src={Portrait} alt="Portrait" />
        </div>
        <div className="banner-intro">
          <animated.span style={SubtitleSpring}>{subtitle}</animated.span>
          <animated.h1 style={TitleSpring}>{title}</animated.h1>
          <animated.p style={SloganSpring}>{slogan}</animated.p>
          <animated.button
            style={DefaultSpring}
            className="default"
            onClick={openMail}
          >
            Say hello
          </animated.button>
        </div>
      </div>
      <ul className="social-media">
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <animated.li style={DefaultSpring} key={i}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {socialIcon(name)}
              </a>
            </animated.li>
          ))}
      </ul>
    </div>
  )
}

export default Banner
