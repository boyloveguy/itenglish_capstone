import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./MenuDiv.css";
import axios from "axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/fontawesome-free-solid'

class MenuAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
    };
  }

  redirectDashboard = () => {
    this.setState({ redirect: true });
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/user/" + localStorage.getItem("userId"))
      .then((res) => {
        this.setState({
          first_name: res.data.user.first_name,
          last_name: res.data.user.last_name,
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
    const { first_name, last_name } = this.state;
    if (localStorage.getItem("userToken")) {
      return (
        <>
          <Menu.Item>
            <i className="user circle icon"></i>
          </Menu.Item>
          <Dropdown
            item
            text={first_name + " " + last_name}
            className="user-name-menu"
          >
            <Dropdown.Menu>
              <Dropdown.Item>
                <i className="user icon"></i>
                <Link
                  to={"/user/" + localStorage.getItem("userId")}
                  className="my-profile"
                >
                  My Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
              <FontAwesomeIcon icon={faLock} />
                <Link
                  to={"/change_password"}
                  
                  className="p-2 my-profile"
                >
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
