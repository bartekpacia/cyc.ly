import { Link } from 'react-router-dom';

import { Button, Divider, Grow, Stack, Typography } from '@mui/material';

import heroImage from '@/assets/hero-image.jpg';
import typeOfBike from '@/assets/type-of-bike.jpg';
import waitForRoute from '@/assets/wait-for-route.jpg';
import { routes } from '@/core/router';

import { LandingBox } from '../components/LandingBox';
import { PathFinderLayout } from '../components/PathFinderLayout';

const LandingPage = () => {
  return (
    <PathFinderLayout
      flexElement={
        <Stack
          sx={{ flexGrow: 1 }}
          alignItems='center'
          justifyContent='center'
          gap={5}
          marginBottom={6}
        >
          {/* <Box
            sx={{
              position: 'absolute',
              top: '70%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 500,
              zIndex: -1,

              background:
                'radial-gradient(circle, rgba(238,174,202,0.5) 0%, rgba(148,187,233,0) 50%)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 500,
              zIndex: -1,

              background:
                'radial-gradient(circle, rgba(238,174,202,0.5) 0%, rgba(148,187,233,0) 50%)',
            }}
          /> */}
          <Grow in={true}>
            <Typography variant='h3' textAlign='center'>
              Cycly - Create your own unique path
            </Typography>
          </Grow>
          <Grow timeout={1000} in={true}>
            <Typography
              variant='h4'
              textAlign='center'
              sx={{
                display: { xs: 'none', md: 'flex' },
                // background: '-webkit-linear-gradient(#eee, #333)',
                // WebkitBackgroundClip: 'text',
                // WebkitTextFillColor: 'transparent',
              }}
            >
              Chart Your Course, Embrace Uniqueness
            </Typography>
          </Grow>
          <Grow timeout={2000} in={true}>
            <Link to={routes.generateRoute()}>
              <Button variant='contained'>Take me there!</Button>
            </Link>
          </Grow>
        </Stack>
      }
    >
      <Divider />
      <Stack justifyContent='center' alignItems='center' gap={5} padding={10}>
        <Typography variant='h3'>How It works</Typography>
        <Stack
          sx={{
            flexWrap: 'wrap',
            gap: 5,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <LandingBox image={typeOfBike} title='Enter your location and type of your bike' />
          <LandingBox image={waitForRoute} title='Wait until the system creates the route.' />
          <LandingBox image={heroImage} title='Enjoy the wonderful path chosen just for you.' />
        </Stack>
      </Stack>
    </PathFinderLayout>
  );
};

export default LandingPage;
