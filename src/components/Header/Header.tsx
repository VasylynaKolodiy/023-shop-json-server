import React, {useState} from 'react';
import './Header.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useAddUserMutation, useLazyGetUserQuery} from "../../store/products/products.api";
import {useActions} from "../../hooks/actions";
import {useAppSelector} from "../../hooks/redux";
import {IUsers} from "../../models/Interfaces";


const Header = () => {

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [dataEmail, setDataEmail] = useState('')
  const [dataPassword, setDataPassword] = useState('')
  const [dataName, setDataName] = useState('')
  const [getUser] = useLazyGetUserQuery();
  const {loginUser, logoutUser} = useActions()
  const user = useAppSelector((state) => state.auth.user);

  const initialUser = {
    id: new Date().getUTCMilliseconds(),
    email: '',
    password: '',
    name: '',
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=8037",
    basket: [],
    GeneralsumInBasket: 0,
    history: {}
  }

  const [newUser, setNewUser] = useState(initialUser)

  const [addNewUser, {isError}] = useAddUserMutation();
  const handleAddNewUser = async () => {
    if (newUser.email) {
      await addNewUser(newUser).unwrap()
    }
  };

  console.log(newUser, 'NewUser')


  const handleOpenUserMenu = ({event}: { event: any }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseLogin = async () => {
    try {
      let result = await getUser({email: dataEmail, password: dataPassword});
      if (result.data.length) {
        setOpenLogin(false);
        loginUser(result.data[0])
      }
    } catch (err) {
      prompt(String(err));
    }
  };

  const handleCloseLogout = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    logoutUser({})
    setAnchorElUser(null);
  };


  return (
    <header className='header container'>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Typography className='logo' variant="h6" noWrap component="a" href="/">Shop</Typography>


            {user.email
              ? (
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={(event) => handleOpenUserMenu({event: event})} sx={{p: 0}}>
                      <Avatar alt="Remy Sharp" src={String(user.avatar)}/>
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={() => setAnchorElUser(null)}
                  >
                    <MenuItem onClick={(event) => handleCloseLogout(event)}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )
              : <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <MenuItem>
                  <Typography className='typography' textAlign="center"
                              onClick={() => setOpenRegister(true)}>Register</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography className='typography' textAlign="center"
                              onClick={() => setOpenLogin(true)}>Login</Typography>
                </MenuItem>

                <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
                  <DialogTitle>Login</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To login to this website, please enter your email address and password here.
                    </DialogContentText>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="emailLogin"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                      value={dataEmail}
                      onChange={(event) => setDataEmail(event.target.value)}
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="passwordLogin"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      value={dataPassword}
                      onChange={(event) => setDataPassword(event.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenLogin(false)}>Cancel</Button>
                    <Button onClick={handleCloseLogin}>Login</Button>
                  </DialogActions>
                </Dialog>


                <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
                  <DialogTitle>Register</DialogTitle>
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
                      onChange={(event) => setNewUser({...newUser, name:event.target.value})}
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
                      onChange={(event) => setNewUser({...newUser, email:event.target.value})}
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
                      onChange={(event) => setNewUser({...newUser, password:event.target.value})}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenRegister(false)}>Cancel</Button>
                    <Button onClick={() => handleAddNewUser()}>Register</Button>
                  </DialogActions>
                </Dialog>
              </Box>
            }

          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;