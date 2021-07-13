import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../App.css';

export default class Register extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        message: '',
        loading: false,
        loggedIn: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = await fetch('http://localhost:5000/users/register', {
                method: "POST",
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                }),
                headers: {
                    "Content-type": 'application/json'
                } 
            });
            const { status } = data;
            const res = await data.json();
            if (status != 200) {
                this.setState({
                    message: res.message
                });
            } else if (status == 200) {
                this.setState({
                    loggedIn: true,
                    message: 'Logged in'
                });
            }
        } catch (err) {
            this.setState({
                message: 'Error in registering. Try again later.',
            });        
        }
    }
    

    render() {
        const { username, password, email, message, loggedIn } = this.state;
        return (
          <div className="container">
            {loggedIn ? ( <Redirect to={"/"} /> ) : (
            <form className="register-form" onSubmit={e => this.handleSubmit(e)}>
                <div className="form-group">
                    <label className="header">Email address</label>
                    <input type="email" value={email} required name="email" className="form-control" id="email" placeholder="Enter email" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label className="header">Username</label>
                    <input type="text" value={username} required name="username" className="form-control" id="username" placeholder="Username" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label className="header">Password</label>
                    <input type="password" value={password} required name="password" className="form-control" aria-describedby="passwordHelp" id="password" placeholder="Password" onChange={this.handleChange} />
                    <small id="passwordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                </div>
                {message ? (
                    <p className="text-danger">{ message }</p>
                ) : (
                    <div></div> 
                )}
                <button type="submit" className="btn btn-primary">Register</button>
                <h3>Have an account?</h3>
                <Link to="/login">Log in here!</Link>
            </form>
            )}
          </div>
        )
    }
}