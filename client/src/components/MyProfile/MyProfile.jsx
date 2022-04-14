import React, { Component } from "react";
import { ListGroup, Card, Row, Col, Button, Form } from "react-bootstrap";
import "./MyProfile.css";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import Validator from "../../utils/validator";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      first_name: "",
      last_name: "",
      birthday: "",
      email: "",
      role: 0,
      password: "",
      name: "",
      password_confirmation: "",
      avatar: null,
      imagePreviewUrl: "",
      errors: {},
    };

    const requiredWith = (value, field, state) =>
      (!state[field] && !value) || !!value;
    const rules = [
      {
        field: "first_name",
        method: "isEmpty",
        validWhen: false,
        message: "The first name field is required.",
      },
      {
        field: "last_name",
        method: "isEmpty",
        validWhen: false,
        message: "The last name field is required.",
      },
      {
        field: "birthday",
        method: "isEmpty",
        validWhen: false,
        message: "The birthday field is required.",
      },
      {
        field: "message",
        method: requiredWith,
        args: ["subject"],
        validWhen: true,
        message: "The message field is required when subject is present.",
      },
    ];
    this.validator = new Validator(rules);
  }
  state = { activeItem: "home" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/user/" + localStorage.getItem("userId"))
      .then((res) => {
        this.setState({
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
          name: res.data.user.name,
          birthday: res.data.user.birthday,
          email: res.data.user.email,
          role: res.data.user.role_id,
          password: res.data.user.password,
          password_confirmation: res.data.user.password,
          avatar: res.data.user.avatar,
        });
      })
      .catch((error) => {
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
    let avatar = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        avatar: avatar,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(avatar);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    debugger
    this.setState({
      errors: this.validator.validate(this.state),
    });
    const {
      first_name,
      last_name,
      password,
      birthday,
      password_confirmation,
      avatar,
    } = this.state;

    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("name", first_name + " " + last_name);
    formData.append("birthday", birthday);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    formData.append("avatar", avatar);

    axios({
      method: "post",
      url: "http://localhost:8000/api/user/" + localStorage.getItem("userId"),
      data: formData,
    })
      .then((res) => {
        localStorage.setItem("userName", first_name + " " + last_name);
        Swal.fire(
          "Success",
          "You have been update successfully",
          "success"
        ).then(function() {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  previewImage = () => {
    const { avatar, imagePreviewUrl } = this.state;
    if (imagePreviewUrl !== "") {
      return <img src={imagePreviewUrl} />;
    } else {
      if (avatar !== "") {
        return <img src={"http://localhost:8000/img/" + avatar} />;
      } else {
        return (
          <div className="previewText">Please select an Image for Preview</div>
        );
      }
    }
  };

  render() {
    const {
      first_name,
      last_name,
      birthday,
      email,
      password,
      name,
      password_confirmation,
      errors,
    } = this.state;
    return (
      <div className="div-my-profile">
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv />
        <Form className="form-my-profile" onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={4} className="div-left-4">
              <Row className="justify-content-sm-center">
                <h4>{name}</h4>
                <div className="div-img">{this.previewImage()}</div>
                <div className="div-input">
                  <Form.Group>
                    <Form.Control
                      type="file"
                      name="avatar"
                      onChange={this.handleChangeFile}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Row>

              <Card className="text-center">
                <ListGroup variant="flush">
                  <ListGroup.Item>Raking</ListGroup.Item>
                  <ListGroup.Item>Total exams</ListGroup.Item>
                  <ListGroup.Item>Class enttended</ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8} className="div-right-8">
              <Row>
                <Form.Group as={Col} controlId="first_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={first_name}
                    name="first_name"
                    onChange={this.handleChange}
                  />
                  {errors.first_name && (
                    <div
                      className="profile-validation"
                      style={{ display: "block" }}
                    >
                      {errors.first_name}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={last_name}
                    name="last_name"
                    onChange={this.handleChange}
                  />
                  {errors.last_name && (
                    <div
                      className="profile-validation"
                      style={{ display: "block" }}
                    >
                      {errors.last_name}
                    </div>
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="birthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    name="birthday"
                    onChange={this.handleChange}
                  />
                  {errors.birthday && (
                    <div
                      className="profile-validation"
                      style={{ display: "block" }}
                    >
                      {errors.birthday}
                    </div>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="role">
                  <Form.Label>Register as</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    onChange={this.handleChange}
                  >
                    <option>Admin</option>
                    <option>Customer</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} controlId="password_confirmation">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password_confirmation}
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
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
