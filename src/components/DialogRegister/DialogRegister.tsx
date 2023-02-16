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
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import './DialogRegister.scss'

interface IDialogRegisterProps {
  openRegister: boolean,
  setOpenRegister: (isOpenRegister: boolean) => void
}

const initialUser = {
  id: '',
  email: '',
  password: '',
  name: '',
  role: '',
  avatar: "https://api.lorem.space/image/face?w=640&h=480&r=8037",
  basket: [],
  GeneralsumInBasket: 0,
  history: {}
}

const DialogRegister: React.FC<IDialogRegisterProps> = ({openRegister, setOpenRegister}) => {

  const [getUser] = useLazyGetUserQuery();
  const {setUser} = useActions()
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
        if (newUser.email && newUser.password && newUser.name && newUser.role) {
          result = await addNewUser(newUser).unwrap()
          setUser(result)
          setOpenRegister(false);
        }
        else{
          alert("Fill in all fields, please")
        }
      }
    } catch (err) {
      alert(String(err));
    }
  };

  const handleCloseRegister = () => {
    setNewUser({...newUser, name: '', password: '', email: '', role: ''})
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
          label="User name"
          type="text"
          variant="standard"
          value={newUser.name}
          onChange={(event) => setNewUser({...newUser, name: event.target.value})}
        />

        <FormControl variant="standard" >
          <InputLabel id="dialog__labelRole">User Role</InputLabel>
          <Select
            labelId="dialog__labelRole"
            className="dialog__selectRole"
            id="dialog__selectRole"
            value={newUser.role}
            label="User role"
            onChange={(event) => setNewUser({...newUser, role: event.target.value})}
          >
            <MenuItem value={'customer'}>customer</MenuItem>
            <MenuItem value={'admin'}>admin</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Email Address"
          type="email"
          variant="standard"
          value={newUser.email}
          onChange={(event) => setNewUser({...newUser, email: event.target.value})}
        />

        <TextField
          label="Password"
          type="password"
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