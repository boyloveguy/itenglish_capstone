import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./MenuDiv.css";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { FaLock } from "react-icons/fa";


class MenuAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/user")
      .then((res) => {
        this.setState({
          user_name: res.data.user.user_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogout = () => {
    axios({
      method: "post",
      url: "http://localhost:8000/api/logout",
    })
      .then(() => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");

        Swal.fire(
          "Success",
          "You have been logged-out successfully",
          "success"
        );
        this.props.history.push("/login");
      })
      .catch((err) => {});
  };

  render() {
    if (this.state.user_name) {
      return (
        <>
          <Dropdown item text={this.state.user_name} className="user-name-menu">
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="user icon"></i>
                <Link
                  to={"/user"}
                  className="my-profile"
                >
                  My Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <FaLock />
                <Link to={"/change_password"} className="p-2 my-profile">
                  Change Password
                </Link>
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
