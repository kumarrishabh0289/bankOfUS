import React, { Component } from 'react'
import AuthenticationForApiService from './AuthenticationForApiService.js'
import GoogleLogin from 'react-google-login';
import { API_URL } from '../../Constants'
import axios from 'axios';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            role: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    handleChange(event) {

        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }



    loginClicked = (e) => {

        console.log("submit login called")
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role

        }
        console.log("data", data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(API_URL + '/login', data)
            .then((response) => {

                console.log("response", response)
                this.setState({ showSuccessMessage: true })
                AuthenticationForApiService.registerSuccessfulLogin(this.state.email, response.data.jwt,response.data.role,response.data.name)
                this.props.history.push(`/sensor`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })

    }



    render() {
        return (
            <div>
                <br />
                <div class="container-fluid">
                    <div class="col-sm-5 col-md-5 container" style={{ backgroundColor: "white", opacity: .9, filter: "Alpha(opacity=90)", borderRadius: '10px' }}>
                        <br />
                        <h1>Login</h1>

                        <form onSubmit={this.loginClicked}>
                            <div class="row" >

                                <div class="col-sm-12 col-md-12">
                                    <br />
                                    <div class="form-group">
                                        <label for="where"><h5>Email</h5></label>
                                        <input type="text" class="form-control" id="where" placeholder="Your Email" name="email" value={this.state.email} onChange={this.handleChange} />

                                    </div>

                                </div>
                                <div class="col-sm-1 col-md-1">

                                </div>

                            </div>

                            <div class="row" >

                                <div class="col-sm-6 col-md-6">

                                    <div class="form-group">
                                        <label for="password"><h5>Password</h5></label>
                                        <input type="password" class="form-control" id="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>

                                </div>
                                <div class="col-sm-6 col-md-6">

                                    <div class="form-group" >
                                        <label for="where"><h5>Role</h5></label>
                                        <select id="role" className="form-control" name="role" value={this.state.role} onChange={this.handleChange}>
                                            <option value="">Select Role</option>
                                            <option value="Farmer">Admin</option>
                                            <option value="MachineController">Enterprise</option>
                                            <option value="ServiceCarrierStaff">Personal banking</option>
                                        </select>
                                    </div>
                                </div>


                            </div>

                            <div class="row" >

                                <div class="col-sm-12 col-md-12">
                                    <div class="form-group">

                                        <br />
                                        <input type="submit" class="form-control btn btn-danger" />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                                <br />
                                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                                {this.state.showSuccessMessage && <div className="alert alert-warning">Login Successful</div>}
                                <br />
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        )
    }
}

export default LoginComponent