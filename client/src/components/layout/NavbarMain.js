import React, { Component } from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import "./NavbarMain.css";
import axios from "axios";

class NavbarMain extends Component {
  logOut = () => {
    //sterge token-ul
    localStorage.removeItem("jwtToken");
    //sterge headerul
    delete axios.defaults.headers.common["Authorization"];
    //redirijare
  };

  render() {
    const links = (
      <React.Fragment>
        <NavItem href="/dashboard">
          <Icon large>person_outline reorder</Icon>
        </NavItem>
        <NavItem href="/login" onClick={() => this.logOut()}>
          <Icon large>power_settings_new</Icon>
        </NavItem>
      </React.Fragment>
    );

    return (
      <div>
        <Navbar
          brand={
            this.props.user.autentificat
              ? `vanzari  | logat ca ${this.props.user.nume} `
              : "vanzari"
          }
          right
          fixed
          className="teal nav"
        >
          {this.props.user.autentificat ? links : "se asteapta autentificarea"}
        </Navbar>
      </div>
    );
  }
}

export default NavbarMain;
