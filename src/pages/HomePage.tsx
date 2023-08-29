import {Button, CircularProgress, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Wallet} from "../components/Wallet";
import {AddWalletModal} from "../components/AddWalletModal";

const styles = {
  main: {
    height: "100%",
    width: "70%",
    margin: "auto",
  },
  mainContainer: {
    height: "100%",
  },
  walletsContainer: {
    justifyContent: "center",
    display: "flex",
  },
  addWalletButton: {
    alignSelf: "center",
    justifySelf: "center",
    margin: "1rem",
  },
  buttonContainer: {
    height: "4rem",
    justifyContent: "center",
    display: "flex",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    margin: "4rem 0",
  }
}

export const HomePage = () => {
  const [wallets, setWallets] = useState([])
  const [loadingWallets, setLoadingWallets] = useState(true)
  const [addWalletModalOpen, setAddWalletModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("token")
    if (!username || !token) {
      navigate("/login")
      return
    }
    const getWallets = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/wallets`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const data = await response.json()
      setWallets(data)
      setLoadingWallets(false)
    }
    getWallets()
  }, [])

  const handleAddWallet = async () => {
    setAddWalletModalOpen(true)
  }

  const handleCloseAddWalletModal = () => {
    setAddWalletModalOpen(false)
  }

  const onAddWallet = (wallet: any) => {
    const newWallets: any = [...wallets, wallet]
    setWallets(newWallets)
  }

  const onDeleteWallet = (wallet: any) => {
    const newWallets: any = [...wallets.filter((w: any) => w.id !== wallet.id)]
    setWallets(newWallets)
  }

  const handleWalletUpdate = (wallet: any) => {
    const newWallets: any = [...wallets]
    const index = newWallets.findIndex((w: any) => w.id === wallet.id)
    newWallets[index] = wallet
    setWallets(newWallets)
  }

  return (
    <div style={styles.main}>
      <Grid2 style={styles.mainContainer} xs={12}>
        <AddWalletModal open={addWalletModalOpen} onClose={handleCloseAddWalletModal} onAdd={onAddWallet}/>
        <Grid2 xs={12} style={styles.walletsContainer}>
          {loadingWallets ? <Grid2 xs={12} style={styles.loaderContainer}>
            <CircularProgress size={200}/>
          </Grid2> : (
            wallets.length > 0 ? <Grid2 xs={12} style={{ width: '100%' }}>
              {wallets.map((wallet: any) => <Wallet key={wallet.id} wallet={wallet} onDelete={onDeleteWallet} onUpdate={handleWalletUpdate}/>)}
            </Grid2> : <Typography variant={"h4"} style={{ margin: '4rem' }}>You have no wallets! How about adding some?</Typography>
          )}
        </Grid2>
        <Grid2 xs={12} style={styles.buttonContainer}>
          <Button variant={"contained"} color={"success"} onClick={handleAddWallet} style={styles.addWalletButton}>Add
            Wallet</Button>
        </Grid2>
      </Grid2>
    </div>
  )
}