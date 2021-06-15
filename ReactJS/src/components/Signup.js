import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Signup extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: "",
        password: "",
        cpassword: "",
        city: ""
      };
    }
  
    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });
  
    signup = (e) => {
      e.preventDefault();
  
      const { name, email, password, city, cpassword } = this.state;
      if (!name || !email || !password || !city || !cpassword) {
        return this.setState({ error: "Fill all fields!" });
      }
      if(password != cpassword){
        return this.setState({error: "Passwords do not match!"})
      }
      this.props.context.login(name, email, password, city, cpassword)
        .then((loggedIn) => {
          if (!loggedIn) {
            this.setState({ error: "DB not connected" });
          }
        })   
    };
  
    render() {
      return !this.props.context.user ? (
        <>
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Sign Up</h4>
            </div>
          </div>
          <br />
          <br />
          <form onSubmit={this.signup}>
            <div className="columns is-mobile is-centered">
              <div className="column is-one-third">
              <div className="field">
                  <label className="label">Name: </label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">City: </label>
                  <input
                    className="input"
                    type="text"
                    name="city"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Email: </label>
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Password: </label>
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Confirm Password: </label>
                  <input
                    className="input"
                    type="password"
                    name="cpassword"
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error && (
                  <div className="has-text-danger">{this.state.error}</div>
                )}
                <div className="field is-clearfix">
                  <button
                    className="button is-primary is-outlined is-pulled-right"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <Redirect to="/login" />
      );
    }
  }
  
  export default withContext(Signup);