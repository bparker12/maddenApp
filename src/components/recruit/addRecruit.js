import React, { useEffect, useState, useRef } from "react";
import post from '../../modules/apiManager'
import { Form, Label, Grid, Button } from "semantic-ui-react";

const AddRecruit = props => {

    const name = useRef('')
    const age = useRef()
    const position = useRef('')
    const positionType = useRef('')
    const school = useRef('')
    const headline = useRef()
    const news = useRef()



    const [newsThisWeek, setNewsThisWeek] = useState(true)

    const week = range(1,17).concat(['Superbowl', 'Offseason Stage 1', 'Offseason Stage 2', 'Offseason Stage 3'])
    const roundNum = range(1, 7)
    const pickNum = range(1, 32)

    function range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    const [draftNewsWeek] = React.useState([
        {label: 'Yes', value: true},
        {label: 'No', value: false}
    ])

    const changeValue = (e) => {
        if(e.target.value === 'true'){
        setNewsThisWeek(true)
        } else {setNewsThisWeek(false)}
    }

    return (
        <Grid style={{ padding: '30px'}} >
            <Form>
                <Label size='big'>Week Number</Label>
                <Form.Field>
                    <select
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
                    <input type='integer' id='age' ref = {age}/>
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
                    <input  autoComplete="on" list="projRoundNum" placeholder='Round Number'/>
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
                    <input  autoComplete="on" list="projDraftNum" placeholder='Pick Numer'/>
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
                    <input  autoComplete="on" list="trueRoundNum" placeholder='Round Number'/>
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
                    <Label size='big'>Scouted Draft Number</Label>
                <Form.Field>
                    <input  autoComplete="on" list="trueDraftNum" placeholder='Pick Numer'/>
                <datalist
                    id='TrueDraftNum'
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
                    <Label size='big'>Headline</Label>
                <Form.Field>
                    <input required type='string' id='headline' ref = {headline}/>
                </Form.Field>
                    <Label size='big'>News</Label>
                <Form.Field>
                    <input required type='string' id='news' ref = {news}/>
                </Form.Field>
            <Button type='submit'> Submit </Button>
            </Form>
        </Grid>
    )
}
export default AddRecruit