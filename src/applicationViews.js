import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"

const ApplicationViews = () => {

    return (
        <Route
            exact path="/" render={props => {
                return <HomePage {...props} />
            }}
        />
    )
}