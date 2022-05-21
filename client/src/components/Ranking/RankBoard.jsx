import React, { Component } from "react";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./RankBoard.css";
import MaterialTable from "@material-table/core";
import { Container, Loader } from "semantic-ui-react";

const columns = [
  { title: "Username", field: "user_name" },
  { title: "Rank", field: "no" },
  { title: "Total score", field: "total_score" },
  { title: "Number of exams attended", field: "total_exam" },
];

class RankBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/ranking")
      .then((res) => {
        this.setState({
          data: res.data.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
        console.log(error);
      });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="div-rank pad-top-150">
        <Helmet>
          <title>ITEnglish | Exams and tests</title>
        </Helmet>
        <Loader active={isLoading} size="big" />
        <MenuDiv activeItem={this.state.activeItem} />
        <Container className="div_exam">
          <div className="table-rank-board">
          <MaterialTable
              title="Rank Board"
              columns={columns}
              data={this.state.data}
            />
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


    // return (
    //   <div className="pad-top-150">
    //     <Helmet>
    //       <title>ITEnglish | Home</title>
    //     </Helmet>
    //     <MenuDiv />
    //     <Container className="div-rank">
    //       <div className="table-rank-board">
    //         <Loader active={isLoading} size="big" />
    //         <MaterialTable
    //           title="Rank Board"
    //           columns={columns}
    //           data={this.state.data}
    //         />
    //       </div>
    //     </Container>
    //     <div
    //         style={{
    //             textAlign: 'center',
    //             paddingTop: 80,
    //             paddingBottom: 20
    //         }}
    //     >
    //         <p>© ITEnglish Copyright 2022</p>
    //     </div>
    //   </div>
    // );
  }
}

export default RankBoard;
