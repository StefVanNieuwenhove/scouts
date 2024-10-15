import { PropsWithChildren } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '../ui/button';

type DialogFormProps = PropsWithChildren & {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: ButtonProps['variant'];
};

const DialogForm = ({
  icon,
  title,
  description,
  children,
  variant,
}: DialogFormProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={variant} size={'icon'}>
            {icon}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogForm;
