import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { useLocation } from "react-router-dom"
import apiManager from "../../modules/apiManager";

const FranchiseHome = (props) => {

    const location = useLocation()
    const franchiseId = location.state.franchiseId

    const [currentFranchise, setCurrentFranchise] = useState([])
    const [franchiseYears, setFranchiseYears] = useState([])

    const franchiseUrl = props.match.params.franchiseName

    const getFranchise = () => {
        apiManager.getAll("franchises", `name=${franchiseUrl}`)
        .then(setCurrentFranchise)
        apiManager.getAll("years", `franchiseId=${franchiseId}`)
        .then(setFranchiseYears)
    }

    useEffect(getFranchise, [franchiseUrl])

    return (
        <React.Fragment>
        <Grid divided style={{ padding: '30px'}}>
            <Grid.Row columns={2} >
                {currentFranchise.map((franchise) => (
                    <Grid.Column
                    key={franchise.id}
                    >
                    <h1 >{franchise.name}</h1>
                    <h4>Madden {franchise.year}</h4>
                    <h5>Current Year: </h5>
                    <h5>Last week Recorded: </h5>
                <Button
                //https://stackoverflow.com/questions/59464337/how-to-send-params-in-usehistory-of-react-router-dom
                onClick={() => props.history.push(`/${franchiseUrl}/addrecruit`, {franchiseName: franchise.name, franchiseId: franchise.id })}
                >
                Add Recruit
                </Button>
                    </Grid.Column>
                ))}
                    <Grid.Column>
                    <h2>Update Previous Years</h2>
                        <Dropdown item text='Choose Year to Update'>
                            <Dropdown.Menu>
                            {
                                franchiseYears.map(year => (
                                <Dropdown.Item
                                    key={year.id}
                                    value={year.id}
                                    text={year.name}
                                />
                                ))
                            }
                            </Dropdown.Menu>
                        </Dropdown>
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