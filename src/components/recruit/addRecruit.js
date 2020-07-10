import React, { /*useEffect*/useState, useRef } from "react";
// import post from '../../modules/apiManager'
import { Form, Label, Grid, Button } from "semantic-ui-react";

const AddRecruit = props => {

    const name = useRef('')
    const age = useRef()
    const position = useRef('')
    const positionType = useRef('')
    const school = useRef('')
    const headline = useRef('')
    const news = useRef('')


    const [weekNum, setWeekNum] = useState(1)
    const [newsThisWeek, setNewsThisWeek] = useState(false)
    const [projDraftRound, setProjDraftRound] = useState(1)
    const [projDraftnum, setProjDraftNum] = useState(1)
    const [trueDraftRound, setTrueDraftRound] = useState(1)
    const [trueDraftpos, setTrueDraftPos] = useState('Early')

    const week = range(1,17).concat(['Superbowl', 'Offseason Stage 1', 'Offseason Stage 2', 'Offseason Stage 3'])
    const roundNum = range(1, 7)
    const pickNum = range(1, 32)
    const [pickPos] = React.useState([
        {label: 'Early', value: 1},
        {label: 'Mid', value: 2},
        {label: 'Late', value: 3}
    ])

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    const [draftNewsWeek] = React.useState([
        {label: 'Yes', value: true},
        {label: 'No', value: false}
    ])

    const changeValue = (e) => {
        if(e.target.id === 'newsThisWeek'){
            if(e.target.value === 'true'){
                setNewsThisWeek(true)
            } else {setNewsThisWeek(false)}
        } else if(e.target.id === 'weekNum'){
            setWeekNum(parseInt(e.target.value))
        } else if(e.target.id === 'projectedRoundNum'){
            setProjDraftRound(parseInt(e.target.value))
        } else if(e.target.id === 'projectedDraftNum'){
            setProjDraftNum(parseInt(e.target.value))
        } else if(e.target.id === 'trueRoundNumber'){
            setTrueDraftRound(parseInt(e.target.value))
        } else if(e.target.id === 'trueDraftPosition'){
            setTrueDraftPos(e.target.value)
        }
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
                    <input required type='string' id='name' ref = {name}/>
                </Form.Field>
                    <Label size='big'>Age</Label>
                <Form.Field>
                    <input type='number' min="20" max='24' id='age' ref = {age}/>
                </Form.Field>
                    <Label size='big'>Position</Label>
                <Form.Field>
                    <input type='string' id='position' ref = {position}/>
                </Form.Field>
                    <Label size='big'>Position Type</Label>
                <Form.Field>
                    <input type='string' id='positionType' ref = {positionType}/>
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
                    <Label size='big'>Headline</Label>
                <Form.Field>
                    <input required type='string' id='headline' ref = {headline}/>
                </Form.Field>
                    <Label size='big'>News</Label>
                <Form.Field>
                    <input required type='string' id='news' ref = {news}/>
                </Form.Field>
            <Button type='submit'> Submit </Button>
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
            </React.Fragment>
            }
            </Form>
        </Grid>
    )
}
export default AddRecruit