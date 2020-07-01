import React, { useEffect, useState, useRef } from "react";
import post from '../../modules/apiManager'
import { Form, Dropdown } from "semantic-ui-react";

const NewFranchise = props => {


    return (
        <>
        <Form>
            <Dropdown text='Madden #'>
                <Dropdown.Menu>
                    <labeL>Madden #</labeL>
                    <input placeholder='20'/>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Field>
            </Form.Field>
        </Form>
        </>
    )
}

export default NewFranchise