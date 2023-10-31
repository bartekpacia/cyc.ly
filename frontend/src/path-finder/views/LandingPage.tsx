import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/core/api';
import { QueryKey } from '@/core/models';

const LandingPage = () => {
  const { data } = useQuery({
    queryKey: [QueryKey.User, 1],
    queryFn: () => api.users.readUserUsersIdGet(1),
  });

  return (
    <div>
      <Button>Hello world</Button> Landing page here
    </div>
  );
};

export default LandingPage;
