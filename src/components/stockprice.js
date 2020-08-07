import React, { Component } from "react";
import axios from "axios";
import "./stockprice.css";
import Notifier from "react-desktop-notification";

class Stockprice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  mySubmitHandler = (event) => {
    let timer = 60000;
    event.preventDefault();
    console.log("button clicked ");
    if (this.state.url) {
      setInterval(async () => {
        this.getstockprice(this.state.url, "urlresult");
      }, timer);
    }
    if (this.state.url2) {
      setInterval(async () => {
        this.getstockprice(this.state.url2, "urlresult2");
      }, timer);
    }

    if (this.state.url3) {
      setInterval(async () => {
        this.getstockprice(this.state.url3, "urlresult3");
      }, timer);
    }
  };

  gotNewNotification(title) {
    //Here will pop a notifier and always open in a new window when clicked.
    Notifier.start(
      title,
      "the Stock is less",
      "www.google.com",
      "validated image url"
    );

    //Here will pop notifier and open in a specified name window "popwin1" when clicked.
    // Notifier.start("Title","Here is context","www.google.com","validated image url","popwin1");

    // //Here will pop notifier and focus parent window only when clicked.
    // Notifier.focus("Title","Here is context","www.google.com","validated image url");
  }

  myChangeHandler = (event) => {
    this.setState({ url: event.target.value });
  };

  myChangeHandler2 = (event) => {
    this.setState({ url2: event.target.value });
  };

  myChangeHandler3 = (event) => {
    this.setState({ url3: event.target.value });
  };

  getstockprice(url, company) {
    const formData = new FormData();
    formData.append("url", url);
    axios
      .post("https://www.hitechadda.com/getstockprice", formData)
      .then((res) => {
        let result, tmp, tmpname;
        console.log(res.data);
        result = res.data;
        result = result[0];
        tmp = result["livedata"] - result["open"];
        tmp = tmp / result["open"];
        tmp = tmp * 100;
        result["percent"] = tmp;
        tmpname = result["name"];
        console.log(typeof result);
        this.setState({ dataname1: result.name });
        this.setState({ dataopen1: result.open });
        this.setState({ datapercent1: result.percent });
        this.setState({ datalivedata1: result.livedata });
        if (result.percent < -2) {
          this.gotNewNotification(result.name);
        }
      });
  }

  render() {
    return (
      <div className="container day dark-scheme">
        <h1>stockprice</h1>
        <p>Enter your name, and submit:</p>

        <form onSubmit={this.mySubmitHandler}>
          <input type="text" onChange={this.myChangeHandler} /> <br />
          <input type="text" onChange={this.myChangeHandler2} /> <br />
          <input type="text" onChange={this.myChangeHandler3} /> <br />
          <input type="submit" />
        </form>

        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>livedata</th>
              <th>percent</th>
              <th>open</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.dataname1}</td>
              <td>{this.state.datalivedata1}</td>
              <td>{this.state.datapercent1}</td>
              <td>{this.state.dataopen1}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Stockprice;
