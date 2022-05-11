import React, { Component } from "react";
import { Button, Form, Input, Image } from "semantic-ui-react";
import "./Login.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

class Login extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      email: "",
      password: "",
    };

    this.validator = new SimpleReactValidator();
  }

  init = () => {
    this.token = localStorage.getItem("userToken");
    this.name = localStorage.getItem("userName");
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    if (this.validator.allValid()) {
      const { email, password } = this.state;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      axios({
        method: "post",
        url: "http://localhost:8000/api/login",
        data: formData,
      })
        .then((res) => {
          const nameUser = res.data.user.user_name;
          Swal.fire(
            "Hello " + nameUser,
            "You have been logged-in successfully",
            "success"
          ).then(() => {
            localStorage.setItem("userToken", res.data.token);
            localStorage.setItem("userName", nameUser);
            localStorage.setItem("userId", res.data.user.id);
            this.props.history.push("/");
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data.message,
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const {email, password} = this.state;
    return (
      <React.Fragment>
        <div className="div-login">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="login-container">
            <div className="div-logo">
              <Image src="/images/logo.png" size="medium" />
            </div>
            <Form onSubmit={this.handleSubmit} className="form-normal">
              <Form.Field className="div-field">
                <label>Email</label>
                <Input
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />

                {this.validator.message(
                  "email",
                  email,
                  "required|email",
                  { className: "text-danger validation" }
                )}
              </Form.Field>

              <Form.Field className="div-field">
                <label>Password</label>

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                {this.validator.message(
                  "password",
                  password,
                  "required",
                  { className: "text-danger validation" }
                )}
              </Form.Field>

              <Button className="form-button" type="submit">
                Login
              </Button>
              <div className="div-forgot-password">
                <span>Or</span>
                <a href="/password_reset">Forgot password?</a>
              </div>

              <div className="div-new-account">
                <span>Don't have an account?</span>
                <a href="/sign-up">Sign up</a>
              </div>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
