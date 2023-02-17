import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useLazyGetUserQuery} from "../../store/products/products.api";
import {useActions} from "../../hooks/actions";
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface IDialogLoginProps {
  openLogin: boolean,
  setOpenLogin: (isOpenLogin: boolean) => void
}

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
}


const DialogLogin: React.FC<IDialogLoginProps> = ({openLogin, setOpenLogin}) => {
  const [dataEmail, setDataEmail] = useState('')
  const [dataPassword, setDataPassword] = useState('')
  const [getUser] = useLazyGetUserQuery();
  const {setUser} = useActions()

  const handleLogin = async () => {
    try {
      let result = await getUser({email: dataEmail, password: dataPassword});
      if (result.data.length) {
        setOpenLogin(false);
        setUser(result.data[0])
      } else {
        alert('No user with this email address and password was found');
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const handleCloseLogin = () => {
    setDataEmail('')
    setDataPassword('')
    setOpenLogin(false)
  }






  const [stateSnack, setStateSnack] = React.useState<SnackbarState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = stateSnack;

  const handleClick = (newStateSnack: SnackbarOrigin) => () => {
    setStateSnack({ open: true, ...newStateSnack });
  };

  const handleClose = () => {
    setStateSnack({ ...stateSnack, open: false });
  };



  return (
    <Dialog open={Boolean(openLogin)} onClose={() => handleCloseLogin()}>

      <DialogTitle>
        <div>Login</div>
        <div className='dialog__close' onClick={() => handleCloseLogin()}>
          <CloseIcon/>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To login to this website, please enter your email address and password here.
        </DialogContentText>

        <TextField
          label="Email Address"
          type="email"
          variant="standard"
          value={dataEmail}
          onChange={(event) => setDataEmail(event.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="standard"
          value={dataPassword}
          onChange={(event) => setDataPassword(event.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => handleCloseLogin()}>Cancel</Button>
        <Button variant="outlined" onClick={handleLogin}>Login</Button>
      </DialogActions>

      <Button
        onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}
      >
        Top-Center
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Successful login"
        key={vertical + horizontal}
      />

    </Dialog>
  );
};

export default DialogLogin;