import React, { useEffect, useState, useRef } from "react";
import post from '../../modules/apiManager'
import { Form, Grid, Button, Label, Modal } from "semantic-ui-react";
import apiManager from "../../modules/apiManager";

const NewFranchise = props => {

    const name = useRef('')

    const [maddenYear, setMaddenYear] = useState(20)
    const [onlineLeague, setOnlineLeague] = useState(true)
    const [privateLeague, setPrivateLeague] = useState(true)
    const [openModal, setModal] = useState(false)

    const [onlineOptions] = React.useState([
        {label: 'Yes', value: true},
        {label: 'No', value: false}
    ])
    const [maddenYearOption] = React.useState([
        {label: '20', value: 20},
        {label: '21', value: 21}
    ])

    const changeValue = (e) => {
        if(e.target.id === 'online'){
            if(e.target.value === 'true'){
            setOnlineLeague(true)
            } else {setOnlineLeague(false)
            }
        } else if(e.target.id ==='year'){
            setMaddenYear(parseInt(e.target.value))
        }
        console.log(onlineLeague, maddenYear)
    }

    const toggleChecked = (e) => {
        if(e.target.id === 'checkBox'){
            setPrivateLeague(!privateLeague)
        } else if(e.target.id === 'submitModal'){
            if(name.current.value === ''){
                alert("Please fill in Blank")
            }else{
                setModal(!openModal)
            }
        }
        console.log(privateLeague)
    }

    const newFranchise = {
        userId: 1,
        name: name.current.value,
        year: maddenYear,
        online: onlineLeague,
        private: privateLeague 
    }

    const postFranchise = (e) => {
        e.preventDefault();
        apiManager.post("franchise", newFranchise)
        .then(() => {
            setModal(!openModal)
            props.history.push("/")
        })
        console.log('you clicked me', newFranchise)
    }

    return (
        <>
        <Grid container centered columns={1}>
            <Grid.Row >
                <Form size='large'>
                    <Form.Field>
                        <Label size='big'>Madden #</Label>
                        <select
                            onChange={changeValue}
                            id="year"
                            >
                            {maddenYearOption.map(yearOpt => (
                                <option
                                    key={yearOpt.value}
                                    value={yearOpt.value}
                                    >
                                    {yearOpt.label}
                                    </option>
                            ))}
                        </select>
                    </Form.Field>
                    <Form.Field>
                    <Label size ='big'>Franchise Name</Label>
                    <div>
                    <input defaultValue="" placeholder='' type='string' id='franName' ref={name }
                    />
                    </div>
                    </Form.Field>
                    <Form.Field>
                        <Label size='big'>Online League</Label>
                        <select
                           onChange={changeValue}
                           value={onlineLeague}
                           id="online"
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
                        <Label size='big'>Private League</Label>
                        <Form.Checkbox defaultChecked defaultValue={privateLeague} slider onChange={toggleChecked} id='checkBox' />
                    </Form.Field>
                    <Button
                        id='submitModal'
                        onClick={toggleChecked}
                    >Submit
                    </Button>
                    <Modal
                    open={openModal}
                    onCancel={() => setModal(!openModal)}
                    >
                        <React.Fragment>
                            <Modal.Content>
                                <Modal.Description>
                                    <h1> Name: {name.current.value} </h1>
                                    <h3> Madden # {maddenYear} {"\n"} </h3>
                                    <h3> Online League: {onlineLeague?'Yes':'No'} </h3>
                                    <h3> Private: {privateLeague?'Yes':'No'}</h3>
                                </Modal.Description>
                                    <Button
                                    type='submit'
                                    onClick={postFranchise}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() => setModal(!openModal)}
                                    >
                                        Cancel
                                    </Button>
                            </Modal.Content>
                        </React.Fragment>
                    </Modal>
                </Form>
            </Grid.Row>
        </Grid>
        </>
    )
}

export default NewFranchise