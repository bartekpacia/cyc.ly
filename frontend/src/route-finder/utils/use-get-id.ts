import { useEffect, useState } from 'react';

const useGetID = () => {
  const [lastItemId, setLastItemId] = useState<string>('');

  useEffect(() => {
    // Get the current pathname
    const pathname = window.location.pathname;

    // Split the pathname by /
    const pathArray = pathname.split('/');

    // Get the last item in the array (excluding any empty strings)
    const lastItem = pathArray.filter(item => item !== '').pop();

    // Save the last item to the state
    setLastItemId(lastItem as string);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return lastItemId;
};

export default useGetID;
