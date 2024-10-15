import { CreateLeidingForm, DialogForm } from '@/components/form';
import { H2 } from '@/components/typography';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createleiding, getLeiding, updateLeiding } from '@/data-acces/leiding';
import { getTakValues } from '@/lib/utils';
import { CreateLeidingSchema } from '@/lib/validation';
import { UserSearch } from 'lucide-react';
import React from 'react';
import { z } from 'zod';

const EditLeidingPage = async () => {
  const leiding = await getLeiding();
  const takken = getTakValues();

  return (
    <>
      <main className='container mx-auto h-full w-full my-5'>
        <H2 className='underline'>Leidingsploeg - edit</H2>
        <section className='flex flex-col md:flex-row gap-4 my-5'>
          <Table className='border border-primary/30'>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center text-black underline'>
                  Naam
                </TableHead>
                <TableHead className='text-center text-black underline'>
                  Tak
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leiding?.map((leiding) => (
                <TableRow key={leiding.id}>
                  <TableCell className='text-center'>{leiding.name}</TableCell>
                  <TableCell className='text-center'>{leiding.tak}</TableCell>
                  <TableCell className='text-center'>
                    <DialogForm
                      title={`Bewerk ${leiding.name}`}
                      description={``}
                      icon={<UserSearch className='w-5 h-5' />}
                      variant={'ghost'}>
                      <CreateLeidingForm
                        handleSubmit={async (data) => {
                          'use server';
                          return await updateLeiding({ data, id: leiding.id });
                        }}
                        defaultValues={{
                          name: leiding.name,
                          email: leiding.email,
                          phone: leiding.phone,
                          totem: leiding.totem,
                          tak: leiding.tak,
                          takResponsible: leiding.takResponsible,
                          isGroepsleiding: leiding.groepsleiding,
                          image: leiding.image || '',
                        }}
                      />
                    </DialogForm>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className='text-center'>
                <TableCell colSpan={3}>
                  Aantal leiding: {leiding?.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <CreateLeidingForm
            title='Create new leiding'
            handleSubmit={async (data) => {
              'use server';
              return await createleiding(data);
            }}
            defaultValues={{
              name: '',
              email: '',
              phone: '',
              totem: '',
              tak: takken[0],
              takResponsible: false,
              isGroepsleiding: false,
              image: '',
            }}
          />
        </section>
      </main>
    </>
  );
};

export default EditLeidingPage;
