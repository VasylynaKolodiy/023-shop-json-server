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
import {useLazyGetUserQuery} from "../../store/products/products.api";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = ({event}: { event: any }) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const [user, setUser] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [dataEmail, setDataEmail] = useState('')
  const [dataPassword, setDataPassword] = useState('')
  const [getUser, userState] = useLazyGetUserQuery();


  const handleCloseLogin = () => {
    setOpen(false);
    getUser({email: dataEmail, password: dataPassword})
    setUser(userState?.data)
  };
  console.log(user, 'user')
  return (
    <header className='header container'>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: {xs: 'none', md: 'flex'},
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              SHOP
            </Typography>


            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{my: 2, color: 'white', display: 'block'}}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {user
              ? (
                <Box sx={{flexGrow: 0}}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={(event) => handleOpenUserMenu({event: event})} sx={{p: 0}}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
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
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )
              : <div>
                <MenuItem onClick={handleClickOpen}>
                  <Typography className='typography' textAlign="center">LOGIN</Typography>
                </MenuItem>

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Login</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To login to this website, please enter your email address and password here.
                    </DialogContentText>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="email"
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
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      variant="standard"
                      value={dataPassword}
                      onChange={(event) => setDataPassword(event.target.value)}
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCloseLogin}>Login</Button>
                  </DialogActions>
                </Dialog>
              </div>
            }

          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;