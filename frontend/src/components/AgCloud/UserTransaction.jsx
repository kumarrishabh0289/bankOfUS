import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../Constants'
import axios from 'axios';


class UserTransaction extends Component {

    constructor(props) {
        super(props)

        this.state = {
            welcomeMessage: 'User Transaction details',
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

    // fetchData = (e) => {

    //     console.log("Fetch Data")
    //     var headers = new Headers();

    //     e.preventDefault();

    //     axios.defaults.withCredentials = true;

    //     axios.get(API_URL + `/transaction/getall?accountnumber=${this.state.accountnumber}`)
    //         .then((response) => {

    //             console.log("response", response)
    //             this.setState({ user: response.data })


    //         }).catch(() => {
    //             this.setState({ success: false })

    //         })

    // }
    // feeRefund = (e,trans) => {

    //     console.log("fee Data")
        

    //     e.preventDefault();

    //     axios.defaults.withCredentials = true;

    //     axios.patch(API_URL + `/transaction/refundfee`,{
    // 	"mongoid": trans._id,
    //     "accountnumber": trans.sender,
    //     "balance": trans.amount
    //         })
    //         .then((response) => {

    //             console.log("response", response)
    //             this.setState({ msg: response.data.message })


    //         }).catch(() => {
    //             this.setState({ success: false })

    //         })

    // }
    componentDidMount() {
       


        axios.defaults.withCredentials = true;

        axios.get(API_URL + `/transaction/getall?accountnumber=${sessionStorage.accountnumber}`)
            .then((response) => {

                console.log("response", response)
                this.setState({ user: response.data })


            }).catch(() => {
                this.setState({ success: false })

            })

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
                                            Recurring Feq. 
                                        </th>
                                        <th>
                                            From
                                        </th>
                                        <th>
                                            Till
                                        </th>
          

                                    </tr>
                                    {
                                        this.state.user.map(user => {
                                          
                                            let s = "DR"
                                       
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
                                                        <td>{user.type} </td>
                                                      
                                                        <td>{user.external}</td>
                                                        <td>{user.bankname}</td>
                                                        <td>{user.frequency}</td>
                                                        <td>{user.startdate}</td>
                                                        <td>{user.enddate}</td>
                                                        
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


export default UserTransaction