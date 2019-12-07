import React, { Component } from 'react'

import axios from 'axios';
import { API_URL } from '../../Constants'

class TransactionComponent extends Component {


    constructor(props) {
        super(props)


        this.state = {
            welcomeMessage: 'Hey You Are Authorized',
            receivername: "",
            receiver: "",
            amount: 0,
            transactiontype: "",
            routingnumberreceiver: "",
            external: false,
            bankname: "",
            startdate: "",
            enddate: "",
            frequency: "",

            hasFailed: false,
            showSuccessMessage: false,
            hasInsufficientBal: false,
            hasInsufficientBalMessage: ""
        }
        this.submitSignUp = this.submitSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        

    }


    submitSignUp = (e) => {

        console.log("signup")
        e.preventDefault();
        const data = {
            sendername: sessionStorage.name,
            receivername: this.state.receivername,
            sender: sessionStorage.accountnumber,
            receiver: this.state.receiver,
            amount: this.state.amount,
            external: this.state.external,
            transactiontype: this.state.transactiontype,
            routingnumbersender: sessionStorage.routingnumber,
            routingnumberreceiver: this.state.routingnumberreceiver,
            bankname: this.state.bankname,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            frequency: this.state.frequency
        }

        

        axios.get(API_URL + `/user/check?sender=${sessionStorage.accountnumber}&amount=${this.state.amount}&receiver=${this.state.receiver}`)
        .then((response) => {
            axios.get(API_URL + '/transaction/updatesenderbalance?sender=' + sessionStorage.accountnumber + '&amount=' + this.state.amount)
            axios.get(API_URL + '/transaction/updatereceiverbalance?receiver=' + this.state.receiver + '&amount=' + this.state.amount)
            axios.post(API_URL + '/transaction/new', data) 
            this.setState({ showSuccessMessage: true })
            this.setState({ hasInsufficientBal: false })
            
        }
        )
        .catch((err) => {
            this.setState({ hasInsufficientBal: true })
            this.setState({ hasInsufficientBalMessage: err.message })
        })
        

    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <div class="container" style={{ backgroundColor: "white", opacity: .9, filter: "Alpha(opacity=90)", borderRadius: '10px' }}>




                    <h4>
                        Transfer Money
                                </h4>

                    <form onSubmit={this.submitSignUp}>
                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Receiver Name</h6></label>
                                    <input type="text" className="form-control" name="receivername" id="receivername" placeholder="Receiver Name" value={this.state.receivername} onChange={this.handleChange} />

                                </div>
                            </div>

                        </div>
                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Receiver Account Number</h6></label>
                                    <input type="text" className="form-control" name="receiver" id="receiver" placeholder="Receiver Account Number" value={this.state.receiver} onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>
                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Amount to be transferred</h6></label>
                                    <input type="text" className="form-control" name="amount" id="amount" placeholder="Amount to be transferred" value={this.state.amount} onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>

                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>External</h6></label>
                                    <select id="external" className="form-control" name="external" value={this.state.external} onChange={this.handleChange}>
                                        <option value="">Payee</option>
                                        <option value={true}>External</option>
                                        <option value={false}>Non external</option>
                                    </select>
                                </div>

                            </div>

                        </div>

                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Transaction Type</h6></label>
                                    <select id="transactiontype" className="form-control" name="transactiontype" value={this.state.transactiontype} onChange={this.handleChange}>
                                        <option value="">Transaction Type</option>
                                        <option value="Recurring">Recurring</option>
                                        <option value="One-time">One time</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        <div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Receiver Routing Number</h6></label>
                                    <input type="text" className="form-control" name="routingnumberreceiver" id="routingnumberreceiver" placeholder="Receiver Routing Number" value={this.state.routingnumberreceiver} onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>
                        {this.state.external && (
                            <div className="row" >

                                <div className="col-sm-12 col-md-12">

                                    <div className="form-group">
                                        <label htmlFor="where"><h6>Receiver Bank Name</h6></label>
                                        <input type="text" className="form-control" name="bankname" id="bankname" placeholder="Receiver Bank Name" value={this.state.bankname} onChange={this.handleChange} />

                                    </div>

                                </div>

                            </div>
                        )}





                        {this.state.transactiontype == "Recurring" && (<div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6> Start Date </h6></label>
                                    <input type="date" className="form-control" name="startdate" id="startdate" placeholder="Enter startdate" value={this.state.startdate} onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>)}
                        {this.state.transactiontype == "Recurring" && (<div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6> End Date </h6></label>
                                    <input type="date" className="form-control" name="enddate" id="enddate" placeholder="Enter enddate" value={this.state.enddate} onChange={this.handleChange} />

                                </div>

                            </div>

                        </div>)}

                        {this.state.transactiontype == "Recurring" && (<div className="row" >

                            <div className="col-sm-12 col-md-12">

                                <div className="form-group">
                                    <label htmlFor="where"><h6>Frequency</h6></label>
                                    <select id="frequency" className="form-control" name="frequency" value={this.state.frequency} onChange={this.handleChange}>
                                        <option value="">Select frequency</option>
                                        <option value="PerMonth">Per Month</option>
                                        <option value="PerYear">Per Year</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        )}
                        <div className="row" >


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
                                {this.state.hasInsufficientBal && <div className="alert alert-warning">Transaction failed</div>}
                                {this.state.showSuccessMessage && <div className="alert alert-warning">Transaction Successful</div>}
                                {this.state.hasFailed && <div className="alert alert-warning">Transaction failed</div>}
                                <br />

                            </div>

                        </div>
                    </form>
                    <div className="container">

                    </div>
                </div>
            </div>
        )
    }

}

export default TransactionComponent
