import React, { Component } from "react";
import { Button, Form, Input, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import "./ChangePassword.css";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      password: "",
      new_password: "",
      new_confirm_password: "",
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
      const { password, new_password, new_confirm_password } =
        this.state;
      const formData = new FormData();
      formData.append("password", password);
      formData.append("new_password", new_password);
      formData.append("new_confirm_password", new_confirm_password);

      axios({
        method: "post",
        url: "http://localhost:8000/api/change-password",
        data: formData,
      }).then(() => {
        Swal.fire("Success", "Password change successfully.", "success");
        this.props.history.push("/");
      }).catch(() =>{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Some thing wrong",
        });
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const { password, new_password, new_confirm_password } = this.state;
    return (
      <React.Fragment>
        <div className="div-login">
          <Helmet>
            <title>Update Password</title>
          </Helmet>
          <div className="change-password-container">
            <div className="div-logo">
              <Image src="/images/logo.png" size="medium" />
            </div>
            <Form onSubmit={this.handleSubmit} className="form-normal">
              <Form.Field className="div-field">
                <label>Current Password</label>
                <Input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={password}
                />

                {this.validator.message(
                  "password",
                  password,
                  "required",
                  { className: "text-danger validation" }
                )}
              </Form.Field>

              <Form.Field className="div-field">
                <label>New Password</label>

                <Input
                  type="password"
                  name="new_password"
                  onChange={this.handleChange}
                  value={new_password}
                />
                {this.validator.message(
                  "new_password",
                  new_password,
                  "required",
                  { className: "text-danger validation" }
                )}
              </Form.Field>

              <Form.Field className="div-field">
                <label>New Confirm Password</label>

                <Input
                  type="password"
                  name="new_confirm_password"
                  onChange={this.handleChange}
                  value={new_confirm_password}
                />
                {this.validator.message(
                  "new_confirm_password",
                  new_confirm_password,
                  "required",
                  { className: "text-danger validation" }
                )}
              </Form.Field>

              <Button className="form-button" type="submit">
                Save change
              </Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ChangePassword);
