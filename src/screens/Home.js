import React, { useState } from 'react'
import NavBar from './../components/NavBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardActionArea, CardActions, CardContent,
    CardMedia, Button, Drawer
} from '@material-ui/core'

const config = require('./../env.json')

const API_KEY = config.API_KEY

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w300'

async function getRandomMovie(setPoster, setLink) {

    try {

        const movie_id = getRandomInt(0, 999999);
        let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`,
            {
                method: 'GET',
                headers: {},
            });
        let resJSON = await res.json()

        console.log("RES =>", resJSON)

        if (!resJSON.status_message) {
            if (resJSON.poster_path != undefined && resJSON.adult == false) {
                setPoster(resJSON.poster_path)
                setLink(`https://www.themoviedb.org/movie/${resJSON.id}`)
            }
            else { getRandomMovie(setPoster) }
            return true
        }

        else {
            console.log("Falha")
            getRandomMovie(setPoster)
        };
    } catch (err) {
        console.log('ERRO: ', err);

        return false;
    }
}

function Home() {
    const classes = useStyles();
    let [poster, setPoster] = useState(null);
    let [link, setLink] = useState('');
    let [drawerIsOpen, setDrawerIsOpen] = useState(false);

    console.log("poster path=>", poster);

    return (
        <div style={{ flex: 1, width: '100%' }}>
            <NavBar getRandomMovie={() => { getRandomMovie(setPoster, setLink) }}
                poster={poster} setPoster={setPoster} link={link} setLink={setLink} />
            <div style={{ display: "flex", flex: 1, justifyContent: "center", alignItems: "center" }}>
                {poster != null ? <img src={`${IMAGE_BASE_URL}${poster}`} onClick={() => {
                    console.log("LINK=>>", link)
                    window.open(link)
                }} />//customCard(`${IMAGE_BASE_URL}${poster}`, classes)
                    : <div />}
            </div>
        </div>
    );
}

export default Home;
