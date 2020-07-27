import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Dropdown } from 'semantic-ui-react'
import Madden_Tracker_Logo from './Madden_Tracker_Logo.png'
import './navbar.css'
import apiManager from "../../modules/apiManager"


const NavBar = props => {

    const [franchises, setFranchises] = useState([])

    const getFranchises = () => {
        apiManager.getAll('franchises')
        .then(setFranchises)
    }

    useEffect(getFranchises, [franchises])

    const franchiseSelect = (e, data) => {
        props.history.push(`/${data.text}`, {franchiseId: data.value})
    }

    return (
        <nav>
            <Menu>
                <img src={Madden_Tracker_Logo} alt='logo' className='logo'/>
                <Menu.Item header >
                    <Link to='/'> MaddenApp </Link>
                </Menu.Item>
                <Menu.Item
                    name='Profile'
                />
                <Menu.Item>
                    <Link to='/newfranchise'> Add New Franchise </Link>
                </Menu.Item>
                <Dropdown item text='Franchise Select'>
                    <Dropdown.Menu>
                        {
                            franchises.map((franchise) => (
                            <Dropdown.Item
                                key={franchise.id}
                                value={franchise.id}
                                text={franchise.name}
                                onClick={franchiseSelect}
                            />
                            ))

                        }
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