import React, { useEffect, useState, useRef } from "react";
import post from '../../modules/apiManager'
import { Form, Dropdown, Grid, Button, Label, Item } from "semantic-ui-react";

const NewFranchise = props => {

    const [onlineLeague, setOnlineLeague] = useState(true)
    // const [privateLeague, setPrivateLeague] = useState(true)

    const [onlineOptions] = React.useState([
        {label: 'True', value: true},
        {label: 'False', value: false}
    ])
    
    const changeValue = (e) => {
        setOnlineLeague(e.target.value)
        console.log(onlineLeague)
    }
    
    return (
        <>
        <Grid container centered columns={1}>
            <Grid.Row >
                <Form size='large'>
                    <Form.Field>
                        <Label size='big'>Madden #</Label>
                        <Dropdown>
                            <Dropdown.Menu>
                                <input placeholder='20'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Field>
                    <Label size ='big' prompt basic>Franchise Name</Label>
                    <input required defaultValue="" placeholder='BensStrikeAgain' type='string'

                    />
                    <Form.Field>
                        <Label size='big'>Online League</Label>
                        <select
                           onChange={changeValue}
                           value={onlineLeague}
                           defaultValue={onlineLeague}
                           > 
                           {onlineOptions.map(opt => (
                               <option
                               key={opt.value}
                               value={opt.value}
                               > 
                               {opt.label} 
                               </option>
                           ))}
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <Form.Checkbox defaultChecked={true} label='Private League' name='True' slider />
                    </Form.Field>
                    <Button>Submit</Button>
                </Form>
            </Grid.Row>
        </Grid>
        </>
    )
}

export default NewFranchise