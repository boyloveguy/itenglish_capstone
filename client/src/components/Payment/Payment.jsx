import React, { Component } from "react";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import "./Payment.css";
import { Button } from "semantic-ui-react";
import { Row, Container, Col, Card, Footer } from "react-bootstrap";
import { Checkbox } from "semantic-ui-react";

class Payment extends Component {
  render() {
    return (
      <div className="pad-top-150">
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv />
        <Container className="div-payment">
          <Row className="text-center m-5">
            <h1>BEST Advice For Online English Classes With Private Teacher</h1>
          </Row>
          <Row>
            <Col>
              <Card className="text-center">
                <Card.Header>Classic</Card.Header>
                <Card.Body>
                  <Card.Title>
                    Our most a affordable plan to learn with professional
                    teacher.
                  </Card.Title>
                  <Card.Text>
                    <h2>$59 / month</h2>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="4 group lessons led by certified"
                        defaultChecked
                      />
                    </div>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="2000 lessons hours of interactive lessons "
                        defaultChecked
                      />
                    </div>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="5000+ lessons for grammar "
                        defaultChecked
                      />
                    </div>
                    <p>No commitment cancel anytime. 7 days free trial</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button secondary>Sign up now</Button>
                </Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card className="text-center">
                <Card.Header>Premium</Card.Header>
                <Card.Body>
                  <Card.Title>
                    For people who want to make maximum progress.
                  </Card.Title>
                  <Card.Text>
                    <h2>$180 / month</h2>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="Up to 8 Private Lessons led by certified teachers per month"
                        defaultChecked
                      />
                    </div>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="Up to 30 Group Lessons led by certified teachers per month"
                        defaultChecked
                      />
                    </div>
                    <div style={{ margin: "10px 50px", textAlign: "left" }}>
                      <Checkbox
                        label="2000 hours of interactive lessons with certification"
                        defaultChecked
                      />
                    </div>
                    <p>No commitment cancel anytime</p>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Button color='red'>Sign up now</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
          <Row className="text-center m-5">
            <h1>Why choose Premium?</h1>
          </Row>
         
            <Row>
                <Col></Col>
                <Col className="text-center" style={{fontWeight: "700"}}>Classis</Col>
                <Col className="text-center" style={{fontWeight: "700"}}>Premium</Col>
            </Row>
            <Row style={{margin: "10px 0"}}>
                <Col><h4>Live private classes</h4>
                <p>
                  Perfect your pronunciation and gain real confidence in your
                  spoken English with personalized, 40-minute online classes
                  with our quantified teachers.
                </p></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
            </Row>
            <Row style={{margin: "10px 0"}}>
                <Col><h4>Live group classes</h4>
                <p>
                  Participate in live small group sessions of students at your
                  level to practice conversation in real-life scenarios and
                  apply what you have learned. Speak english, interact with
                  others and experience the language.
                </p></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
            </Row>
            <Row style={{margin: "10px 0"}}>
                <Col><h4>Travel English</h4>
                <p>
                  Whether it's a short holiday, a global adventure or fresh
                  start, our Travel English course will help you develop
                  essential language skills to make you feel like you belong no
                  matter where your are.
                </p></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
            </Row>
            <Row style={{margin: "10px 0"}}>
                <Col><h4>Business English and job-specific courses</h4>
                <p>
                  Whatever you role, our real-world business English lessons wil
                  equip you with the hands-on, practical English skills you need
                  to succeed in your career.
                </p></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox /></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
            </Row>
            <Row style={{margin: "10px 0"}}>
                <Col>
                <h4>Certified Results</h4>
                <p>
                  Receive a certified diploma each time you complete one of our
                  16 levels aligned with the CEFR framework.
                </p></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox /></Col>
                <Col className="text-center" style={{marginTop: "40px"}}><Checkbox defaultChecked /></Col>
            </Row>
           
          
        </Container>
        <div
            style={{
                textAlign: 'center',
                paddingTop: 80,
                paddingBottom: 20
            }}
        >
            <p>© ITEnglish Copyright 2022</p>
        </div>
      </div>
    );
  }
}

export default Payment;
