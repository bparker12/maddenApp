import React, { useEffect, useState } from "react"
import { Route, Switch, useParams } from "react-router-dom"
// import { withRouter } from "react-router-dom"
import HomePage from "./components/homepage/homePage"
import NewFranchise from "./components/newFranchise/newFranchise"
import AddRecruit from './components/recruit/addRecruit'
import FranchiseHome from './components/franchiseHome/franchiseHome'
import UpdateRecruit from './components/recruit/updateRecruit'

const ApplicationViews = () => {

    return (
        <Switch>
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
            <Route
                path='/:franchiseName/addrecruit' render={props => {
                    return <AddRecruit {...props} />
                }}
            />
            <Route
                path='/:franchiseName' render={props => {
                    return <FranchiseHome {...props} />
                }}
            />
            <Route
                path='/:franchiseName/:year/:recruit/update' render={props => {
                    return <UpdateRecruit {...props} />
                }}
            />
        </Switch>
    )
}
export default ApplicationViews