import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useAddUserMutation, useLazyGetUserQuery} from "../../store/products/products.api";
import {useActions} from "../../hooks/actions";
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg";

interface IDialogRegisterProps {
  openRegister: boolean,
  setOpenRegister: (isOpenRegister: boolean) => void
}

const initialUser = {
  id: '',
  email: '',
  password: '',
  name: '',
  role: "customer",
  avatar: "https://api.lorem.space/image/face?w=640&h=480&r=8037",
  basket: [],
  GeneralsumInBasket: 0,
  history: {}
}

const DialogRegister: React.FC<IDialogRegisterProps> = ({openRegister, setOpenRegister}) => {

  const [getUser] = useLazyGetUserQuery();
  const {loginUser} = useActions()
  const [newUser, setNewUser] = useState(initialUser)
  const [addNewUser] = useAddUserMutation();
  // const [addNewUser, {isError}] = useAddUserMutation();

  const handleRegisterNewUser = async () => {
    try {
      let result = {}
      let existUser = await getUser({email: newUser.email});
      if (existUser.data.length) {
        alert('A user with this email address already exists');
      } else {
        if (newUser.email && newUser.password && newUser.name) {
          result = await addNewUser(newUser).unwrap()
          loginUser(result)
          setOpenRegister(false);
        }
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const handleCloseRegister = () => {
    setNewUser({...newUser, name: '', password: '', email: ''})
    setOpenRegister(false)
  }

  return (
    <Dialog open={Boolean(openRegister)} onClose={() => handleCloseRegister()}>
      <DialogTitle>
        <div>Register</div>
        <div className='dialog__close' onClick={() => handleCloseRegister()}>
          <CloseIcon/>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To register to this website, please fill in the fields below.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="nameRegister"
          label="User name"
          type="text"
          fullWidth
          variant="standard"
          value={newUser.name}
          onChange={(event) => setNewUser({...newUser, name: event.target.value})}
        />

        <TextField
          autoFocus
          margin="dense"
          id="emailRegister"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={newUser.email}
          onChange={(event) => setNewUser({...newUser, email: event.target.value})}
        />

        <TextField
          autoFocus
          margin="dense"
          id="passwordRegister"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={newUser.password}
          onChange={(event) => setNewUser({...newUser, password: event.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleCloseRegister()}>Cancel</Button>
        <Button variant="outlined" onClick={() => handleRegisterNewUser()}>Register</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogRegister;