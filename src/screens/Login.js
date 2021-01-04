import React from 'react'
import NavBar from './../components/NavBar'
import { FormControl, InputLabel, Input, FormHelperText, TextField, Button } from '@material-ui/core'

const API_KEY = ''

const fetch = require('node-fetch')

const GetAuthKey = () => {
    fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(json => console.log(json));
}

function Login() {
    return (
        <div style={{
            display: "flex", flexDirection: "column",
            justifyContent: "space-evenly", alignItems: "center",
            height: "40vh", width: "30vw"
        }}>
            <FormControl>
                <TextField id="outlined-basic" label="Login" variant="outlined" />
            </FormControl>
            <FormControl>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
            </FormControl>
            <Button variant="contained" onClick={GetAuthKey}>Log In</Button>
        </div>
    );
}

export default Login;
