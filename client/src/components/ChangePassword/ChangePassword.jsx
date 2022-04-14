import React, { Component } from "react";
import { Button, Form, Input, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";
import Validator from "../../utils/validator";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.init();
    this.state = {
      current_password: "",
      new_password: "",
      new_confirm_password: "",
      password: "",
      errors: {},
    };

    const requiredWith = (value, field, state) =>
      (!state[field] && !value) || !!value;
    const rules = [
      {
        field: "current_password",
        method: "isEmpty",
        validWhen: false,
        message: "The current password field is required.",
      },
      {
        field: "new_password",
        method: "isEmpty",
        validWhen: false,
        message: "The new password field is required.",
      },
      {
        field: "new_confirm_password",
        method: "isEmpty",
        validWhen: false,
        message: "The new confirm password field is required.",
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
    this.setState({
      errors: this.validator.validate(this.state),
    });

    const { current_password, new_password, new_confirm_password } = this.state;
    const formData = new FormData();
    formData.append("current_password", current_password);
    formData.append("new_password", new_password);
    formData.append("new_confirm_password", new_confirm_password);

    axios({
      method: "post",
      url: "http://localhost:8000/api/change-password",
      data: formData,
    }).then((res) => {
      Swal.fire("Success", "Password change successfully.", "success");
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div className="div-login">
          <Helmet>
            <title>Update Password</title>
          </Helmet>
          <div className="login-container">
            <div className="div-logo">
              <Image src="/images/logo.png" size="medium" />
            </div>
            <Form onSubmit={this.handleSubmit} className="form-normal">
              <Form.Field className="div-field">
                <label>Current Password</label>
                <Input
                type="password"
                  name="current_password"
                  onChange={this.handleChange}
                />

                {errors.current_password && (
                  <div className="validation" style={{ display: "block" }}>
                    {errors.current_password}
                  </div>
                )}
              </Form.Field>

              <Form.Field className="div-field">
                <label>New Password</label>

                <Input
                  type="password"
                  name="new_password"
                  onChange={this.handleChange}
                />
                {errors.new_password && (
                  <div className="validation" style={{ display: "block" }}>
                    {errors.new_password}
                  </div>
                )}
              </Form.Field>

              <Form.Field className="div-field">
                <label>New Confirm Password</label>

                <Input
                  type="password"
                  name="new_confirm_password"
                  onChange={this.handleChange}
                />
                {errors.new_confirm_password && (
                  <div className="validation" style={{ display: "block" }}>
                    {errors.new_confirm_password}
                  </div>
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

export default ChangePassword;
