import React from 'react'
import { Route } from 'react-router-dom'
import ApplicationViews from './applicationViews'
import NavBar from './components/navbar/navbar'
import './maddenApp.css'

const MaddenApp = () => {

  return (
    <React.Fragment>
      <Route render={props => (
        <NavBar {...props} />
      )}
      />
      <Route render={props => (
        <ApplicationViews {...props} />
      )}
      />
    </React.Fragment>
  )
}

export default MaddenApp
