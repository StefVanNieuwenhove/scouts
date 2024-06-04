'use client';

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '@/lib/validation';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Label } from '../ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../ui/input-otp';

export default function SignUpForm() {
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) {
      return;
    }
    try {
      const { firstName, lastName, email, password } = values;
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      // Set 'verifying' true to display second form
      // and capture the OTP code
      setVerifying(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // Handle the submission of the verification form
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  // Display the verification form to capture the OTP code
  if (verifying) {
    return (
      <>
        <Card>
          <CardHeader className='flex flex-col sm:items-center'>
            <h2 className='text-xl font-bold'>Verify your email</h2>
          </CardHeader>
          <CardContent className='space-y-2'>
            <Label htmlFor='code'>Enter your verification code</Label>
            <InputOTP
              maxLength={6}
              id='code'
              name='code'
              value={code}
              onChange={(value) => setCode(value)}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button type='submit' className='w-full' onClick={handleVerify}>
              Verify
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

  // Display a form to capture the user's email and password
  return (
    <Card className='xl:w-1/3 md:w-1/2 shadow-md flex flex-col items-center justify-center dark:bg-transparent'>
      <CardHeader className='flex flex-col sm:items-center'>
        <h2 className='text-xl font-bold'>Create your account</h2>
        <p className='text-sm text-gray-500'>
          Welcome! Please fill in the details to get started.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-6 w-full rounded-lg dark:bg-transparent'>
            <div className='space-y-4'>
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='John' />
                      </FormControl>
                      <FormDescription className='text-xs pl-2'>
                        Enter your first name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='Doe' />
                      </FormControl>
                      <FormDescription className='text-xs pl-2'>
                        Enter your last name
                      </FormDescription>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='johndoe@gmail.com'
                      />
                    </FormControl>
                    <FormDescription className='text-xs pl-2'>
                      Enter your email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type='password' placeholder='******' />
                    </FormControl>
                    <FormDescription className='text-xs pl-2'>
                      Enter your password
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <Separator />
      <CardFooter>
        <p className='text-sm text-gray-500 pt-2'>
          Already have an account?{' '}
          <Link href='/sign-in' className='text-primary hover:underline'>
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
