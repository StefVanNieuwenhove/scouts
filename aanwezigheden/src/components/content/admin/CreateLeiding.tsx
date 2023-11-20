import { memo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Snackbar } from '../../feedback';
import { ISnackbar } from '../../../types';
import { register } from '../../../api/user';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().min(3).max(20).required('Password is required'),
  role: Yup.string()
    .oneOf([
      'kapoen',
      'wouter',
      'jonggiver',
      'giver',
      'jin',
      'groepsleiding',
      'admin',
    ])
    .required('Required'),
});

const CreateLeiding = memo(() => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: '',
    duration: 5000,
    type: 'succes',
    position: 'right',
  });

  const { handleSubmit, handleChange, values, handleReset } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'kapoen',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { name, email, password, role } = values;
      await register(name, email, password, role)
        .then(() =>
          setSnackbar({
            open: true,
            message: 'Leiding succesfully created',
            duration: 5000,
            type: 'succes',
            position: 'right',
          })
        )
        .catch(() =>
          setSnackbar({
            open: true,
            message: 'Something went wrong',
            duration: 5000,
            type: 'error',
            position: 'right',
          })
        );
    },
  });

  return (
    <>
      <form
        className='space-y-4 md:space-y-6 px-8 py-8 lg:w-1/2 mx-auto'
        onSubmit={(e) => handleSubmit(e)}
        onReset={(e) => handleReset(e)}>
        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={values.name}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5'
            placeholder='John'
            required
            autoFocus
            tabIndex={1}
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={values.email}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5'
            placeholder='name@company.com'
            required
            tabIndex={2}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={values.password}
            onChange={handleChange}
            placeholder='••••••••'
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5'
            required
            tabIndex={3}
          />
        </div>
        <div>
          <label
            htmlFor='role'
            className='block mb-2 text-sm font-medium text-gray-900'>
            Role
          </label>
          <select
            name='role'
            id='role'
            value={values.role}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5'
            required
            tabIndex={4}>
            <option value='kapoen'>Kapoen</option>
            <option value='wouter'>Wouter</option>
            <option value='jonggiver'>Jonggiver</option>
            <option value='giver'>Giver</option>
            <option value='jin'>Jin</option>
            <option value='groepsleiding'>Groepsleiding</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div className='flex gap-1'>
          <button
            tabIndex={6}
            type='reset'
            className='w-full text-white bg-orange-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            Reset
          </button>
          <button
            tabIndex={5}
            type='submit'
            className='w-full text-white bg-lime-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            Create Leiding
          </button>
        </div>
      </form>
      <Snackbar {...snackbar} />
    </>
  );
});

export default CreateLeiding;
