import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import apiManager from "../../modules/apiManager";

const FranchiseHome = (props, param) => {


    const [currentFranchise, setCurrentFranchise] = useState([])

    const franchiseUrl = props.match.params.franchiseName

    const getFranchise = () => {
        apiManager.getAll("franchise", `name=${franchiseUrl}`)
        .then(setCurrentFranchise)
    }

    useEffect(getFranchise, [franchiseUrl])

    return (
        <React.Fragment>
        <Grid divided>
            <Grid.Row columns={2}>
                {currentFranchise.map((franchise) => (
                    <Grid.Column
                    key={franchise.id}
                    >
                    <h1 >{franchise.name}</h1>
                    <p>Madden {franchise.year}</p>
                    </Grid.Column>
                ))}
                <Grid.Column>
                <h4>Dropdown here</h4>
                    {/* <Dropdown>
                        Years
                    </Dropdown> */}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                <Grid.Column  textAlign='center'>
                    <h3>Current Years stories here in table?</h3>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </React.Fragment>
    )


}
export default FranchiseHome