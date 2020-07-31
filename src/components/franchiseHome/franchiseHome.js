import React, { useEffect, useState } from "react";
import { Dropdown, Grid, Button } from "semantic-ui-react";
import { useLocation } from "react-router-dom"
import apiManager from "../../modules/apiManager";
import RecruitTable from "../recruit/recruitTable"

const FranchiseHome = (props) => {

    const location = useLocation()
    const franchiseId = location.state.franchiseId

    const [currentFranchise, setCurrentFranchise] = useState([])
    const [franchiseYears, setFranchiseYears] = useState([])
    const [recruits, setRecruits] = useState([])
    const [positionTypes, setPositiontypes] = useState([])
    const [currentYear, setCurrentYear] = useState({})

    
    const franchiseUrl = props.match.params.franchiseName
    
    const getFranchise = () => {
        apiManager.getAll("franchises", `id=${franchiseId}`)
        .then(setCurrentFranchise)
        apiManager.getAll("years", `franchisesId=${franchiseId}&_expand=franchises`)
        .then(years =>{
            const currentYear = years.slice(-1)
            const currentYearId = currentYear[0]
            setCurrentYear({name:currentYearId.name, id: currentYearId.id})
            setFranchiseYears(years)
            apiManager.getAll("draftNews", `yearsId=${currentYearId.id}&_expand=years&_expand=recruits`)
            .then(setRecruits)
        })
        apiManager.getAll('positionTypes', '_expand=types&_expand=positions')
        .then(setPositiontypes)
    }
    
    useEffect(getFranchise, [franchiseId])

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
                <h5>Current Year: {currentYear.name}</h5>
                
                <h5>Last week Recorded: </h5>
                <Button
                //https://stackoverflow.com/questions/59464337/how-to-send-params-in-usehistory-of-react-router-dom - this shows you can pass in objects into a push
                onClick={() => props.history.push(`/${franchiseUrl}/addrecruit`, {franchiseName: franchiseUrl, franchiseId: franchiseId, yearId: currentYear.id })}
                >
                Add Recruit
                </Button>
                    </Grid.Column>
                    <Grid.Column>
                    <h2>Update Previous Years</h2>
                        <Dropdown defaultValue={currentYear.name} placeholder='Choose Year to Update'>
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
                    <h3>{franchiseUrl} {currentYear.name} News</h3>
                    <RecruitTable recruits={recruits} positionTypes={positionTypes}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </React.Fragment>
    )


}
export default FranchiseHome