import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./MenuDiv.css";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

class MenuAuth extends Component {
  constructor(props) {
    super(props);
  }
  redirectDashboard = () => {
    this.setState({ redirect: true });
  };

  handleLogout = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/logout",
    })
      .then((res) => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        Swal.fire(
          "Success",
          "You have been logged-out successfully",
          "success"
        );
        this.props.history.push("/");
      })
      .catch((err) => {});
  };
  render() {
    if (localStorage.getItem("userToken")) {
      return (
        <>
          <Menu.Item>
            <i className="user circle icon"></i>
          </Menu.Item>
          <Dropdown item text={localStorage.getItem("userName")} className="user-name-menu">
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="user icon"></i>My Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="arrow left icon"></i>
                <Button
                  className="btn-sign-out"
                  type="submit"
                  onClick={this.handleLogout}
                >
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    } else {
      return (
        <>
          <Menu.Item as={Link} name="Login" to="/login">
            Login
          </Menu.Item>
          <Menu.Item as={Link} name="Register" to="/sign-up">
            Register
          </Menu.Item>
        </>
      );
    }
  }
}
export default withRouter(MenuAuth);
