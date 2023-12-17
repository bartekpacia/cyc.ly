import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';

import logo from '@/assets/logo/icon-192.png';
import { useDialog } from '@/common/utils';

const pages: string[] = [];

const Navigation = () => {
  const [anchorEl, handleOpen, handleClose] = useDialog();

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href='/' alignItems='center' justifyContent='center' display='flex'>
            <Box
              component='img'
              src={logo}
              sx={{
                width: '45px',
                height: '45px',
                mr: 1,
              }}
            />
            <Typography variant='h6' noWrap component='span' marginRight={2}>
              Cycly
            </Typography>
          </Link>

          <Box
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}
          >
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpen}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleClose}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map(page => (
              <Typography component='a' key={page} onClick={handleClose} href='#'>
                {page}
              </Typography>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { Navigation };
