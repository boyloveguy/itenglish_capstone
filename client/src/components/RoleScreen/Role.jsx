import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Checkbox,
  Table,
  Loader,
  Label,
  Input,
} from "semantic-ui-react";
import "./Role.css";
import { Helmet } from "react-helmet";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_role: [],
      role_id: "",
      role_name: "",
      accessible_screen: [],
      description: "",
      role_desc: "",
      screen_ids: [],
      screen_id: "",
      screen_name: "",
      related_screen: "",
      isLoading: true,
      screen_option: [],
      selected_id: "",
      selected_name: "",
      screen_value: "",
      old_role_name: "",
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8000/api/roles",
    })
      .then((res) => {
        this.setState({
          isLoading: false,
          list_role: res.data.roles,
          accessible_screen: res.data.data,
          screen_option: res.data.screen,
          role_id: res.data.role.role_id,
          role_desc: res.data.role.role_desc,
          role_name: res.data.role.role_name,
        });
      })
      .catch(() => {
        this.props.history.push("/")
      });
  }

  addFormFields = () => {
    const { selected_name, selected_id, accessible_screen } = this.state;
    if (selected_id === "") {
      this.setState({
        accessible_screen: [...accessible_screen],
      });
    } else {
      const selected_object = {
        screen_id: selected_id,
        screen_name: selected_name,
      };
      const screens = accessible_screen;
      screens.push(selected_object);

      this.setState({
        accessible_screen: [
          ...screens.filter(
            (value1, index, self) =>
              self.findIndex(
                (value2) => value2.screen_id === value1.screen_id
              ) === index
          ),
        ],
      });
    }
  };

  handleSelectChange = (e) => {
    this.setState({
      selected_id: e.target.value,
      screen_id: e.target.value,
    });
  };

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  setSelectedName = (e) => {
    this.setState({
      selected_name: e.currentTarget.dataset.name,
    });
  };

  onChangeRole = (e, data) => {
    this.setState({
      role_id: data.value,
      old_role_name: data.label,
    });
    axios({
      method: "get",
      url: "http://localhost:8000/api/screen/" + data.value,
    }).then((res) => {
      this.setState({
        accessible_screen: res.data.data,
        role_desc: res.data.role.role_desc,
        role_name: res.data.role.role_name,
      });
    });
  };

  addNewRole = () => {
    this.setState({
      accessible_screen: [],
      role_desc: "",
      role_name: "",
      role_id: "",
    });
  };

  removeRoleScreen = (e) => {
    const { accessible_screen, role_id } = this.state;
    const screen_id = e.currentTarget.dataset.screenId;

    const params = new URLSearchParams();
    params.append("screen_id", screen_id);
    params.append("role_id", role_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed === true) {
        axios({
          method: "delete",
          url: "http://localhost:8000/api/remove",
          params: params,
        }).then((res) => {
          this.setState({
            accessible_screen: [
              ...accessible_screen.filter(
                (screen) => screen.screen_id !== parseInt(screen_id)
              ),
            ],
          });
          Swal.fire("Success", res.data.message, "success");
        });
      }
    });
  };

  handleSubmit = () => {
    const {
      role_id,
      accessible_screen,
      role_name,
      role_desc,
    } = this.state;
    const screen_ids = accessible_screen.map((screen) => screen.screen_id);
    const formData = new FormData();
    formData.append("role_id", role_id);
    formData.append("role_name", role_name);
    formData.append("role_desc", role_desc);
    formData.append("screen_ids", JSON.stringify(screen_ids));

    axios({
      method: "post",
      url: "http://localhost:8000/api/set_role_access",
      data: formData,
    }).then((res) => {
      Swal.fire("Success", res.data.message, "success");

        this.setState({
        role_id: res.data.role.role_id,
        list_role: res.data.roles
        });
    });
  };

  render() {
    const {
      role_id,
      isLoading,
      screen_option,
      accessible_screen,
      screen_id,
      role_desc,
      role_name,
    } = this.state;
    return (
      <React.Fragment>
        <Loader active={isLoading} size="big" />
        <div className="div-role pad-top-150">
          <Helmet>
            <title>ITEnglish | Role</title>
          </Helmet>
          <MenuDiv activeItem="home" />
          <Container className="div-role-detail">
            <Row>
              <Col sm={4}>
                <div style={{ textAlign: "center" }}>
                  <label className="list-role">List role</label>
                </div>
                <Table
                  celled
                  label="Accessible screen(s)"
                  className="div-role-table"
                >
                  <Table.Body>
                    {this.state.list_role.map((role) => {
                      return (
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              label={role.role_name}
                              value={role.role_id}
                              onChange={(e, data) => this.onChangeRole(e, data)}
                              checked={role.role_id === role_id ? true : false}
                            />
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                <div style={{ textAlign: "center" }}>
                  <Button onClick={this.addNewRole}>+</Button>
                  <label>Add new</label>
                </div>
              </Col>
              <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Role Name</label>
                    <input
                      placeholder="Role Name"
                      value={role_name}
                      onChange={this.handleChange}
                      name="role_name"
                      required
                    />
                  </Form.Field>
                  <Form.Group>
                    <Form.Field className="div-form-field">
                      <FormControl className="div-form-control" size="small">
                        <InputLabel id="demo-select-small">Screen</InputLabel>
                        <Select
                          className="div-select"
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={screen_id}
                          label="Screen"
                          onChange={(e) => this.handleSelectChange(e)}
                        >
                          {screen_option.map((screen) => {
                            return (
                              <MenuItem
                                onClick={(e) => this.setSelectedName(e)}
                                value={screen.screen_id}
                                data-name={screen.screen_name}
                              >
                                {screen.screen_name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Form.Field>
                    <Button
                      type="button"
                      id="btn-add-form-field"
                      onClick={this.addFormFields}
                    >
                      Add screen
                    </Button>
                  </Form.Group>

                  <label className="label-access-screen">
                    Accessible screen(s)
                  </label>
                  <Table
                    celled
                    label="Accessible screen(s)"
                    className="div-screen-table"
                  >
                    <Table.Body>
                      {accessible_screen.map((screen) => {
                        return (
                          <Table.Row>
                            <Table.Cell className="td-cell">
                              <Form.Group className="div-group">
                                <Form.Field className="div-group-field">
                                  <label>{screen.screen_name}</label>
                                </Form.Field>
                                <Button
                                  type="button"
                                  data-screen-id={screen.screen_id}
                                  onClick={this.removeRoleScreen}
                                  className="btn-remove"
                                >
                                  <i className="trash alternate outline icon m-0"></i>
                                </Button>
                              </Form.Group>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  <Form.Field>
                    <label>Description</label>
                    <textarea
                      placeholder="Description"
                      value={role_desc}
                      onChange={this.handleChange}
                      name="role_desc"
                      required
                    />
                  </Form.Field>
                  <div style={{ textAlign: "center" }}>
                    <Form.Field>
                      <Button className="btn-save-role">Save</Button>
                    </Form.Field>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p>© ITEnglish Copyright 2022</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(Role);
