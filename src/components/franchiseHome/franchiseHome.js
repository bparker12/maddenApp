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
    const [lastWeekRecorded, setLastWeekRecorded] = useState({})


    const franchiseUrl = props.match.params.franchiseName


    const getFranchise = () => {
        apiManager.getAll("franchises", `id=${franchiseId}`)
        .then(setCurrentFranchise)
        apiManager.getAll("years", `franchisesId=${franchiseId}&_expand=franchises&_sort=name`)
        .then(years =>{
            const currentYear = years.slice(-1)
            const currentYearId = currentYear[0]
            setCurrentYear({name:currentYearId.name, id: currentYearId.id})
            setFranchiseYears(years)
            apiManager.getAll("draftNews", `yearsId=${currentYearId.id}&_expand=years&_expand=recruits&_sort=newsWeek`)
            .then(recruits => {
                if(recruits.length > 0){
                const currentWeek = recruits.slice(-1)
                const currentWeekId = currentWeek[0]
                setLastWeekRecorded({weekNum:currentWeekId.newsWeek})
                setRecruits(recruits)
                } else {
                    setRecruits([])
                    setLastWeekRecorded({})
                }
            })
        })
        apiManager.getAll('positionTypes', '_expand=types&_expand=positions')
        .then(setPositiontypes)
    }

    useEffect(getFranchise, [franchiseId])

    const addYear = () => {
        const franchise = currentFranchise[0]
        const newYear ={
            name: currentYear.name +1,
            franchisesId: franchise.id
        }
        if(franchiseYears.filter(year => year.name === newYear.name).length > 0){
            alert("This year already exists")
        } else{
            apiManager.post("years", newYear)
            .then(years =>{
                setCurrentYear({name:years.name, id: years.id})
                setRecruits([])
            })
        }
    }

    const newYearButton = () => {
        const isLastWeek = Object.values(lastWeekRecorded).includes("Offseason Stage 3")
        const dupYear = franchiseYears.some(years => years['name'] === currentYear.name+1)
        if(isLastWeek === true && dupYear === false){
            return (
                <Button onClick={() => addYear()}> AddNewYear </Button>
            )
        }
    }

    const toggleYear = (year) => {
        setCurrentYear({id: year.id, name: year.name})
        apiManager.getAll("draftNews", `yearsId=${year.id}&_expand=years&_expand=recruits&_sort=newsWeek`)
        .then(recruits => {
            if(recruits.length > 0){
            const currentWeek = recruits.slice(-1)
            const currentWeekId = currentWeek[0]
            setLastWeekRecorded({weekNum:currentWeekId.newsWeek})
            setRecruits(recruits)
            } else {
                setRecruits([])
                setLastWeekRecorded({})
            }
        })

    }
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

                <h5>Last week Recorded: {lastWeekRecorded.weekNum}</h5>
                <Button
                //https://stackoverflow.com/questions/59464337/how-to-send-params-in-usehistory-of-react-router-dom - this shows you can pass in objects into a push
                onClick={() => props.history.push(`/${franchiseUrl}/addrecruit`, {franchiseName: franchiseUrl, franchiseId: franchiseId, yearId: currentYear.id })}
                >
                Add Recruit
                </Button>
                {newYearButton()}
                    </Grid.Column>
                    <Grid.Column>
                    <h2>Update Previous Years</h2>
                            {franchiseYears.map(year => (
                                <Button
                                    key={year.id}
                                    value={year.id}
                                    onClick={() => {toggleYear(year)}}
                                >
                                    {year.name}
                                    </Button>
                                ))
                            }
                    </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
                {recruits.length < 1?
                <Grid.Column  textAlign='center'>
                <h2>News has not been recorded for this year yet</h2>
                </Grid.Column>
                :
                <Grid.Column  textAlign='center'>
                    <h3>{franchiseUrl} {currentYear.name} News</h3>
                    <RecruitTable recruits={recruits} positionTypes={positionTypes} setRecruits={setRecruits} currentYear={currentYear.id}/>
                </Grid.Column>
                }
            </Grid.Row>
        </Grid>
        </React.Fragment>
    )


}
export default FranchiseHome