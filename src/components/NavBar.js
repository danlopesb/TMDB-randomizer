import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { IconButton, MenuIcon } from '@material-ui/core'

const NavBar = (props) => {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar style={{
                    flex: 1, justifyContent: 'space-between',
                    alignItems: 'center', width: '90%'
                }}>
                    <Typography variant='title' color='default' align='center'>
                        TMDB Randomizer
                    </Typography>
                    <Button variant='contained' color='secondary' onClick={props.getRandomMovie}>
                        Get random movie!</Button>
                </Toolbar>
            </AppBar>
        </div>)
}

export default NavBar;