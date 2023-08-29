import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import {useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

const styles = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  field: {
    margin: "1rem",
  },
  buttonContainer: {
    justifyContent: "center",
    display: "flex",
  }
}

export const AddWalletModal = ({ open, onClose, onAdd }: { open: boolean, onClose: any, onAdd: Function }) => {
  const [address, setAddress] = useState("")
  const [usdRatio, setUsdRatio] = useState(0)
  const [eurRatio, setEurRatio] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddWallet = async () => {
    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        address,
        usd: usdRatio,
        eur: eurRatio,
      }),
    });
    if (response.ok) {
      setAddress("")
      setUsdRatio(0)
      setEurRatio(0)
      onClose()
      const data = await response.json()
      onAdd(data)
    } else {
      alert("Error adding wallet!")
    }
    setIsLoading(false)
  }

  return(
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.box}>
        <Typography variant={"h4"}>Add Wallet</Typography>
        <Grid2 xs={12} style={styles.inputsContainer}>
          <TextField style={styles.field} label={"Address"} value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextField style={styles.field} label={"USD Ratio"} type={"number"} value={usdRatio} onChange={(e) => setUsdRatio(parseInt(e.target.value))} />
          <TextField style={styles.field} label={"EUR Ratio"} type={"number"} value={eurRatio} onChange={(e) => setEurRatio(parseInt(e.target.value))} />
        </Grid2>
        <Grid2 xs={12} style={styles.buttonContainer}>
          <Button variant={"contained"} color={"success"} onClick={handleAddWallet} disabled={isLoading}>
            {isLoading ? <CircularProgress size={40}/> : "Add"}
          </Button>
        </Grid2>
      </Box>
    </Modal>
  )
}