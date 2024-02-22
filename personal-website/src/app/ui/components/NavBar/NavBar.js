'use client';
import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Button, Tooltip, Container } from '@/app/lib/mui-material';
// import { MenuIcon } from '@/app/lib/mui-icons';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import "@/app/globals.css"

const pages = ['Projects', 'Personal', 'About'];
 
 export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{padding: "24"}}>
      {/* <Container maxWidth="xl"> */}
        <Toolbar disableGutters sx={{ justifyContent: 'flex-start' }}>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{textAlign: "center", color: 'primary.main'}}  textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Septimiu
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
            <Link className='customLink' key={page} href={`/${page.toLowerCase()}`} passHref >
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'text.primary',  display: 'block'}}
              >
                <h2>{page}</h2>
              </Button>

            </Link>

            
             
            ))}
          </Box>
        </Toolbar>
      {/* </Container> */}
    </AppBar>
  );
}