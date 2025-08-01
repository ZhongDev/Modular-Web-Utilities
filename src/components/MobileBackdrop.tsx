import React from 'react';

interface MobileBackdropProps {
  isVisible: boolean;
  onClose: () => void;
}

const MobileBackdrop: React.FC<MobileBackdropProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
      onClick={onClose}
      aria-label="Close sidebar"
    />
  );
};

export default MobileBackdrop;