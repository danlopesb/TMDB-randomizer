import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
//import MailIcon from '@material-ui/icons/Mail';
import {
    IconButton, MenuIcon, Drawer, List, ListItem, Divider, ListItemIcon,
    ListItemText, FormControl, TextField
} from '@material-ui/core'

const config = require('./../env.json')

const API_KEY = config.API_KEY

async function getPersonID(name) {

    try {

        let res = await fetch(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${name}`,
            {
                method: 'GET',
                headers: {},
            });

        let resJSON = await res.json();

        console.log("NOME =>", resJSON.results[0].name)
        console.log("ID =>", resJSON.results[0].id)

        if (!resJSON.status_message) {
            return resJSON.results[0].id;
        }

        else {
            console.log("Falha")
            //getRandomMovie(setPoster)
        };
    } catch (err) {
        console.log('ERRO: ', err);

        return false;
    }
}

async function getMoviesByDirector(id) {

    try {

        let res = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}`,
            {
                method: 'GET',
                headers: {},
            });

        let resJSON = await res.json();
        let moviesDirected = []
        resJSON.crew.map((movie) => {
            if (movie.job === "Director") moviesDirected.push(movie.id);
        })

        console.log("NOME =>", resJSON.crew)

        if (!resJSON.status_message) {
            console.log(moviesDirected)
            return moviesDirected;
        }

        else {
            console.log("Falha")
            //getRandomMovie(setPoster)
        };
    } catch (err) {
        console.log('ERRO: ', err);

        return false;
    }
}

async function getRandomMovieByDirector(items, setPoster, setLink) {
    const item = items[Math.floor(Math.random() * items.length)];

    try {

        let res = await fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=${API_KEY}`,
            {
                method: 'GET',
                headers: {},
            });

        let resJSON = await res.json();

        if (!resJSON.status_message) {
            console.log(resJSON);
            setPoster(resJSON.poster_path);
            setLink(`https://www.themoviedb.org/movie/${resJSON.id}`)
        }

        else {
            console.log("Falha")
            //getRandomMovie(setPoster)
        };
    } catch (err) {
        console.log('ERRO: ', err);

        return false;
    }
}

const list = () => (
    <div>
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </div>
);

const NavBar = (props) => {
    let [drawerIsOpen, setDrawerIsOpen] = useState(false);
    let [director, setDirector] = useState('');

    const handleChange = (event) => {
        setDirector(event.target.value);
    }

    const handleDrawerOpen = () => {
        setDrawerIsOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerIsOpen(false);
    };

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
                    <Button variant='contained' color='secondary'
                        onClick={handleDrawerOpen}>
                        Filter by director</Button>
                    <Drawer anchor={'right'} open={drawerIsOpen} onBackdropClick={handleDrawerClose}>
                        <FormControl>
                            <TextField id="outlined-basic" label="Director" variant="outlined"
                                value={director} onChange={handleChange} />
                        </FormControl>
                        <Button variant="contained"
                            onClick={async () => {
                                console.log("=======>", director)
                                let id = await getPersonID(director);
                                let moviesDirected = await getMoviesByDirector(id);
                                getRandomMovieByDirector(moviesDirected, props.setPoster,
                                    props.setLink)
                            }}>
                            Get random movie!</Button>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </div>)
}

export default NavBar;