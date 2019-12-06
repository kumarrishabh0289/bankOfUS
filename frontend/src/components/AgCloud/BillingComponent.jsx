import React, { Component } from 'react'



class BillingComponent extends Component {


    constructor(props) {
        super(props)
        

        this.state = {
            welcomeMessage: 'Hey You Are Authorized'
        }
        
    }

    
   
    render() {
        return (
                  <div className="container">
                        <div  style={{ backgroundColor: "white", opacity: .9, filter: "Alpha(opacity=50)" }}>

                <h3>Billing Component!</h3>
                <div className="container">
              
                </div>
                </div>
                </div>
        )}

}

export default BillingComponent
