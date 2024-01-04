import { MouseEvent, useState } from 'react';

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event?: MouseEvent<HTMLElement>) => {
    event && setIsOpen(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(null);
  };

  return [isOpen, handleOpen, handleClose] as const;
};
