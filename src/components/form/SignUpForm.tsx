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
import { z } from 'zod';
import { SignUpSchema } from '@/lib/validation';
import { Input } from '../ui/input';
import { H2, Small } from '../typography';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

type SignUpFormProps = {
  handleSubmit: (data: z.infer<typeof SignUpSchema>) => void;
};

const SignUpForm = ({ handleSubmit }: SignUpFormProps) => {
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      checkPassword: '',
    },
  });

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
            <H2 className=' text-center uppercase'>Sign up</H2>
          </div>
          <div className='w-full flex flex-col md:flex-row gap-5'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>
                    Naam <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>
                    Familienaam <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <FormField
            control={form.control}
            name='checkPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Herhaal wachtwoord <span className='text-red-500'>*</span>
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
            Heb je al een account?{' '}
            <span className='text-primary hover:underline hover:cursor-pointer'>
              <Link href={'/sign-in'}>Sign in</Link>
            </span>
          </Small>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
