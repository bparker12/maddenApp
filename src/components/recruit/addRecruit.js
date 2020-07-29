import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"
import { Form, Label, Grid, Button } from "semantic-ui-react";
import apiManager from "../../modules/apiManager";

const AddRecruit = props => {

    //https://stackoverflow.com/questions/59464337/how-to-send-params-in-usehistory-of-react-router-dom
    const location = useLocation()
    const currentFranchise = location.state.franchiseName
    const franchiseId = location.state.franchiseId
    const yearId = location.state.yearId

    const name = useRef('')
    const age = useRef(20)
    const school = useRef('')
    const headline = useRef('')
    const news = useRef('')

    //this fetches the join table between players and their types to bring for the dropdown menus from the DB
    const getPositions = () => {
        apiManager.getAll('positionTypes', '_expand=types&_expand=positions')
        .then(setPositiontypes)
    }

    const [positionTypes, setPositiontypes] = useState([])

        useEffect(() => {
            getPositions()
        }, [])
    //this takes the join table from the db and breaks down the positions and returns only unique positions instead of repeating
    const uniquePositions = (array) => {
        const uniquePositionId = []
        array.map(x => {
            uniquePositionId.push(x.positions)
        })
        // used code from here to only use unique items from the array https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
        return([...new Map(uniquePositionId.map(item => [item["id"], item])).values()])
    }


    const [weekNum, setWeekNum] = useState(1)
    const [newsThisWeek, setNewsThisWeek] = useState(false)
    const [projDraftRound, setProjDraftRound] = useState(1)
    const [projDraftnum, setProjDraftNum] = useState(1)
    const [trueDraftRound, setTrueDraftRound] = useState(1)
    const [trueDraftpos, setTrueDraftPos] = useState('Early')
    const [positionValue, setPosition] = useState(1)
    const [positionTypeArr, setPositionTypeArr] = useState([])
    const [positionTypeValue, setPositionTypeValue] = useState(1)

    const offseasonWeek = ['Superbowl', 'Offseason Stage 1', 'Offseason Stage 2', 'Offseason Stage 3']
    const week = range(1,17).concat(offseasonWeek)
    const roundNum = range(1, 7)
    const pickNum = range(1, 32)
    const [pickPos] = React.useState([
        {label: 'Early', value: 1},
        {label: 'Mid', value: 2},
        {label: 'Late', value: 3}
    ])

    //this takes the current position showing, and filters the positionTypes state to only show the types for that position
    const positionTypeSelectionFilter = (position) => {
        let positionFilter = positionTypes.filter(type => type.positionsId === parseInt(position))
        const firstObject = positionFilter[0]
        setPositionTypeValue(firstObject.id)
        setPositionTypeArr(positionFilter)
    }
    //set a start number and an end number in which you want an array of numbers for
    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    const [draftNewsWeek] = React.useState([
        {label: 'Yes', value: true},
        {label: 'No', value: false}
    ])

    //this function will capture changes in the in dropdown fields to set state based on input
    const changeValue = (e) => {
        if(e.target.id === 'newsThisWeek'){
            if(e.target.value === 'true'){
                setNewsThisWeek(true)
                positionTypeSelectionFilter(positionValue)
            } else {setNewsThisWeek(false)}
        } else if(e.target.id === 'weekNum'){
            if(offseasonWeek.includes(e.target.value)){
                setWeekNum(e.target.value)
            } else {
                setWeekNum(parseInt(e.target.value))
            }
        } else if(e.target.id === 'projectedRoundNum'){
            setProjDraftRound(parseInt(e.target.value))
        } else if(e.target.id === 'projectedDraftNum'){
            setProjDraftNum(parseInt(e.target.value))
        } else if(e.target.id === 'trueRoundNumber'){
            setTrueDraftRound(parseInt(e.target.value))
        } else if(e.target.id === 'trueDraftPosition'){
            setTrueDraftPos(e.target.value)
        } else if(e.target.id === 'position'){
            setPosition(e.target.value)
            positionTypeSelectionFilter(e.target.value)
        } else if(e.target.id === 'type'){
            setPositionTypeValue(parseInt(e.target.value))
        }
    }

    //takes the newRecruit Object and pushes to database
    const postRecruit = (e) => {
        e.preventDefault();
        const newRecruit = {
            userId: 1,
            name: name.current.value,
            age: parseInt(age.current.value),
            positionType: positionTypeValue,
            school: school.current.value,
            projected_draft_round: projDraftRound,
            projected_draft_number: projDraftnum,
            scouted_draft_round: trueDraftRound,
            scouted_draft_position: trueDraftpos,
        }
        apiManager.post("recruits", newRecruit)
        .then((recruit) => {
            const newDraftNews = {
                yearId: yearId, 
                recruitId: recruit.id,
                newsWeek: weekNum,
                headline: headline.current.value,
                news: news.current.value,
            }
            apiManager.post("draftnews", newDraftNews)
            .then()
            props.history.push(`/${currentFranchise}`, {franchiseId: franchiseId})
        })
    }

    return (

        <Grid style={{ padding: '30px'}} >
            <Form>
            {newsThisWeek?
            <React.Fragment>
                <Label size='big'>Week Number</Label>
                <Form.Field>
                    <select
                    onChange={changeValue}
                    id='weekNum'
                    >
                        {week.map(weekNum => (
                            Number.isInteger(weekNum)?
                            <option
                            key={weekNum}
                            value={weekNum}
                            >
                                week {weekNum}
                            </option>:
                            <option
                            key={weekNum}
                            value={weekNum}
                            >
                                {weekNum}
                            </option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <Label size='big'>News This Week</Label>
                    <select
                    onChange={changeValue}
                    value={newsThisWeek}
                    id="newsThisWeek"
                    >
                    {draftNewsWeek.map(opt => (
                        <option
                        key={opt.value}
                        value={opt.value}
                        >
                        {opt.label}
                        </option>
                    ))}
                    </select>
                </Form.Field>
                    <Label size='big'>Recruit Name</Label>
                <Form.Field>
                    <input required type='string' id='name' defaultValue=' ' ref = {name}/>
                </Form.Field>
                    <Label size='big'>Headline</Label>
                <Form.Field>
                    <input required type='string' id='headline' ref = {headline}/>
                </Form.Field>
                    <Label size='big'>News</Label>
                <Form.Field>
                    <input required type='string' id='news' ref = {news}/>
                </Form.Field>
                    <Label size='big'>Age</Label>
                <Form.Field>
                    <input type='number' min="20" max='24' id='age' defaultValue={21} ref = {age}/>
                </Form.Field>
                <Form.Field>
                     <Label size='big'>Position</Label>
                     <select
                    id="position"
                    onChange={changeValue}
                    value={positionValue}
                    >
                    {uniquePositions(positionTypes).map(opt => (
                        <option
                        key={opt.id}
                        value={opt.id}
                        >
                        {opt.name}
                        </option>
                    ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <Label size='big'>Position Type</Label>
                    <select
                    id="type"
                    onChange={changeValue}
                    value={positionTypeValue}
                    >
                        {positionTypeArr.map(type => (
                            <option
                            key={type.id}
                            value={type.id}
                            >
                            {type.types.name}
                            </option>
                        ))}
                    </select>
                </Form.Field>
                    <Label size='big'>School</Label>
                <Form.Field>
                    <input type='string' id='school' ref = {school}/>
                </Form.Field>
                    <Label size='big'>Project Draft Round</Label>
                <Form.Field>
                    <input id='projectedRoundNum' autoComplete="on" list="projRoundNum" placeholder='Round Number' onChange={changeValue}/>
                    <datalist
                    id='projRoundNum'
                    >
                        {roundNum.map(num => (
                            <option
                            text='round'
                            key={num}
                            value={num}
                            />
                        ))}
                    </datalist>
                </Form.Field>
                    <Label size='big'>Project Draft Number</Label>
                <Form.Field>
                    <input id='projectedDraftNum' autoComplete="on" list="projDraftNum" placeholder='Pick Numer' onChange={changeValue}/>
                <datalist
                    id='projDraftNum'
                    >
                        {pickNum.map(num => (
                            <option
                            key={num}
                            value={num}
                            >
                            </option>
                        ))}
                    </datalist>
                </Form.Field>
                    <Label size='big'>Scouted Draft Round</Label>
                <Form.Field>
                    <input id='trueRoundNumber' autoComplete="on" list="trueRoundNum" placeholder='Round Number' onChange={changeValue}/>
                    <datalist
                    id='trueRoundNum'
                    >
                        {roundNum.map(num => (
                            <option
                            text='round'
                            key={num}
                            value={num}
                            />
                        ))}
                    </datalist>
                </Form.Field>
                    <Label size='big'>Scouted Draft Position</Label>
                <Form.Field>
                    <input id='trueDraftPosition' autoComplete="on" list="TrueDraftPos" placeholder={trueDraftpos} onChange={changeValue}/>
                <datalist
                    id='TrueDraftPos'
                    >
                        {pickPos.map(pos => (
                            <option
                            key={pos.value}
                            value={pos.label}
                            >
                            </option>
                        ))}
                    </datalist>
                </Form.Field>
            <Button type='submit' onClick={postRecruit}> Submit </Button>
            </React.Fragment>
            :
            <React.Fragment>

            <Label size='big'>Week Number</Label>
                <Form.Field>
                    <select
                    onChange={changeValue}
                    id='weekNum'
                    >
                        {week.map(weekNum => (
                            Number.isInteger(weekNum)?
                            <option
                            key={weekNum}
                            value={weekNum}
                            >
                                week {weekNum}
                            </option>:
                            <option
                            key={weekNum}
                            value={weekNum}
                            >
                                {weekNum}
                            </option>
                        ))}
                    </select>
                </Form.Field>
                <Form.Field>
                    <Label size='big'>News This Week</Label>
                    <select
                    onChange={changeValue}
                    value={newsThisWeek}
                    id="newsThisWeek"
                    >
                    {draftNewsWeek.map(opt => (
                        <option
                        key={opt.value}
                        value={opt.value}
                        >
                        {opt.label}
                        </option>
                    ))}
                    </select>
                </Form.Field>
                        <Button
                        onClick={() => props.history.push(`/${currentFranchise}`, {franchiseId: franchiseId})}
                        >
                        Return to Franchise
                        </Button>
            </React.Fragment>
            }
            </Form>
        </Grid>
    )
}
export default AddRecruit