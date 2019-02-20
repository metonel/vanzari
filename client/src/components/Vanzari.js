import React, { Component } from "react";
import {
  Row,
  Input,
  Button,
  Icon,
  Collection,
  CollectionItem
} from "react-materialize";
import axios from "axios";
import dateFormat from "dateformat";
import "./Vanzari.css";

class Vanzari extends Component {
  componentDidMount() {
    axios
      .get("/api/vanzari") //am pus proxy in package.json pt localhost
      .then(res => {
        this.setState({
          produse: res.data
        });
        console.log(res.data);
      })
      .catch(err => this.setState({ err: err.response.data }));
  }

  constructor() {
    super();
    this.state = {
      produse: [],
      produs: "",
      pret: "",
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
    const vanzare = {
      produs: this.state.produs,
      pret: this.state.pret
    };
    axios
      .post("/api/vanzari/add", vanzare) //am pus proxy in package.json pt localhost
      .then(res => console.log(res.data))
      .catch(err => this.setState({ err: err.response.data }));
    this.state.produse.push(vanzare);
  }
  render() {
    const { err } = this.state;
    const now = new Date();
    return (
      <div className="main">
        <h4>
          vanzari - {dateFormat(now, "dd, mmm")}
          <span>
            {this.state.produse.reduce(
              (accumulator, currentValue) => accumulator + currentValue.pret,
              0
            )}
          </span>
        </h4>
        <form noValidate onSubmit={this.onSubmit}>
          <Row>
            <Input
              value={this.state.produs}
              onChange={this.onChange}
              name="produs"
              label="produs"
              s={10}
            />
            <Input
              value={this.state.pret}
              onChange={this.onChange}
              name="pret"
              label="pret"
              error={err}
              s={2}
            />
            <Button waves="light" className="blue darken-1" type="submit">
              <Icon>done</Icon>
            </Button>
          </Row>
        </form>
        <Collection>
          {this.state.produse.map(produs => (
            <CollectionItem href="#" onClick={() => console.log("click")}>
              {produs.produs}
              <span>{produs.pret} Lei</span>
            </CollectionItem>
          ))}
        </Collection>
      </div>
    );
  }
}

export default Vanzari;
