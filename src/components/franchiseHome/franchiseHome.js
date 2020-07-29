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
        apiManager.getAll("franchises", `id=${franchiseId}`)
        .then(setCurrentFranchise)
        apiManager.getAll("years", `franchisesId=${franchiseId}&_expand=franchises`)
        .then(setFranchiseYears)
    }
    
    useEffect(getFranchise, [franchiseId])
    
    let currentYear = franchiseYears.slice(-1)
    let currentYearId = currentYear[0]

    return (
        <React.Fragment>
        <Grid divided style={{ padding: '30px'}}>
            <Grid.Row columns={2} >
                <Grid.Column>
                {currentFranchise.map((franchise) => (
                    <React.Fragment
                    key={franchise.id}
                    >
                    <h1 >{franchise.name}</h1>
                    <h4>Madden {franchise.year}</h4>
                    </React.Fragment>
                ))
                }
                {currentYear.map(year => (
                    <h5
                    key={year.id}
                    >Current Year: {year.name}</h5>
                ))
                }
                
                    <h5>Last week Recorded: </h5>
                    
                <Button
                //https://stackoverflow.com/questions/59464337/how-to-send-params-in-usehistory-of-react-router-dom - this shows you can pass in objects into a push
                onClick={() => props.history.push(`/${franchiseUrl}/addrecruit`, {franchiseName: franchiseUrl, franchiseId: franchiseId, yearId: currentYearId.id })}
                >
                Add Recruit
                </Button>
                    </Grid.Column>
                    <Grid.Column>
                    <h2>Update Previous Years</h2>
                        <Dropdown placeholder='Choose Year to Update'>
                            <Dropdown.Menu>
                            {franchiseYears.map(year => (
                                <Dropdown.Item
                                    active
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