import React, { useEffect, useState, useRef } from "react";
import { Form, Label, Grid, Button } from "semantic-ui-react";
import apiManager from "../../modules/apiManager";
import { useParams } from "react-router-dom";

const FranchiseHome = props => {

    let {franchise} = useParams()

    const [currentFranchise, setCurrentFranchise] = useState()

    // const getFranchise = () => {
    //     apiManager.get("franchise", 1)
    //     .then(data => data.json)
    //     .then(setCurrentFranchise)
    //     console.log("current franchise", currentFranchise   )
    // }

    const getFranchise =()=> {
        fetch(`http://localhost:8000/franchise?name=1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(data => data.json())
          .then(setCurrentFranchise)
    }

    useEffect(getFranchise, [])

    return (
        <div>
            Hello World
        </div>
    )


}
export default FranchiseHome