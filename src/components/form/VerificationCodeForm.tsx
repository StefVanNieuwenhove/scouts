'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { z } from 'zod';
import { VerificationCodeSchema } from '@/lib/validation';

type VerificationCodeFormProps = {
  handleSubmit: (data: z.infer<typeof VerificationCodeSchema>) => void;
};

const VerificationCodeForm = ({ handleSubmit }: VerificationCodeFormProps) => {
  const form = useForm<z.infer<typeof VerificationCodeSchema>>({
    resolver: zodResolver(VerificationCodeSchema),
    defaultValues: {
      code: '',
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full flex flex-col items-center md:max-w-prose border border-primary rounded-md px-10 py-5 space-y-5 h-fit'>
          <FormField
            name='code'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    autoFocus
                    pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full'>Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default VerificationCodeForm;
