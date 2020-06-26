import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import HomePage from "./components/homepage/homePage"

const ApplicationViews = () => {

    return (
        <Route
            exact path="/" render={props => {
                return <HomePage {...props} />
            }}
        />
    )
}
export default ApplicationViews