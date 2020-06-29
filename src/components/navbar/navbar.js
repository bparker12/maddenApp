import React from "react"
import { Link } from "react-router-dom"
import { Menu, Dropdown } from 'semantic-ui-react'

const NavBar = props => {

    return (
        <nav>
            <Menu>
                <Menu.Item header>MaddenApp</Menu.Item>
                <Menu.Item 
                    name='Profile'
                />
                <Dropdown item text='Franchise Select'>
                    <Dropdown.Menu>
                        <Dropdown.Item>Insert Franchises here</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Menu.Menu position='right'>
                    <Menu.Item header>
                        Username here
                    </Menu.Item>
                    <Menu.Item 
                        name='Logout'
                    />
                </Menu.Menu>
            </Menu>
        </nav>
    )
}
export default NavBar