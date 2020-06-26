import React from 'react'
import { Route } from 'react-router-dom'
import ApplicationViews from './applicationViews'
import './maddenApp.css'

const MaddenApp = () => {

  return (
    <React.Fragment>
      <Route render={props => (
        <ApplicationViews {...props} />
      )}
      />
    </React.Fragment>
  )
}

export default MaddenApp
