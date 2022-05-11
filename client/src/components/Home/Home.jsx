import React, { Component } from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "./Home.css";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      activeItem: "home",
      user_id: cookies.get("user_id"),
      user_name: cookies.get("user_name"),
      user_role: cookies.get("user_role"),
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div>
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv activeItem={this.state.activeItem} />
        <Carousel fade className="pad-top-70">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/carousel_banner_11440x400px.jpg"
              alt="Connect everyone"
            />
            <Container>
              <Row>
                <Col sm={5}>
                  <Carousel.Caption>
                    <h1>Connect everyone</h1>
                    <h3>
                      Exchange experiences with the IT community in English.
                    </h3>
                  </Carousel.Caption>
                </Col>
                <Col sm={7}></Col>
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/student-with-headphones-learning-at-home_carousel.jpg"
              alt="Always Learning"
            />
            <Container>
              <Row>
                <Col sm={5}>
                  <Carousel.Caption>
                    <h1>Always Learning</h1>
                    <h3>
                      Help you expand your specialized vocabulary knowledge
                      through fun and practical tests.
                    </h3>
                  </Carousel.Caption>
                </Col>
                <Col sm={7}></Col>
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/teaching-at-home-carousel.jpg"
              alt="Lots of variety of Exams"
            />
            <Container>
              <Row>
                <Col sm={5}>
                  <Carousel.Caption>
                    <h1>Lots of variety of Exams</h1>
                    <h3>
                      Challenge yourself every day through ITEnglish will help
                      you develop yourself.
                    </h3>
                  </Carousel.Caption>
                </Col>
                <Col sm={7}></Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>

        <Container className="pad-top-50">
          <Row>
            <Col sm={5}>
              <img
                className="d-block w-100"
                src="/images/intro_content1.jpg"
                alt="Improve your Vocabulary"
              />
            </Col>
            <Col sm={7} className="pad-top-50">
              <h3>Improve your Vocabulary</h3>
              <h4>
                You can learn all the vocabulary used in your major, imporving
                your understanding and in-depth vocabulary. We also provide the
                function of contributing new words from users to improve the
                richer vocabulary.
              </h4>
              <p>
                Vocabulary plays an important part in learning to read.
                Beginning readers must use the words they hear orally to make
                sense of the words they see in print.
              </p>
              <Button variant="outline-secondary" className="btn-go">
                Go
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className="pad-top-50">
          <Row>
            <Col sm={7} className="pad-top-50">
              <h3>Join a classroom</h3>
              <h4>
                We support users to open online teaching so that users in need
                can join a class. They can improve their specialized English for
                many different purposes.
              </h4>
              <p>
                Most online teaching opportunities provide work as an
                independent contractor. What this means is that there are no set
                hours and you can work as much or as little as you wish. Of
                course, that's also the catch—often there is little work to be
                had.
              </p>
              <Button variant="outline-secondary" className="btn-go">
                Go
              </Button>
            </Col>
            <Col sm={5}>
              <img
                className="d-block w-100"
                src="/images/intro_content2.jpg"
                alt="Improve your Vocabulary"
              />
            </Col>
          </Row>
        </Container>
        <Container className="pad-top-50">
          <Row>
            <Col sm={5}>
              <img
                className="d-block w-100"
                src="/images/intro_content3.jpg"
                alt="Improve your Vocabulary"
              />
            </Col>
            <Col sm={7} className="pad-top-50">
              <h3>Video with strangers</h3>
              <h4>
                You can also join a video call with a strangers. People can talk
                to each other about their major of study, works, companies...
                related to IT or whatever they like in English.
              </h4>
              <p>
                Learn by Chatting! The best way to learn a language is to
                actually speak it! ITEnglish connects you with IT speakers to
                chat with for free.
              </p>
              <Button variant="outline-secondary" className="btn-go">
                Go
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className="pad-top-50 pad-bot-50">
          <Row>
            <Col sm={7} className="pad-top-50">
              <h3>Check your English</h3>
              <h4>
                Try our quick, free online tests to find out what your level of
                English is. There are test suited for every level, and at the
                end, you will get recommendations on how to improve your
                English.
              </h4>
              <p>
                This online level test will give you an approximate indication
                of your English proficiency level. You can use the result to
                help you find content on our website that is appropriate for
                your English language ability.
              </p>
              <Button variant="outline-secondary" className="btn-go">
                Go
              </Button>
            </Col>
            <Col sm={5}>
              <img
                className="d-block w-100"
                src="/images/intro_content4.jpg"
                alt="Improve your Vocabulary"
              />
            </Col>
          </Row>
        </Container>
        <Container className="pad-bot-10">
          <hr
            style={{
              color: "gray",
              backgroundColor: "gray",
              height: 1,
            }}
          />
          <Row className="pad-top-50">
            <Col sm={7}>
              <iframe
                className="gg-map"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed/v1/place?q=254+Nguyễn+Văn+Linh,+Thạc+Gián,+Thanh+Khê,+Đà+Nẵng+550000,+Việt+Nam&key=AIzaSyAYf80GEP62ehWfth8u9IarLq3Jp4lb-50"
              ></iframe>
              <br />
            </Col>
            <Col sm={5} className="pad-top-100">
              <h3>Contact us</h3>
              <p>Contact us and we'll get back to you within 24 hours.</p>
              <p>
                <i class="map marker alternate icon"></i>254 Nguyen Van Linh, Da
                Nang, Viet Nam
              </p>
              <p>
                <i class="phone icon"></i>(+84) 0123456789
              </p>
              <p>
                <i class="envelope icon"></i>itenglish@gmail.com
              </p>
            </Col>
          </Row>
          <hr
            style={{
              color: "gray",
              backgroundColor: "gray",
              height: 1,
            }}
          />
          <div
            style={{
              textAlign: "center",
              paddingTop: 80,
              paddingBottom: 20,
            }}
          >
            <p>© ITEnglish Copyright 2022</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
