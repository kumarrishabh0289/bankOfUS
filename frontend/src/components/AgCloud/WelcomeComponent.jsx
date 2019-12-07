import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'
import axios from 'axios';


class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            welcomeMessage: 'Hey You Are Authorized',
            user:[],
            success:true
        }
        this.deleteClicked = this.deleteClicked.bind(this)

        
        
    }
    deleteClicked = (e) => {

        console.log("delete account called")
        var headers = new Headers();
        
        e.preventDefault();
        const data = {
            email: sessionStorage.authenticatedUser
            

        }
        console.log("data", data)
        
        axios.defaults.withCredentials = true;
       
        axios.put(API_URL + '/user/delete', data)
            .then((response) => {

                console.log("response", response)
                this.setState({ success: true })
                
                this.props.history.push(`/logout`)
            }).catch(() => {
                this.setState({success: false })
               
            })

    }
    componentDidMount() {
        let email = sessionStorage.authenticatedUser;
        axios.get(API_URL + '/user/email?email='+ email)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    user: this.state.user.concat(response.data)
                });
            });

        
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div style={{ backgroundColor: "white", opacity: 1, filter: "Alpha(opacity=100)", borderRadius: '10px' }}>
                <div className="container">
                    Welcome {sessionStorage.name}
                   
                </div>
                <br/>
                <div className="container">
                    
                       
                </div>
                <div className="container">
                    {this.state.welcomeMessage}

                    <br />
                    <br/>
                            <div class="row">
                                <div class="col-sm-12 col-md-12">
                                    <table className="table">
                                        <tr>
                                            <th>
                                                User email
                                            </th>
                                            <th>
                                                User Name
                                            </th>
                                            <th>
                                                User Account Number
                                            </th>
                                            <th>
                                                User Routing Number
                                            </th>
                                            <th>
                                                User Account Type
                                            </th>
                                            <th>
                                                User Account Balance
                                            </th>
                                            <th>

                                            </th>

                                        </tr>
                                        {
                                            this.state.user.map(user => {
                                                var status_text = ""
                                                var color = ""
                                                sessionStorage.setItem("accountnumber", user.accountnumber)
                                                sessionStorage.setItem("routingnumber", user.routingnumber)
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>{user.email}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.accountnumber}</td>
                                                            <td>{user.routingnumber}</td>
                                                            <td>{user.type}</td>
                                                            <td>{user.balance}</td>
                                                            <td> <button onClick={this.deleteClicked} class="btn btn-primary">Delete Account</button></td>                                                            
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </table>
                                    {!this.state.success && <div className="alert alert-warning">User account not deleted</div>}
                                </div>
                            </div>


                        </div>
                        <div>
                        <Link to="/transaction"><button class="btn btn-success">Transfer Money</button></Link>
                    </div>
                    </div>
             

            </>
        )
    }



}


export default WelcomeComponent