'use client';

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
import { set, z } from 'zod';
import { SignInSchema } from '@/lib/validation';
import { Input } from '../ui/input';
import { H2, Small } from '../typography';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      if (!isLoaded) return;

      const { email, password } = data;

      await signIn.create({
        identifier: email,
        password,
      });

      setActive({ session: signIn.createdSessionId });

      router.push('/');

      toast.success('Login succesvol', {
        duration: 5000,
        richColors: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full md:max-w-prose border border-primary rounded-md px-10 py-5 space-y-5 h-fit'>
          <div className='w-full flex flex-col items-center justify-center space-y-2 border-b border-primary'>
            <Image
              src={'/img/scouts-logo.jpg'}
              alt='Scouts logo'
              width={50}
              height={50}
            />
            <H2 className=' text-center uppercase'>Sign In</H2>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john.doe@gmail.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Wachtwoord <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='**************'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full flex space-x-4 pb-3'>
            <Button
              className='w-full border-primary hover:underline'
              variant={'outline'}
              type='reset'
              disabled={form.formState.isSubmitting}
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button
              className='w-full hover:underline'
              type='submit'
              disabled={form.formState.isSubmitting}>
              Submit
            </Button>
          </div>
          <Small>
            Nog geen account?{' '}
            <span className='text-primary hover:underline hover:cursor-pointer'>
              <Link href={'/sign-up'}>Sign up</Link>
            </span>
          </Small>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
