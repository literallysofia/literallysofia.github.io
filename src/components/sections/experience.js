import React from "react"
import { Card } from "react-bootstrap"

class Experience extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    return (
      <section id="experience" className="target">
        <h3 className="heading">
          <span>02.</span>Experience
        </h3>
        <div className="card-list">
          <Card>
            <Card.Header>Nov 2018 - Present</Card.Header>
            <Card.Body>
              <Card.Title>
                Active Member{" "}
                <a href="https://up.ieee-pt.org">IEEE UP Student Branch</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Prototype design and web development, working mostly for the
                    design and marketing department.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Jun 2017 - Present</Card.Header>
            <Card.Body>
              <Card.Title>
                Web Developer, Marketing Manager and Designer{" "}
                <a href="http://portocampustudios.com">Porto Campus Studios</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Defined the branding of the company by choosing a name and
                    developing a design to advertise its products and services.
                  </li>
                  <li>Developed a website based on Wordpress.</li>
                  <li>
                    Responsible for marketing and social media management.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Jul 2019</Card.Header>
            <Card.Body>
              <Card.Title>
                Teaching Assistant{" "}
                <a href="https://universidadejunior.up.pt">
                  Universidade Júnior
                </a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Universidade Júnior is a summer course program at the
                    University of Porto, aimed at students in the 2nd and 3rd
                    cycle of basic education and secondary education (typically
                    up to the 11th year).
                  </li>
                  <li>
                    Taught programming to children from the age of 11 to 14.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Apr 2019</Card.Header>
            <Card.Body>
              <Card.Title>
                Speaker in Semana Profissão Engenheiro{" "}
                <a href="https://paginas.fe.up.pt/~escolas/">
                  Faculdade de Engenharia da Universidade do Porto
                </a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    I was invited by a teacher to present Sweven, a project for
                    the Database and Web Applications Laboratory (LBAW) class of
                    the Master in Informatics and Computer Engineering (MIEIC).
                    At the end of each session, I spoke about my experience in
                    college and cleared any doubts regarding the course.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Apr 2019</Card.Header>
            <Card.Body>
              <Card.Title>
                Promoter in Mostra da Universidade do Porto 2019{" "}
                <a href="https://www.mostra.up.pt">Universidade do Porto</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Promotion of FEUP's Master Degree in Informatics and
                    Computing Engineering. At "Mostra" high school students can
                    talk to university teachers, researchers and students so
                    that they get to know what the University of Porto has to
                    offer. It aims to contribute to a more informed future
                    vocational decision.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Jan 2017 - Nov 2018</Card.Header>
            <Card.Body>
              <Card.Title>
                Active Member <a href="https://ni.fe.up.pt">NIAEFEUP</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Active participation in the Informatics Club of the Faculty
                    of Engineering (Academic Organization).
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>May 2018 - Sep 2018</Card.Header>
            <Card.Body>
              <Card.Title>
                Active Member <a href="https://ni.fe.up.pt">NIAEFEUP</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Active participation in the Informatics Club of the Faculty
                    of Engineering (Academic Organization).
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Jan 2017 - Jul 2018</Card.Header>
            <Card.Body>
              <Card.Title>
                Head of Design, Marketing and Communications{" "}
                <a href="https://sinf.pt">Semana de Informática</a>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>
                    Participation in the organization of Semana de Informática,
                    a yearly tech conference that takes place at the Faculty of
                    Engineering at University of Porto.
                  </li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>
    )
  }
}

export default Experience
