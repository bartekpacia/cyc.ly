import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export interface LandingBoxProps {
  image: string;
  title: string;
}

export const LandingBox = ({ title, image }: LandingBoxProps) => {
  return (
    <Card sx={{ maxWidth: 350, width: '100%' }}>
      <CardMedia component='img' height='300' image={image} alt='green iguana' />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'></Typography>
      </CardContent>
    </Card>
  );
};
