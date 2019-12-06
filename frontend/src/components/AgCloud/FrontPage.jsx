import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthenticationForApiService from './AuthenticationForApiService.js'
import axios from 'axios';
import { API_URL } from '../../Constants'

class FrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            type: "",
            email: "",
            signup_status: "",
            mobile: "",
            hasFailed: false,
            showSuccessMessage: false


        }
        this.submitSignUp = this.submitSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitSignUp = (e) => {

        console.log("submit login called")
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            type: this.state.type,
            mobile: this.state.mobile


        }
        console.log("data", data)
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(API_URL + '/user/register', data)
            .then((response) => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {

                    console.log(response.data);
                    this.setState({

                        signup_status: response.data.message,
                        showSuccessMessage: true
                    })
                } else {
                    console.log(response.data.error);
                    this.setState({


                        signup_status: response.data.error,
                        hasFailed: true
                    })
                }
            });
    }




    render() {
        return (
            <div>
                <div className="container-fluid">
                    <br />
                    <br />
                    <div className="row" >
                        <div className="col-sm-1 col-md-1"></div>

                        <div className="col-sm-5 col-md-5" style={{ backgroundColor: "white", opacity: .9, filter: "Alpha(opacity=90)", borderRadius: '10px' }}>

                            <h1>
                                Sign Up to create bank account
                                </h1>

                            <form onSubmit={this.submitSignUp}>
                                <div className="row" >

                                    <div className="col-sm-12 col-md-12">
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="where"><h5>Email ID</h5></label>
                                            <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" value={this.state.email} onChange={this.handleChange} />

                                        </div>

                                    </div>
                                    <div className="col-sm-1 col-md-1">

                                    </div>

                                </div>
                                <div className="row" >

                                    <div className="col-sm-12 col-md-12">

                                        <div className="form-group">
                                            <label htmlFor="where"><h5>Name</h5></label>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Your Name" value={this.state.name} onChange={this.handleChange} />

                                        </div>

                                    </div>
                                    <div className="col-sm-1 col-md-1">

                                    </div>

                                </div>
                                <div className="row" >

                                    <div className="col-sm-12 col-md-12">

                                        <div className="form-group">
                                            <label htmlFor="where"><h5>Mobile Number</h5></label>
                                            <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Your mobile number" value={this.state.mobile} onChange={this.handleChange} />

                                        </div>

                                    </div>
                                    <div className="col-sm-1 col-md-1">

                                    </div>

                                </div>

                                <div className="row" >

                                    <div className="col-sm-6 col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="where"><h5>Password</h5></label>
                                            <input type="password" className="form-control" name="password" id="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
                                        </div>

                                    </div>
                                    <div className="col-sm-6 col-md-6">

                                        <div className="form-group">
                                            <label htmlFor="where"><h5>Role</h5></label>
                                            <select id="role" className="form-control" name="type" value={this.state.type} onChange={this.handleChange}>
                                                <option value="">Account Type</option>
                                                <option value="Checking">Checking</option>
                                                <option value="Savings">Savings</option>
                                            </select>
                                        </div>
                                    </div>


                                </div>


                                <div className="row" >

                                    <div className="col-sm-12 col-md-12">
                                        <div className="form-group">

                                            <br />
                                            <input type="submit" className="form-control btn btn-danger" />
                                            <br />
                                            <br />
                                        </div>
                                    </div>

                                    <br />
                                    {this.state.hasFailed && <div className="alert alert-warning">Account Creation Failed Check console for More Info.</div>}
                                    {this.state.showSuccessMessage && <div className="alert alert-warning">Account Created Successfully</div>}
                                    <br />

                                </div>
                            </form>
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default FrontPage