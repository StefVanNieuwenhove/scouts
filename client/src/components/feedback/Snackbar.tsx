import { useCallback, useEffect } from 'react';
import { IoCloseCircleOutline, IoWarningOutline } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdReportGmailerrorred } from 'react-icons/md';
import { SnackbarProps } from '../../types';

const Snackbar = ({
  open,
  message,
  type,
  autoHideDuration = 5000, // default duration
  position = 'br', // default position
  onClose,
  transition = 'fade', // default transition
}: SnackbarProps) => {
  useEffect(() => {
    let timer: number;
    if (open && autoHideDuration) {
      timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
    }
    return () => clearTimeout(timer);
  }, [open, autoHideDuration, onClose]);

  const handleClose = () => {
    onClose();
  };

  const typeClasses = useCallback((type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-600 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'success':
        return 'bg-green-600 text-white';
      default:
        return 'bg-green-600 text-white';
    }
  }, []);

  const positionClasses = useCallback((position: string) => {
    switch (position) {
      case 'tl':
        return 'top-0 left-0';
      case 'tr':
        return 'top-0 right-0';
      case 'bl':
        return 'bottom-0 left-0';
      case 'br':
        return 'bottom-0 right-0';
      default:
        return 'bottom-0 right-0';
    }
  }, []);

  const transitionClasses = useCallback((transition: string) => {
    switch (transition) {
      case 'slide':
        return 'transform transition transition-transform ease-in-out delay-1000';
      case 'fade':
        return 'transform transition transition-opacity ease-in-out delay-1000';
      default:
        return 'transform transition transition-opacity ease-in-out delay-1000';
    }
  }, []);

  const showIcon = useCallback((type: string) => {
    switch (type) {
      case 'success':
        return <IoMdCheckmarkCircleOutline className='text-white text-2xl' />;
      case 'warning':
        return <IoWarningOutline className='text-white text-2xl' />;
      case 'error':
        return <MdReportGmailerrorred className='text-white text-2xl' />;
      default:
        return <IoMdCheckmarkCircleOutline className='text-white text-2xl' />;
    }
  }, []);

  return (
    <>
      <div
        className={`${open ? 'fixed m-2' : 'hidden'} ${positionClasses(
          position
        )} ${transitionClasses(transition)}`}>
        <div
          id='toast-simple'
          className={`flex items-center w-full max-w-xs p-4 space-x-4 rounded-lg shadow border-l-4 ${typeClasses(
            type
          )}`}
          role='alert'>
          <div className=' flex items-center justify-center'>
            <i className='px-2'>{showIcon(type)}</i>
            <div className='flex items-center justify-center gap-4'>
              <div className='ps-4 text-sm font-normal px-3'>{message}</div>
              <button onClick={handleClose}>
                <IoCloseCircleOutline className='text-white text-2xl opacity-60' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Snackbar;
