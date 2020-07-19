import React, { useEffect, useState } from "react";
// import { Form, Label, Grid, Button } from "semantic-ui-react";
import apiManager from "../../modules/apiManager";

const FranchiseHome = props => {


    const [currentFranchise, setCurrentFranchise] = useState([])

    useEffect(() => {
        getFranchise()}, [])

    const getFranchise = () => {
        const franchiseUrl = props.match.params.franchiseName
        apiManager.getAll("franchise", `name=${franchiseUrl}`)
        .then(setCurrentFranchise)
    }

    return (
        <div>
        {currentFranchise.map((franchise) => (
            <p>{franchise.name}</p>
        ))}
        </div>
    )


}
export default FranchiseHome