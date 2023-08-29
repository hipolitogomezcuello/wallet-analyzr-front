import React, {useState} from "react";
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {useNavigate} from "react-router-dom";

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    height: '100%',
    marginTop: '5rem',
  },
  textInput: {
    margin: '1.5rem 0',
  },
}

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username === "" || password === "") {
      alert("Sorry, there are no front end validations, but at least put something!")
      return
    }
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', username);
      setIsLoading(false);
      console.log('Logged in!', data)
      navigate('/')
    } else {
      alert("Error registering, try again later!")
      setIsLoading(false);
    }
  }

  return (
    <Grid2 xs={12} style={styles.mainContainer}>
      <Grid2 container direction={"column"}>
        <Typography variant={"h1"}>Sign Up</Typography>
        <Grid2 xs={4} direction={"column"} container>
          <TextField
            label={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.textInput}
          />
          <TextField
            label={"Password"}
            value={password}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.textInput}
          />
          <Button variant={"contained"} onClick={handleRegister} disabled={isLoading}>
            {isLoading ? <CircularProgress size={30} /> : 'Sign Up'}
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}