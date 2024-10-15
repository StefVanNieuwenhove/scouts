'use client';
import { CreateLeidingSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Tak } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getTakValues } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { H3 } from '../typography';
import { FormResponse } from '@/types';
import { toast } from 'sonner';

type CreateLeidingFormProps = {
  title?: string;
  defaultValues: z.infer<typeof CreateLeidingSchema>;
  handleSubmit: (
    data: z.infer<typeof CreateLeidingSchema>
  ) => Promise<FormResponse>;
};

const CreateLeidingForm = ({
  title,
  defaultValues,
  handleSubmit,
}: CreateLeidingFormProps) => {
  const takken = getTakValues();
  const form = useForm<z.infer<typeof CreateLeidingSchema>>({
    resolver: zodResolver(CreateLeidingSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof CreateLeidingSchema>) => {
    const response = await handleSubmit(data);
    if (response.type === 'success') {
      toast.success(response.message, {
        duration: 5000,
        richColors: true,
      });
    } else {
      toast.error(response.message, {
        duration: 5000,
        richColors: true,
      });
    }
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full md:max-w-prose border border-primary rounded-md px-10 py-5 space-y-5 h-fit'>
          {title && (
            <div className='w-full flex flex-col items-center justify-center space-y-2 border-b border-primary'>
              <H3 className=' text-center uppercase'>{title}</H3>
            </div>
          )}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Naam <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type='text' placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GSM <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type='text' />
                </FormControl>
                <FormDescription>Formaat: 0123456789</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='totem'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Totem <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input type='text' placeholder='John Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tak'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tak <span className='text-red-500'>*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecteer een tak' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {takken.map((tak) => (
                      <SelectItem value={tak} key={tak}>
                        {tak}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col md:flex-row gap-4'>
            <FormField
              control={form.control}
              name='takResponsible'
              render={({ field }) => (
                <FormItem className='space-x-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(true)
                          : field.onChange(false);
                      }}
                    />
                  </FormControl>
                  <FormLabel>Tak verantwoordelijke </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isGroepsleiding'
              render={({ field }) => (
                <FormItem className='space-x-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(true)
                          : field.onChange(false);
                      }}
                    />
                  </FormControl>
                  <FormLabel>Groepsleiding</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
        </form>
      </Form>
    </>
  );
};

export default CreateLeidingForm;
