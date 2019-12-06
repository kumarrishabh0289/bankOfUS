import React, { Component } from 'react'

class LogoutComponent extends Component {
    render() {
        return (
            <>
            <div style={{ backgroundColor: "white", opacity: 1, filter: "Alpha(opacity=100)", borderRadius: '10px' }}>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
                </div>
            </>
        )
    }
}

export default LogoutComponent