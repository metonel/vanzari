import React, { Component } from "react";

const Context = React.createContext();

class ContextProvider extends Component {
  state = {
    nume: "Toni"
  };
  render() {
    return (
      <Context.Provider value="e valoare">
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
