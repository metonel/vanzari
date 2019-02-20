import React, { Component } from "react";
import { Row, Input, Button, Icon } from "react-materialize";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nume: "",
      email: "",
      password: "",
      password2: "",
      type: "",
      err: ""
    };
    this.onChange = this.onChange.bind(this); //sa nu punem la fiecare input ce are onChange onChange={this.onChange.bind(this)}
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      nume: this.state.nume,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      type: this.state.type
    };
    axios
      .post("/api/useri/reg", newUser) //am pus proxy in package.json pt localhost
      .then(res => console.log(res.data))
      //   .catch(err => console.group(err.response.data));
      .catch(err => this.setState({ err: err.response.data }));
  }

  render() {
    const { err } = this.state;

    return (
      <div className="main">
        <h1>creare user nou</h1>

        <form noValidate onSubmit={this.onSubmit}>
          <Row>
            <Input
              value={this.state.nume}
              onChange={this.onChange}
              name="nume"
              label="nume"
              error={err.nume}
              s={12}
            />
            <Input
              value={this.state.email}
              onChange={this.onChange}
              name="email"
              error={err.email}
              type="email"
              label="email"
              s={12}
            />
            <Input
              value={this.state.password}
              onChange={this.onChange}
              name="password"
              error={err.password}
              type="password"
              label="parola"
              s={6}
            />
            <Input
              value={this.state.password2}
              onChange={this.onChange}
              name="password2"
              error={err.password2}
              type="password"
              label="confirma parola"
              s={6}
            />
            <Input
              value={this.state.type}
              onChange={this.onChange}
              name="type"
              error={err.type}
              s={12}
              type="select"
              label="privilegii user"
              defaultValue="1"
            >
              <option value="1">vanzator</option>
              <option value="0">administrator</option>
            </Input>
          </Row>

          <Button waves="light" className="blue darken-1" type="submit">
            <Icon>done</Icon>
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
