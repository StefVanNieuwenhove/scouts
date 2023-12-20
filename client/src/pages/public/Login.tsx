import { useEffect } from 'react';
import { useAuth } from '../../context';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { login, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleReset, values } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await login(email, password).then(() =>
        handleReset({
          values: {
            email: '',
            password: '',
          },
        })
      );
    },
  });

  useEffect(() => {
    if (isSignedIn()) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <main className='bg-gray-50'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900'>
          <img
            className='w-8 h-8 mr-2'
            src='https://teralwina.be/wp-content/uploads/2014/10/de_heks2.png'
            alt='logo'
          />
          Scouts Ter Alwina
        </a>
        <div className='w-full bg-white rounded-lg border-lime-500 border shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Sign in to your account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={values.email}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  required
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
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-lime-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
