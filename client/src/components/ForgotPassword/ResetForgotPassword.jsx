import React, { Component } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Swal from "sweetalert2";

class ResetForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: ""
    };

  }


  handleResetLinkPassword = () => {
    const { email } = this.state;
    const formData = new FormData();
    formData.append("email", email);
    axios({
      method: "post",
      url: "http://localhost:8000/api/forgot-password",
      data: formData
    })
      .then((res) => {
        Swal.fire("Success", "We have sent the link, Please your mail !!!", "success");
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
            <Form onSubmit={this.handleResetLinkPassword} className="form-normal">
              <Form.Field>
                <label>Enter your user account's verified email address and we will send you a password reset link.</label>
                <Input
                  placeholder="Email"
                  name="email"
                  onChange={this.handleChange}
                />
              </Form.Field>
              

              <Button type="submit" className="form-button">
                Send password reset email
              </Button>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ResetForgotPassword;
