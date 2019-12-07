import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'
import axios from 'axios';


class AdminDashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            welcomeMessage: 'Welcome To your Admin Dashboard',
            user: [],
            success: true,
            accountnumber: 0
        }

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {

        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    fetchData = (e) => {

        console.log("Fetch Data")
        var headers = new Headers();

        e.preventDefault();

        axios.defaults.withCredentials = true;

        axios.get(API_URL + `/transaction/getall?accountnumber=${this.state.accountnumber}`)
            .then((response) => {

                console.log("response", response)
                this.setState({ user: response.data })


            }).catch(() => {
                this.setState({ success: false })

            })

    }
    feeRefund = (e,trans) => {

        console.log("fee Data")
        

        e.preventDefault();

        axios.defaults.withCredentials = true;

        axios.patch(API_URL + `/transaction/refundfee`,{
    	"mongoid": trans._id,
        "accountnumber": trans.sender,
        "balance": trans.amount
            })
            .then((response) => {

                console.log("response", response)
                this.setState({ msg: response.data.message })


            }).catch(() => {
                this.setState({ success: false })

            })

    }
    componentDidMount() {
        // let email = sessionStorage.authenticatedUser;
        // axios.get(API_URL + '/user/email?email='+ email)
        //     .then((response) => {
        //         console.log(response.data);
        //         this.setState({
        //             user: this.state.user.concat(response.data)
        //         });
        //     });

    }

    render() {
        return (
            <>
                <br />
                <br />
                <br />
                <div style={{ backgroundColor: "white", opacity: 1, filter: "Alpha(opacity=100)", borderRadius: '10px' }}>
                    <div className="container">
                        Welcome {sessionStorage.name}

                    </div>
                    <br />
                    <div className="container">


                    </div>
                    <div className="container">
                        {this.state.welcomeMessage}

                        <br />
                        <br />
                        <div class="row">
                            <div class="col-sm-12 col-md-12">
                                <form onSubmit={this.fetchData}>
                                    <div class="row" >
                                        <div class="col-sm-2 col-md-2">
                                            <label for="where"><h5>Account #</h5></label>
                                        </div>
                                        <div class="col-sm-5 col-md-5">

                                            <div class="form-group">

                                                <input type="number" class="form-control" id="where" placeholder="Account Number" name="accountnumber" value={this.state.accountnumber} onChange={this.handleChange} />

                                            </div>

                                        </div>



                                        <div class="col-sm-5 col-md-5">
                                            <div class="form-group">


                                                <input type="submit" class="form-control btn btn-danger" />

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
                        <hr />

                        <div class="row">
                            <div class="col-sm-12 col-md-12">
                                <table className="table">
                                    <tr>
                                    <th>
                                            Transaction Date
                                            </th>
                                        <th>
                                            Sender Name
                                            </th>
                                        <th>
                                            Receiver Name
                                            </th>
                                        <th>
                                            Sender Account Number
                                            </th>
                                        <th>
                                            Sender Routing Number
                                            </th>
                                        <th>
                                            Receiver Account Number
                                            </th>
                                        <th>
                                            Receiver Routing Number
                                            </th>
                                        <th>
                                            Transaction Amount
                                            </th>
                                            <th>
                                            Credit / Debit
                                            </th>
                                        <th>
                                            Transaction Type
                                            </th>
                                    
                                        <th>
                                            External Transaction
                                        </th>
                                        <th>
                                            Extarnal Bank Name
                                        </th>
                                        <th>

                                        </th>

                                    </tr>
                                    {
                                        this.state.user.map(user => {
                                            let dis =""
                                            let s = "DR"
                                            if(user.type!=="Fee"){
                                               dis = 'none'

                                            }
                                            if(this.state.accountnumber === user.sender){
                                                s = "CR"
                                            }
                                           
                                            return (
                                                <>
                                                    <tr>
                                                    <td>{user.date}</td>
                                                        <td>{user.sendername}</td>
                                                        <td>{user.receivername}</td>
                                                        <td>{user.sender}</td>
                                                        <td>{user.routingnumbersender}</td>
                                                        <td>{user.receiver}</td>
                                                        <td>{user.routingnumbereceiver}</td>
                                                        <td>{user.amount}</td>
                                                        <td>{s}</td>
                                                        <td>{user.type} <button style={{display:dis}} onClick={(event)=>this.feeRefund(event,user)} class="btn btn-primary">Refund Fee</button></td>
                                                      
                                                        <td>{user.external}</td>
                                                        <td>{user.bankname}</td>
                                                        <td> </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </table>
                                {!this.state.success && <div className="alert alert-warning">No Account Detected</div>}
                            </div>
                        </div>


                    </div>
                    <div>

                    </div>
                </div>


            </>
        )
    }



}


export default AdminDashboard