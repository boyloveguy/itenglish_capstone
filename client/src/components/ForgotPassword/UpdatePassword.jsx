import React, { Component } from "react";
import { Button, Form, Input, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
    };
  }

  updatePassword = () => {
    const { email, password, password_confirmation } = this.state;
    const formData = new FormData();
    const token = window.location.pathname.split("/")[2];
    formData.append("token", token);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);
    axios({
      method: "post",
      url: "http://localhost:8000/api/reset-password",
      data: formData,
    })
      .then((res) => {
        Swal.fire("Success", "Password reset successfully", "success").then(
          () => {
            this.props.history.push("/login");
          }
        );
      })
      .catch((err) => {});
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="div-login">
          <Helmet>
            <title>Reset your password</title>
          </Helmet>
          <div className="login-container">
          <div className="div-logo">
              <Image src="/images/logo.png" size="medium" />
            </div>
            <Form onSubmit={this.updatePassword} className="form-login">
              <Form.Field>
                <Input type="hidden" name="token" />
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
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <div id="label">
                  <label>Confirm Password</label>
                </div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button type="submit" className="form-button">Submit</Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(UpdatePassword);
