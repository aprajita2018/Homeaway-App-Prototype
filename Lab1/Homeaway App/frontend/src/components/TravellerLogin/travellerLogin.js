import React, {Component} from 'react';
import './travellerLogin.css';
import NavBar from '../NavBar/NavBar';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
// import axios from 'axios';
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../actions/login";

class TravellerLogin extends Component {

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? "had-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type={field.type} placeholder={field.placeholder} id={field.id} value={field.value} name={field.name}  {...field.input} required/>
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div> 
        );
    }
    
    /* Action Call 
    Whenever onSubmit event is triggered, execute an action call called travelerLogin
    */

    onSubmit(values) {
        this.props.change("user_type","traveler");
        console.log(values);
        this.props.login(values, () => {
             this.props.history.push("/");
        });
    }

    
    render() {
        const { handleSubmit } = this.props;

        return(
            <div>
                <NavBar location={"travellerLogin"} />
                <div class="container mt-5 pt-5 col-md-6"> 
                    <div class="row text-center mb-4">
                        <div class="col-md-12">
                            <span>
                                <legend>Log in to HomeAway</legend>
                                <h4>Need an account? <a href="./travellerSignup">Sign Up</a></h4>
                            </span>
                        </div>
                    </div>
                    <div class="row col-md-8 offset-md-2">
                        <div class="border py-4 px-5">
                            <div class="login-title">
                                <h4>Account Login</h4>
                            </div>
                            <div class="login-form mt-4">
                                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                   
                                     <Field
                                        label = "Email"
                                        name = "email"
                                        id = "inputEmail"
                                        type = "email"
                                        placeholder = "Email Address"
                                        component={this.renderField}
                                     />

                                     <Field
                                        label = "Password"
                                        name = "password"
                                        type = "password"
                                        id = "inputPassword"
                                        placeholder = "Password"
                                        component={this.renderField}
                                     />

                                     <Field
                                        label = ""
                                        name = "user_type"
                                        type = "hidden"
                                        id = "user_type"
                                        value= "traveler"
                                        component={this.renderField}
                                     />

                                    <div class="login-forgot text-left mt-2">
                                        <a href="#">Forgot Password? </a><br/><br/>
                                    </div>                                
                                    <div class="form-row">
                                        <button class="btn btn-primary btn-lg btn-block" onCLick={this.handleLogin}>Log In</button>
                                    </div>
                                    <div class="form-row form-check float-left mt-2">
                                            <input class="form-check-input" type="checkbox" id="updatecheck1"/>
                                            <label class="form-check-label" for="updatecheck1">
                                                Keep me signed in
                                            </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function validate(values) {

    const errors = {};
  
    // Validate the inputs from 'values'
    if (!values.email) {
      errors.email = "Enter an email";
    }
    if (!values.password) {
      errors.password = "Enter your password";
    }
      
    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
  }

export default reduxForm({
    validate,
    form: "TravlerLoginForm"
})(connect(null, {login})(TravellerLogin));