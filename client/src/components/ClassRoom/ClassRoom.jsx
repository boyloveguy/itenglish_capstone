import React, { Component } from "react";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import "./ClassRoom.css";
import MaterialTable from "@material-table/core";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const columns = [
  { title: "ClassName", field: "class_name" },
  { title: "Members", field: "member" },
  { title: "Teacher", field: "teacher" },
  { title: "", field: "join" },
  { title: "", field: "button" },
];

const data = [
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name:
      "Spoken english class 1 | How to speak fluent english - Beginner to Advance Speaking practice",
    member: "30/35",
    teacher: "Richard Anord",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name:
      "Class 1 Spoken English | Spoken English Course | Learn speaking Practice",
    member: "15/40",
    teacher: "Mr.Khoa",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name:
      "BOX SET: 55 English lessons in 55 minutes Grammar  & Vocabulary Mega-class",
    member: "6/20",
    teacher: "Mr.Giang",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Live english class: Linking words for conversation",
    member: "5/20",
    teacher: "Mr.Long",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "20/40",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "10/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "5/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "5/35",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "5/40",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
  {
    class_name: "Lean english in 3 hours - All you need to speak english",
    member: "17/20",
    teacher: "Jame Madition",
    join: (
      <Button as={Link} to="/payment">
        Join
      </Button>
    ),
    button: <Button>Edit</Button>,
  },
];

class ClassRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="div-rank-board pad-top-150">
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv />
        <Container style={{marginBottom: 20, textAlign: 'right', padding: '0 25px'}}>
            <Button color='primary'>Add new classroom</Button>
        </Container>
       
        <Container className="div-class">
          <div
           className="table-class-room"
           >
            <MaterialTable title="Class room" columns={columns} data={data} style={{boxShadow: "none"}}/>
          </div>
        </Container>
        <div
          style={{
            textAlign: "center",
            paddingTop: 80,
            paddingBottom: 20,
          }}
        >
          <p>© ITEnglish Copyright 2022</p>
        </div>
      </div>
    );
  }
}

export default ClassRoom;
