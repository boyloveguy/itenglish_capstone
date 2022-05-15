import React, { Component } from "react";
import { ListGroup, Card, Row, Col, Button, Form } from "react-bootstrap";
import "./MyProfile.css";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { Loader } from "semantic-ui-react";
import SimpleReactValidator from "simple-react-validator";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_avatar: null,
      user_fname: "",
      user_lname: "",
      user_birthday: "",
      email: "",
      role: 0,
      password_confirmation: "",
      user_avatar: null,
      imagePreviewUrl: "",
      total_exam: "",
      ranking: "",
      isLoading: true,
      name: "",
    };

    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/user")
      .then((res) => {
        this.setState({
          user_fname: res.data.user.user_fname,
          user_lname: res.data.user.user_lname,
          user_birthday: res.data.user.user_birthday,
          email: res.data.user.email,
          role: res.data.user.role_id,
          user_avatar: res.data.user.user_avatar,
          total_exam: res.data.total_exam,
          ranking: res.data.ranking,
          isLoading: false,
          name: res.data.user.user_fname + " " + res.data.user.user_lname,
        });
      })
      .catch((error) => {
        this.state({
          isLoading: false,
        });
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeFile = (event) => {
    let reader = new FileReader();
    let user_avatar = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        user_avatar: user_avatar,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(user_avatar);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { user_fname, user_lname, user_birthday, user_avatar } = this.state;

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("user_fname", user_fname);
      formData.append("user_lname", user_lname);
      formData.append("user_birthday", user_birthday);
      formData.append("user_avatar", user_avatar);

      axios({
        method: "post",
        url: "http://localhost:8000/api/user",
        data: formData,
      })
        .then((res) => {
          
          const name = res.data.user.user_fname + " " + res.data.user.user_lname;
          this.setState({
            name: name,
          });
          Swal.fire("Success", "You have been update successfully", "success");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something wrong",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  previewImage = () => {
    const { user_avatar, imagePreviewUrl } = this.state;
    if (imagePreviewUrl !== "") {
      return <img src={imagePreviewUrl} />;
    } else {
      if (user_avatar !== "") {
        return <img src={"http://localhost:8000/img/" + user_avatar} />;
      } else {
        return (
          <div className="previewText">Please select an Image for Preview</div>
        );
      }
    }
  };

  render() {
    const {
      user_fname,
      user_lname,
      user_birthday,
      email,
      total_exam,
      ranking,
      isLoading,
      name,
    } = this.state;
    return (
      <div className="div-my-profile">
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv />
        <Loader active={isLoading} size="big" />
        <Form className="form-my-profile" onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={4} className="div-left-4">
              <Row className="justify-content-sm-center">
                <h3>{name}</h3>
                <div className="div-img">{this.previewImage()}</div>
                <div className="div-input">
                  <Form.Group>
                    <Form.Control
                      type="file"
                      name="user_avatar"
                      onChange={this.handleChangeFile}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Row>

              <Card className="text-center">
                <ListGroup variant="flush">
                  <ListGroup.Item className="group-data">
                    <p className="text-data">Ranking</p>
                    <p className="data">{ranking}</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="group-data">
                    <p className="text-data">Total exams</p>
                    <p className="data">{total_exam}</p>
                  </ListGroup.Item>
                  <ListGroup.Item className="group-data">
                    {" "}
                    <p className="text-data">Class entended</p>
                    <span className="data">1</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8} className="div-right-8">
              <Row>
                <Form.Group as={Col} controlId="user_fname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user_fname}
                    name="user_fname"
                    onChange={this.handleChange}
                  />
                  {this.validator.message(
                    "user_fname",
                    user_fname,
                    "required",
                    { className: "text-danger profile-validation" }
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="user_lname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={user_lname}
                    name="user_lname"
                    onChange={this.handleChange}
                  />
                  {this.validator.message(
                    "user_lname",
                    user_lname,
                    "required",
                    { className: "text-danger profile-validation" }
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="user_birthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={user_birthday}
                    name="user_birthday"
                    onChange={this.handleChange}
                  />
                  {this.validator.message(
                    "user_birthday",
                    user_birthday,
                    "required",
                    { className: "text-danger profile-validation" }
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} disabled />
                </Form.Group>
              </Row>
              
              <Row className="justify-content-sm-center">
                <Col sm lg="2">
                  <Button className="button-my-profile" type="submit">
                    Save change
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default MyProfile;
