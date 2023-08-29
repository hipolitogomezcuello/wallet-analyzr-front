import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Alert,
  Button, CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {EditRounded, Check, Close} from "@mui/icons-material";
import {useState} from "react";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "3rem",
  },
  paperContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "1.5rem 0",
    flexDirection: "row" as "row",
  },
  paper: {
    height: "10rem",
    width: "27rem",
    backgroundColor: '#F8F9FB',
    display: "flex",
    flexDirection: "column" as "column",
    padding: "0 1rem",
  },
  deleteButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  deleteButton: {
    width: '6rem',
    margin: '0 0 2rem 0',
  },
  editIcon: {
    color: '#3874CB',
    alignSelf: "flex-end",
    margin: '0.5rem',
  },
  checkIcon: {
    color: '#7BA97E',
  },
  closeIcon: {
    color: '#F44336',
  },
  ratio: {
    margin: '1rem',
    fontWeight: 'bold',
  },
  select: {
    margin: '1rem',
    width: '12rem',
    backgroundColor: 'white',
  },
  editingIconsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "1rem",
  }
}

export const Wallet = ({wallet, onDelete, onUpdate}: any) => {
  const [editing, setEditing] = useState(false)
  const [usdRatio, setUsdRatio] = useState(wallet.usd)
  const [eurRatio, setEurRatio] = useState(wallet.eur)
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallets/${wallet.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    if (response.ok) {
      alert("Wallet deleted!")
      onDelete(wallet)
    } else {
      alert("Error deleting wallet!")
    }
    setIsDeleting(false)
  }

  const handleSelectChange = (event: any) => {
    if (event.target.value === 'USD') {
      setSelectedCurrency('USD')
    } else {
      setSelectedCurrency('EUR')
    }
  }

  const getPrice = () => {
    const ethPrice = +wallet.balance / 1000000000000000000
    if (selectedCurrency === 'USD') {
      return `${ethPrice * usdRatio} $`
    } else {
      return `${ethPrice * eurRatio} €`
    }
  }

  const handleDiscardChanges = () => {
    setEditing(false)
    setUsdRatio(wallet.usd)
    setEurRatio(wallet.eur)
  }

  const handleSaveChanges = async () => {
    setIsUpdating(true)
    setEditing(false)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallets/${wallet.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usd: usdRatio,
        eur: eurRatio,
      })
    })
    if (response.ok) {
      alert("Wallet updated!")
      const data = await response.json()
      onUpdate(data)
    } else {
      alert("Error updating wallet!")
      handleDiscardChanges()
    }
    setIsUpdating(false)
  }

  return (
    <Grid2 key={wallet.id} xs={12} style={styles.mainContainer}>
      {wallet.isOld && <Alert severity="error">Wallet is old!</Alert>}
      <Grid2 xs={12} style={styles.paperContainer}>
        <Paper variant={"outlined"} style={styles.paper}>
          {editing ? <Grid2 xs={12} style={{display: "flex", flexDirection: "column"}}>
            <Grid2 xs={12} style={styles.editingIconsContainer}>
              <Close style={styles.closeIcon} onClick={handleDiscardChanges}/>
              <Check style={styles.checkIcon} onClick={handleSaveChanges}/>
            </Grid2>
            <Grid2>
              <TextField value={selectedCurrency === 'USD' ? usdRatio : eurRatio} onChange={(e) => {
                if (selectedCurrency === 'USD') {
                  setUsdRatio(e.target.value)
                } else {
                  setEurRatio(e.target.value)
                }
              }}/>
            </Grid2>
          </Grid2> : <Grid2 xs={12} style={{display: "flex", flexDirection: "column"}}>
            <EditRounded style={styles.editIcon} onClick={() => setEditing(true)}/>
            {isUpdating ? <CircularProgress/> : (selectedCurrency === 'USD' ?
                <Typography variant={"h5"} style={styles.ratio}>{wallet.usd}</Typography> :
                <Typography variant={"h5"} style={styles.ratio}>{wallet.eur}</Typography>
            )}
          </Grid2>}
        </Paper>
        <Paper variant={"outlined"} style={styles.paper}>
          <FormControl fullWidth>
            <Select
              value={selectedCurrency}
              onChange={handleSelectChange}
              style={styles.select}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </FormControl>
          <Typography variant={"h5"} style={styles.ratio}>{getPrice()}</Typography>
        </Paper>
      </Grid2>
      <Grid2 xs={12} style={styles.deleteButtonContainer}>
        <Button variant={"contained"} color={"error"} onClick={handleDelete} style={styles.deleteButton} disabled={isDeleting}>
          {isDeleting ? <CircularProgress size={30}/> : 'Delete'}
        </Button>
      </Grid2>
      <Divider/>
    </Grid2>
  )
}