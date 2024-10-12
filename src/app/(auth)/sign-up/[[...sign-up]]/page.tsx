'use client';

import { SignUpForm, VerificationCodeForm } from '@/components/form';
import { createUser } from '@/data-acces/users';
import { SignUpSchema, VerificationCodeSchema } from '@/lib/validation';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const SignUpPage = () => {
  const [pendingVerification, setPendingVerification] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    try {
      const { firstName, lastName, email, password } = data;

      if (!isLoaded) return;

      await signUp.create({
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      toast.success('Email verstuur met code', {
        duration: 5000,
        richColors: true,
      });
      setPendingVerification(true);
    } catch (error) {
      toast.error('Er is een fout opgetreden: ' + error, {
        richColors: true,
        duration: 5000,
      });
      console.log(error);
    }
  };

  const handleVerify = async (data: z.infer<typeof VerificationCodeSchema>) => {
    try {
      const { code } = data;

      if (!isLoaded) return;

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== 'complete') {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === 'complete') {
        // add user to db
        const { firstName, lastName, emailAddress, createdUserId } =
          completeSignUp;
        console.log({ firstName, lastName, emailAddress, createdUserId });
        const response = await createUser({
          id: createdUserId as string,
          firstName: firstName as string,
          lastName: lastName as string,
          email: emailAddress as string,
        });
        console.log(response);

        if (response.type === 'error') {
          toast.error(response.message, {
            duration: 5000,
            richColors: true,
          });
          return;
        }

        // set user as active
        await setActive({ session: completeSignUp.createdSessionId });

        toast.success('Account succesvol aangemaakt', {
          duration: 5000,
          richColors: true,
        });
        setPendingVerification(false);
        router.push('/');
      }
    } catch (error) {
      toast.error('Er is een fout opgetreden', {
        duration: 5000,
        richColors: true,
      });
      console.log(error);
    }
  };
  return (
    <main className='container mx-auto w-full h-screen flex justify-center py-5'>
      {!pendingVerification ? (
        <SignUpForm handleSubmit={handleSubmit} />
      ) : (
        <VerificationCodeForm handleSubmit={handleVerify} />
      )}
    </main>
  );
};

export default SignUpPage;
