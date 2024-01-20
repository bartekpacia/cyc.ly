import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Hidden,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';

import logo from '@/assets/logo/icon-192.png';
import { useDialog } from '@/common/utils';
import { routes } from '@/core/router';

const pages = [
  { name: 'Generate', href: routes.generateRoute() },
  { name: 'Routes', href: routes.routes() },
];

const Navigation = () => {
  const [anchorEl, handleOpen, handleClose] = useDialog();

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Stack direction='row' justifyContent='space-between' width='100%'>
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
            <Hidden smDown>
              {' '}
              <Stack direction='row' alignItems='center'>
                {pages.map(({ href, name }) => (
                  <Link href={href} textAlign='center'>
                    <MenuItem key={href} onClick={handleClose} sx={{ fontSize: 16 }}>
                      {name}
                    </MenuItem>
                  </Link>
                ))}
              </Stack>
            </Hidden>
            <Hidden smUp>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
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
                >
                  {pages.map(({ href, name }) => (
                    <Link href={href} textAlign='center'>
                      <MenuItem key={href} onClick={handleClose}>
                        {name}
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
            </Hidden>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export { Navigation };
