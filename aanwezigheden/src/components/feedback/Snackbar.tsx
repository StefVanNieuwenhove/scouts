import { memo, useEffect, useState } from 'react';
import { ISnackbar } from '../../types';

const Snackbar = memo(
  ({ open, message, type, position, duration }: ISnackbar) => {
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
      setIsVisible(open);
      if (open) {
        const timer = setTimeout(() => setIsVisible(false), duration);
        return () => clearTimeout(timer);
      }
    }, [open, duration]);

    if (!isVisible) return null;
    const getBackgroundColor = () => {
      switch (type) {
        case 'succes':
          return 'green';
        case 'error':
          return 'red';
        case 'warning':
          return 'orange';
        case 'info':
          return 'blue';
        default:
          return 'gray';
      }
    };
    const getPositionStyle = () => {
      switch (position) {
        case 'left':
          return { left: '20px' };
        case 'right':
          return { right: '20px' };
        case 'center':
          return { left: '50%', transform: 'translateX(-50%)' };
        default:
          return {};
      }
    };

    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          padding: '10px',
          backgroundColor: getBackgroundColor(),
          color: 'white',
          borderRadius: '5px',
          boxShadow: '0px 3px 5px rgba(0,0,0,0.3)',
          ...getPositionStyle(),
        }}>
        {message}
      </div>
    );
  }
);

export default Snackbar;
