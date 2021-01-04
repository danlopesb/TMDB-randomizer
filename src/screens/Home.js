import React, { useState } from 'react'
import NavBar from './../components/NavBar'
import Typography from '@material-ui/core/Typography'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const API_KEY = ''

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/w185'

async function fetchRandom() {
    const movie_id = getRandomInt(0, 999999);
    let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`,
        {
            method: 'GET',
            headers: {},
        });
    return await res.json();
}


async function getRandomMovie(setPoster) {

    //const movie_id = getRandomInt(0, 999999);

    try {
        // let res = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`,
        //     {
        //         method: 'GET',
        //         headers: {},
        //     });
        // let resJSON = await res.json();

        let resJSON = await fetchRandom();

        console.log("RES =>", resJSON)

        if (!resJSON.status_message) {
            if (resJSON.poster_path != undefined && resJSON.adult == false) {
                setPoster(resJSON.poster_path)
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
    let [poster, setPoster] = useState(null);

    console.log("poster path=>", poster);

    return (
        <div style={{ flex: 1, width: '100%' }}>
            <NavBar getRandomMovie={() => { getRandomMovie(setPoster) }} />
            {poster != null ? <img src={`${IMAGE_BASE_URL}${poster}`} />
                : <div />}
        </div>
    );
}

export default Home;
