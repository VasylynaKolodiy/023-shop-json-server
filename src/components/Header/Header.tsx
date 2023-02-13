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
import {Link} from "react-router-dom";
import DialogLogin from "../DialogLogin/DialogLogin";

const Header = () => {

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

  const [openLogin, setOpenLogin] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [getUser] = useLazyGetUserQuery();
  const {loginUser, logoutUser} = useActions()
  const user = useAppSelector((state) => state.auth.user);
  const [newUser, setNewUser] = useState(initialUser)
  const [addNewUser] = useAddUserMutation();
  // const [addNewUser, {isError}] = useAddUserMutation();

  const handleOpenUserMenu = ({event}: { event: any }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    logoutUser({})
    setAnchorElUser(null);
  };

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
    <header className='header container'>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link className='logo' to="/">Shop</Link>
            {user.email
              ? (
                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex', alignItems: 'center', gap: 10}}}>
                  <div>Hello, {user.name}!</div>
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
                    <MenuItem onClick={(event) => handleLogout(event)}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              )
              : <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <MenuItem onClick={() => setOpenRegister(true)}>
                  <Typography className='typography' textAlign="center">Register</Typography>
                </MenuItem>
                <MenuItem onClick={() => setOpenLogin(true)}>
                  <Typography className='typography' textAlign="center">Login</Typography>
                </MenuItem>


                <DialogLogin openLogin = {openLogin} setOpenLogin={setOpenLogin}/>

                {/*<Dialog open={openLogin} onClose={() => handleCloseLogin()}>*/}
                {/*  <DialogTitle>Login</DialogTitle>*/}
                {/*  <DialogContent>*/}
                {/*    <DialogContentText>*/}
                {/*      To login to this website, please enter your email address and password here.*/}
                {/*    </DialogContentText>*/}

                {/*    <TextField*/}
                {/*      autoFocus*/}
                {/*      margin="dense"*/}
                {/*      id="emailLogin"*/}
                {/*      label="Email Address"*/}
                {/*      type="email"*/}
                {/*      fullWidth*/}
                {/*      variant="standard"*/}
                {/*      value={dataEmail}*/}
                {/*      onChange={(event) => setDataEmail(event.target.value)}*/}
                {/*    />*/}

                {/*    <TextField*/}
                {/*      autoFocus*/}
                {/*      margin="dense"*/}
                {/*      id="passwordLogin"*/}
                {/*      label="Password"*/}
                {/*      type="password"*/}
                {/*      fullWidth*/}
                {/*      variant="standard"*/}
                {/*      value={dataPassword}*/}
                {/*      onChange={(event) => setDataPassword(event.target.value)}*/}
                {/*    />*/}
                {/*  </DialogContent>*/}
                {/*  <DialogActions>*/}
                {/*    <Button onClick={() => handleCloseLogin()}>Cancel</Button>*/}
                {/*    <Button onClick={handleLogin}>Login</Button>*/}
                {/*  </DialogActions>*/}
                {/*</Dialog>*/}


                <Dialog open={openRegister} onClose={() => handleCloseRegister()}>
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
                    <Button onClick={() => handleCloseRegister()}>Cancel</Button>
                    <Button onClick={() => handleRegisterNewUser()}>Register</Button>
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