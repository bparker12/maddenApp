import React from "react"
import { Link } from "react-router-dom"
import { Menu, Dropdown } from 'semantic-ui-react'
import Madden_Tracker_Logo from './Madden_Tracker_Logo.png'
import './navbar.css'


const NavBar = props => {

    return (
        <nav>
            <Menu>
                <img src={Madden_Tracker_Logo} alt='logo' className='logo'/>
                <Menu.Item header >MaddenApp</Menu.Item>
                <Menu.Item 
                    name='Profile'
                />
                <Menu.Item>
                    <Link to='/newfranchise'> Add New Franchise </Link>
                </Menu.Item>
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