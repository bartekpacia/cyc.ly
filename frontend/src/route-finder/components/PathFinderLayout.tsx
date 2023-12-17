import { PropsWithChildren } from 'react';

import { Box, Divider, Stack, Typography } from '@mui/material';

import { Navigation } from './Navigation';

interface PathFinderLayoutProps {
  flexElement?: JSX.Element;
}

const PathFinderLayout = ({ children, flexElement }: PropsWithChildren<PathFinderLayoutProps>) => {
  return (
    
    <Stack minHeight='100vh'>
      <Navigation />
      {flexElement && (
        <Stack minHeight='100vh'>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            {flexElement}
          </Box>
        </Stack>
      )}

      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>

      <footer>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            padding: 2,
          }}
        >
          <Typography>© Cycly 2024</Typography>
          <Typography>Michał Bober</Typography>
          <Typography>Bartosz Bugla</Typography>
          <Typography>Bartłomiej Pacia</Typography>
          <Typography>Antoni Jaszcz</Typography>
        </Box>
      </footer>
    </Stack>
  );
};

export { PathFinderLayout };
