import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { withRouter } from "react-router-dom"
import HomePage from "./components/homepage/homePage"
import NewFranchise from "./components/newFranchise/newFranchise"

const ApplicationViews = () => {

    return (
        <React.Fragment>
            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />
            <Route
                path="/newfranchise" render={props => {
                    return <NewFranchise {...props} />
                }}
            />
        </React.Fragment>
    )
}
export default ApplicationViews