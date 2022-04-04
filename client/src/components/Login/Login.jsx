import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import "./Login.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter, Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      email: "",
      password: "",
    };
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
        const nameUser = res.data.user.name;
        Swal.fire(
          "Hello " + nameUser,
          "You have been logged-in successfully",
          "success"
        ).then(() => {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userName", res.data.user.name);
          this.props.history.push("/dashboard");
        });
      })
      .catch(() => {
        Swal.fire(
          "Unauthenticated!!!",
          "You have been logged-in fail",
          "error"
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="div-login">
          <Helmet>
            <title>Login</title>
          </Helmet>
          <div className="login-container">
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <Input
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <div id="label">
                  <label>Password</label>
                  <a id="forgot-password" href="/">
                    Forgot password?
                  </a>
                </div>

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Button id="button-login" type="submit">
                Login
              </Button>
              <p id="new-account">
                New to account? <a href="/sign-up">Create an account</a>.
              </p>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
