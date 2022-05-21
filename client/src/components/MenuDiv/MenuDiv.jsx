import React, { Component } from "react";
import { Menu, Dropdown, Image, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./MenuDiv.css";
import Cookies from "universal-cookie";
import MenuAuth from "./MenuAuth";

const cookies = new Cookies();

class MenuDiv extends Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);

    this.state = {
      activeItem: this.props.activeItem,
      user_id: cookies.get("user_id"),
      user_name: cookies.get("user_name"),
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div>
        <Menu pointing secondary inverted className="menu-div" fixed="top">
          <Image src="/images/logo.png" size="medium" className="logo-image" />
          <Menu.Item
            name="home"
            active={this.props.activeItem === "home"}
            onClick={this.handleItemClick}
            className="pad-bot-26"
            as={Link}
            to="/home"
          />
          <Dropdown
            item
            text="Learn"
            className={
              "pad-bot-26" +
              " " +
              (this.props.activeItem === "learn" ? "active" : "")
            }
            active={this.props.activeItem === "learn"}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/vocabulary"
                onClick={this.handleItemClick}
                name="learn"
              >
                Vocabulary
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/class"
                onClick={this.handleItemClick}
                name="learn"
              >
                Join a class room
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to="/video"
                onClick={this.handleItemClick}
                name="learn"
              >
                Video Call
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name="exams and tests"
            active={this.props.activeItem === "exams and tests"}
            onClick={this.handleItemClick}
            className="pad-bot-26"
            as={Link}
            to="/exam"
          />
          <Menu.Item
            name="rank"
            active={this.props.activeItem === "rank"}
            onClick={this.handleItemClick}
            as={Link}
            to="/rank-board"
            className="pad-bot-26"
          />
          <Menu.Menu position="right" className="pad-bot-10">
            <Menu.Item>
              <i class="user circle icon"></i>
            </Menu.Item>
            <MenuAuth />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default MenuDiv;
