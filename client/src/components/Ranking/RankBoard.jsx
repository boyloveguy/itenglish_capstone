import React, { Component } from "react";
import MenuDiv from "../MenuDiv/MenuDiv";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./RankBoard.css";
import MaterialTable from "@material-table/core";
import { Loader } from "semantic-ui-react";

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
      <div className="div-rank-board">
        <Helmet>
          <title>ITEnglish | Home</title>
        </Helmet>
        <MenuDiv />
        <div className="table-rank-board">
          <Loader active={isLoading} size="big" />
          <MaterialTable
            title="Rank Board"
            columns={columns}
            data={this.state.data}
          />
        </div>
      </div>
    );
  }
}

export default RankBoard;
