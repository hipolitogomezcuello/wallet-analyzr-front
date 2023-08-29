import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import securitizeLogo from "../assets/securitize-logo.svg";
import {useNavigate} from "react-router-dom";

const styles = {
  button: {
    color: 'white',
    margin: '0 0.5rem',
    alignSelf: 'flex-end',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    maxHeight: '2rem',
    color: 'white',
  }
}

export default function NavBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar style={styles.toolbar}>
          <img src={securitizeLogo} alt={"Securitize"} style={styles.logo} onClick={() => navigate('/')}/>
          { username &&
            <Typography variant={"h6"} >
              Welcome, {username}!
            </Typography>
          }
          <div>
            <Button variant={"outlined"} color={"primary"} style={styles.button}
                    onClick={() => navigate('/login')}>Login</Button>
            <Button variant={"outlined"} color={"primary"} style={styles.button}
                    onClick={() => navigate('/register')}>Register</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}