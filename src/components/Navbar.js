import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../assests/logo.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import { Block } from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const online=useSelector((state)=>state.user.online)
    const user=useSelector((state)=>state.user.user)
    const dispatch=useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
    const Navigate=useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    Navigate(link)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img alt='logo' src={Logo} style={{width:"50px",height:"50px",borderRadius:"50%",marginRight:"10px"}}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Amazon
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem key={"Home"} onClick={()=>{handleCloseNavMenu("/")}}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem key={"Home"} onClick={()=>{handleCloseNavMenu("/cart")}}>
                  <Typography textAlign="center">Cart</Typography>
                </MenuItem>
                <MenuItem key={"Home"} onClick={()=>{handleCloseNavMenu("/admin")}}>
                  <Typography textAlign="center">Admin</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Amazon
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                onClick={()=>{handleCloseNavMenu("/")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                onClick={()=>{handleCloseNavMenu("/cart")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Cart
              </Button>
              
              
              {online&&user.isAdmin&&<Button
                onClick={()=>{handleCloseNavMenu("/admin")}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Admin
              </Button>}
              
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
                
                {online&&<MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Button
                onClick={()=>{handleCloseNavMenu("/profile")}}
                sx={{  color: 'black', display: 'block' }}
              >
                Profile
              </Button>
              </Typography></MenuItem>}
                {!online&&<MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                    <Button
                onClick={()=>{handleCloseNavMenu("/register")}}
                sx={{  color: 'black', display: 'block' }}
              >
                Register
              </Button>
              </Typography></MenuItem>}
              {!online&&
              <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
              <Button
                onClick={()=>{handleCloseNavMenu("/signin")}}
                sx={{  color: 'black', display: 'block' }}
              >
                Login
              </Button>
              </Typography></MenuItem>}
              {online&&
              <MenuItem  onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
              <Button
                onClick={()=>{dispatch(logout());handleCloseNavMenu("/signin");}}
                sx={{  color: 'black', display: 'block' }}
              >
                logout
              </Button></Typography></MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
