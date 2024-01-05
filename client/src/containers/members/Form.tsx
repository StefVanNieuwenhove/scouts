import {
  Button,
  Container,
  SelectField,
  Snackbar,
  Spinner,
  TextField,
} from '../../components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createMember, getRolesOfMembers } from '../../api/members';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Tak } from '../../types';

const validationSchema = Yup.object({
  firstname: Yup.string().required('Voorname is verplicht'),
  lastname: Yup.string().required('Achternaam is verplicht'),
  id: Yup.string().required('Lidnummer is verplicht'),
  dateOfBirth: Yup.date().required('Gebortedatum is verplicht'),
  group: Yup.string().required('Tak is verplicht'),
  national_number: Yup.string().required('Rijksregisternummer is verplicht'),
});

const Form = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: getRolesOfMembers,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    handleReset,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      id: '',
      dateOfBirth: '',
      group: '',
      national_number: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      mutation.mutateAsync({
        firstname: values.firstname,
        lastname: values.lastname,
        member_id: values.id,
        date_of_birth: values.dateOfBirth,
        group: values.group.toLowerCase() as Tak,
        national_number: values.national_number,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: createMember,
    onError: () => {
      setSnackbar((prev) => ({
        ...prev,
        open: true,
        message: 'Error creating member',
        type: 'error',
      }));
      /*   handleReset({
        values: {
          firstname: '',
          lastname: '',
          id: '',
          dateOfBirth: '',
          tak: '',
          rijksregisternummer: '',
        },
      }); */
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'], exact: true });
      queryClient.setQueryData(['members', data.id], data),
        setSnackbar((prev) => ({
          ...prev,
          open: true,
          message: 'Successfully created',
          type: 'success',
        }));
      handleReset({
        values: {
          firstname: '',
          lastname: '',
          id: '',
          dateOfBirth: '',
          tak: '',
          rijksregisternummer: '',
        },
      });
    },
  });

  if (error) return <div>Something went wrong</div>;

  return (
    <>
      {isLoading && <Spinner />}
      {data && (
        <Container className='mt-4'>
          <form
            className='tabler-auto w-full md:w-2/3 min-w-sm p-4 mx-auto '
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
            <TextField
              type='text'
              name='firstname'
              label='Voornaam'
              value={values.firstname}
              onChange={handleChange}
              placeholder=''
              error={
                errors.firstname && touched.firstname ? errors.firstname : ''
              }
              onBlur={handleBlur}
              helperText='Voornaam van het lid'
              required
            />
            <TextField
              type='text'
              name='lastname'
              label='Achternaam'
              value={values.lastname}
              onChange={handleChange}
              placeholder=''
              error={errors.lastname && touched.lastname ? errors.lastname : ''}
              onBlur={handleBlur}
              helperText='Achternaam van het lid'
              required
            />
            <TextField
              type='date'
              name='dateOfBirth'
              label='Geboortedatum'
              value={values.dateOfBirth}
              onChange={handleChange}
              placeholder=''
              error={
                errors.dateOfBirth && touched.dateOfBirth
                  ? errors.dateOfBirth
                  : ''
              }
              onBlur={handleBlur}
              helperText='Geboortedatum van het lid'
              required
            />
            <TextField
              type='text'
              name='national_number'
              label='Rijksregisternummer'
              value={values.national_number}
              onChange={handleChange}
              placeholder=''
              error={
                errors.national_number && touched.national_number
                  ? errors.national_number
                  : ''
              }
              onBlur={handleBlur}
              helperText='Rijksregisternummer van het lid, lengte 11'
              required
            />
            <TextField
              type='text'
              name='id'
              label='Lidnummer'
              value={values.id}
              onChange={handleChange}
              placeholder=''
              error={errors.id && touched.id ? errors.id : ''}
              onBlur={handleBlur}
              helperText='Lidnummer van het lid, lengte 13'
              required
            />
            <SelectField
              name='group'
              value={values.group}
              values={data}
              onChange={handleChange}
              error={errors.group && touched.group ? errors.group : ''}
              helperText='Tak van het lid'
            />
            <div className='flex justify-between w-full'>
              <Button
                type='submit'
                name='Submit'
                color='slate-600'
                text='white'
                fullWidth
                rounded
              />
              <Button
                type='reset'
                name='Reset'
                color='slate-600'
                text='white'
                fullWidth
                rounded
                onClick={() =>
                  handleReset({
                    values: {
                      firstname: '',
                      lastname: '',
                      id: '',
                      dateOfBirth: '',
                      tak: '',
                      rijksregisternummer: '',
                    },
                  })
                }
              />
            </div>
          </form>
        </Container>
      )}
      <Snackbar
        {...snackbar}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default Form;
