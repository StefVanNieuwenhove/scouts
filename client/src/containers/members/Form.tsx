import { Button, Container, SelectField, TextField } from '../../components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createMember } from '../../api/members';
import { Tak } from '../../types';

const validationSchema = Yup.object({
  firstname: Yup.string().required('Voorname is verplicht'),
  lastname: Yup.string().required('Achternaam is verplicht'),
  id: Yup.string().required('Lidnummer is verplicht'),
  dateOfBirth: Yup.date().required('Gebortedatum is verplicht'),
  tak: Yup.string().required('Tak is verplicht'),
  rijksregisternummer: Yup.string().required(
    'Rijksregisternummer is verplicht'
  ),
});

const Form = () => {
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
      tak: '',
      rijksregisternummer: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      //console.log(values);
      await createMember({
        voornaam: values.firstname,
        achternaam: values.lastname,
        lidnummer: values.id,
        geboortedatum: values.dateOfBirth,
        tak: values.tak.toLowerCase() as Tak,
        rijksregisternummer: values.rijksregisternummer,
      }).catch((err) => console.log(err));
    },
  });

  return (
    <>
      <Container className='mt-4'>
        <form
          className='tabler-auto w-1/2 min-w-xs'
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
          />
          <TextField
            type='text'
            name='rijksregisternummer'
            label='Rijksregisternummer'
            value={values.rijksregisternummer}
            onChange={handleChange}
            placeholder=''
            error={
              errors.rijksregisternummer && touched.rijksregisternummer
                ? errors.rijksregisternummer
                : ''
            }
            onBlur={handleBlur}
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
          />
          <SelectField
            name='tak'
            value={values.tak}
            values={['Kapoenen', 'Wouters', 'Jonggivers', 'Givers', 'Jins']}
            onChange={handleChange}
            error={errors.tak && touched.tak ? errors.tak : ''}
          />
          <div className='flex justify-between w-full'>
            <Button
              type='submit'
              name='Submit'
              color='slate-600'
              text='white'
              fullWidth
              rounded
              onClick={() => handleSubmit()}
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
    </>
  );
};

export default Form;
