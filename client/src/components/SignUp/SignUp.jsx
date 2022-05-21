import React, { Component } from "react";
import { Button, Form, Input, Select, Loader, Image } from "semantic-ui-react";
import "./SignUp.css";
import { Helmet } from "react-helmet";
import "react-datepicker/dist/react-datepicker.css";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import axios from "axios";
import FormData from "form-data";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import SimpleReactValidator from "simple-react-validator";

const cookies = new Cookies();

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
    this.handleButtonModal = this.handleButtonModal.bind(this);
    // this.validate           = this.validate.bind(this);

    this.state = {
      username: "",
      f_name: "",
      l_name: "",
      b_day: "",
      email: "",
      password: "",
      conf_pass: "",
      role: "",
      message: "",
      showMsg: false,
      isLoading: false,
      modal_btn: "Go to Home page",
      modal_btn_succes: "",
      role_options: [],
    };

    this.validator = new SimpleReactValidator();
  }

  fetchData() {
    fetch("http://localhost:8000/api/get_roles")
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          role_options: data.list_roles,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  }

  handleChangeDate = (e, data) => {
      const value = data.value
    this.setState({
        b_day: value
    })
  };

  handleChangeSelect = (e, data) => {
    this.setState({
        role: data.value
    })
  };

  onActionClick = (e, data) => {
    this.setState({
      showMsg: false,
    });
  };

  handleButtonModal() {
    if (this.state.modal_btn == "Cancel") {
      this.setState({
        showMsg: false,
      });
    } else {
      this.setState({
        modal_btn_success: "/home",
      });
    }
  }

  handleSignUp(e) {
    
    if (this.validator.allValid()) {
      this.setState({
        isLoading: true,
      });
      let formData = new FormData();
      formData.append("username", this.state.username);
      formData.append("f_name", this.state.f_name);
      formData.append("l_name", this.state.l_name);
      formData.append("b_day", this.state.b_day);
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);
      formData.append("role", this.state.role);
      formData.append("conf_pass", this.state.conf_pass);

      const url = "http://localhost:8000/api/sign_up";
      axios({
        method: "POST",
        url: url,
        dataType: "jsonp",
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          },
        },
      })
        .then((response) => {
          var result = response.data.success;
          this.setState({
            isLoading: false,
          });
          if (result) {
            let user_id = response.data.user_id;
            let user_name = response.data.user_name;
            let user_role = response.data.user_role;
            // cookies.set("user_id", user_id, { path: "" });
            // cookies.set("user_name", user_name, { path: "" });
            // cookies.set("user_role", user_role, { path: "" });

            Swal.fire({
              title: response.data.message,
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Go to Home Page",
            }).then((results) => {
              if (results.isConfirmed) {
                window.location.href = `/login`;
              }
            });
          } else {
            Swal.fire({
              title: "Oops...",
              text: response.data.message,
              icon: "error",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Oops...",
            text: "Server has problem! Please try another time.",
            icon: "error",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const {
      username,
      f_name,
      l_name,
      b_day,
      email,
      password,
      conf_pass,
      role,
    } = this.state;
    return (
      <React.Fragment>
        <div className="div-sign-up">
          <Helmet>
            <title>ITEnglish | Sign-up</title>
          </Helmet>
          <Loader active={this.state.isLoading} size="big" />
          <div className="sign-up-container">
            <Form>
              <div className="div-field">
                <Form.Field
                  name="username"
                  label="User Name"
                  control={Input}
                  placeholder="User Name"
                  onChange={this.handleChange}
                  maxLength="50"
                  value={username}
                />
                {this.validator.message("user name", username, "required", {
                  className: "text-danger sign-up-validation",
                })}
              </div>
              <Form.Group widths={2}>
                <div
                  className="div-field"
                  style={{
                    width: "50%",
                    marginRight: "50px",
                    marginLeft: "7px",
                  }}
                >
                  <Form.Field
                    name="f_name"
                    label="First name"
                    control={Input}
                    placeholder="First name"
                    onChange={this.handleChange}
                    maxLength="50"
                    value={f_name}
                  />
                  {this.validator.message("first name", f_name, "required", {
                    className: "text-danger sign-up-validation",
                  })}
                </div>
                <div
                  className="div-field"
                  style={{ width: "50%", marginRight: "7px" }}
                >
                  <Form.Field
                    name="l_name"
                    label="Last name"
                    control={Input}
                    placeholder="Last name"
                    onChange={this.handleChange}
                    maxLength="50"
                    value={l_name}
                  />
                  {this.validator.message("last name", l_name, "required", {
                    className: "text-danger sign-up-validation",
                  })}
                </div>
              </Form.Group>
              <Form.Group widths={2}>
                <div
                  className="div-field b_day"
                  style={{
                    width: "50%",
                    marginRight: "50px",
                    marginLeft: "7px",
                  }}
                >
                  <SemanticDatepicker
                    label="Birth Day"
                    format="YYYY/MM/DD"
                    onChange={this.handleChangeDate.bind(this)}
                    showToday={true}
                    allowOnlyNumbers={true}
                    datePickerOnly={true}
                    className="b_day field-input"
                    placeholder="YYYY/MM/DD"
                    maxLength="10"
                    value={b_day}
                  />
                  {this.validator.message("birthday", b_day, "required", {
                    className: "text-danger sign-up-validation",
                  })}
                </div>
                <div
                  className="div-field"
                  style={{ width: "50%", marginRight: "7px" }}
                >
                  <Form.Field
                    label="Email"
                    control={Input}
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={this.handleChange}
                    maxLength="100"
                    value={email}
                  />
                  {this.validator.message("email", email, "required|email", {
                    className: "text-danger sign-up-validation",
                  })}
                </div>
              </Form.Group>
              <Form.Group widths={2}>
                <div
                  className="div-field"
                  style={{
                    width: "50%",
                    marginRight: "50px",
                    marginLeft: "7px",
                  }}
                >
                  <Form.Field
                    label="Password"
                    control={Input}
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    type="password"
                    maxLength="10"
                    value={password}
                  />
                  {this.validator.message("password", password, "required", {
                    className: "text-danger sign-up-validation",
                  })}
                </div>
                <div
                  className="div-field"
                  style={{ width: "50%", marginRight: "7px" }}
                >
                  <Form.Field
                    label="Confirm password"
                    control={Input}
                    name="conf_pass"
                    placeholder="Confirm password"
                    onChange={this.handleChange}
                    type="password"
                    maxLength="10"
                    value={conf_pass}
                  />
                  {this.validator.message(
                    "Confirm password",
                    conf_pass,
                    "required",
                    {
                      className: "text-danger sign-up-validation",
                    }
                  )}
                </div>
              </Form.Group>
              <div className="div-field">
                <Form.Field
                  label="Register as"
                  control={Select}
                  placeholder='Select role'
                  name="role"
                  defaultValue={"2"}
                  onChange={this.handleChangeSelect.bind(this)}
                  options={this.state.role_options}
                  className="role"
                  value={role}
                />
                {this.validator.message("role", role, "required", {
                  className: "text-danger sign-up-validation role",
                })}
              </div>
              <div className="div-button">
                {/* <Form.Checkbox label='I agree to the Terms and Conditions' required/> */}
                <Button
                  onClick={this.handleSignUp}
                  type="submit"
                  className="btn-register"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;
