import React, { Component } from "react";
import { Row, Input, Button, Icon } from "react-materialize";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      err: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setAuthToken(token) {
    //atasam token-ul la header
    axios.defaults.headers.common["Authorization"] = token;
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/useri/login", user)
      .then(res => {
        //salvam tokenul in local storage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        //atasam tokenul in header
        this.setAuthToken(token);
        //decode token
        const decoded = jwt_decode(token);
        console.log(decoded);
        //set current user
        this.props.history.push("/vanzari");
      })
      //   .catch(err => console.group(err.response.data));
      .catch(err => this.setState({ err: err.response.data }));
  }

  render() {
    const { err } = this.state;
    return (
      <div className="login">
        <h1>Bun venit!</h1>

        <form noValidate onSubmit={this.onSubmit}>
          <Row>
            <Input
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              error={err.email}
              type="email"
              label="email"
              s={8}
            />
            <Input
              value={this.state.password}
              onChange={this.onChange}
              name="password"
              error={err.password}
              type="password"
              label="parola"
              s={8}
            />
          </Row>

          <Button waves="light" className="blue darken-1" type="submit">
            continua
            <Icon right>arrow_forward</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

export default Login;
