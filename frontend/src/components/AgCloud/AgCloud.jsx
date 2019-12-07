import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import TransactionComponent from './TransactionComponent.jsx'
import FrontPage from './FrontPage.jsx'
import UserTransaction from './UserTransaction.jsx'

class AgCloud extends Component {
    render() {
        return (
            <div className="AgCloudApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={FrontPage}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/transaction" component={TransactionComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/dashboard" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/admindashboard" component={AdminDashboard}/>
                            <AuthenticatedRoute path="/usertransaction" component={UserTransaction}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorComponent}/>
                            
                        </Switch>
                       
                    </>
                </Router>
               
            </div>
        )
    }
}

export default AgCloud