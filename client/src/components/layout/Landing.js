import React, { Component } from "react";
import { Button, Icon } from "react-materialize";
import "./Landing.css";
import { isContext } from "vm";

const Context = React.createContext();

class Landing extends Component {
  render() {
    return (
      <div className="main">
        <Context.Consumer>{context => <p>{context}</p>}</Context.Consumer>

        <h1>react {this.props.nume} </h1>
        <Button waves="light" className="blue darken-1">
          <Icon>done</Icon>
        </Button>
        <Button waves="light" className="red darken-1" icon="clear">
          {/* <Icon>clear</Icon> */}
        </Button>
      </div>
    );
  }
}

export default Landing;
