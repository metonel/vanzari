import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import axios from "axios";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/NavbarMain";
import Footer from "./components/layout/FooterMain";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/Dashboard";
import Vanzari from "./components/Vanzari";

class App extends Component {
  componentDidMount() {
    //verificam existenta tokenului

    if (localStorage.jwtToken) {
      //
      axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
      const decoded = jwt_decode(localStorage.jwtToken);
      this.setState({
        id: decoded.id,
        nume: decoded.nume,
        type: decoded.type,
        autentificat: true
      });
    } else {
      this.setState({
        id: "",
        nume: "",
        type: "",
        autentificat: false
      });
    }
  }

  constructor() {
    super();
    this.state = {
      id: "",
      nume: "",
      type: "",
      autentificat: false
    };
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state} />

          {/* <Route
            exact
            path="/"
            render={props => <Landing {...props} nume={this.state.nume} />}
          /> */}

          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/vanzari" component={Vanzari} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
