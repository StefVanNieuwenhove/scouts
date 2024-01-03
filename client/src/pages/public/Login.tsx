import { useEffect } from 'react';
import { useAuth } from '../../context';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../components';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const { login, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    handleReset,
    values,
    errors,
    setErrors,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      await login(email, password)
        .then(() =>
          handleReset({
            values: {
              email: '',
              password: '',
            },
          })
        )
        .catch(() => {
          setErrors({ email: 'invalid email', password: 'invalid password' });
        });
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
        <div className='w-full bg-white rounded-lg border-teal-600 border shadow md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Sign in to your account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={(e) => handleSubmit(e)}>
              <div>
                <TextField
                  type='email'
                  value={values.email}
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  error={errors.email && touched.email ? errors.email : ''}
                  placeholder=''
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <TextField
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  label='Password'
                  error={
                    errors.password && touched.password ? errors.password : ''
                  }
                  onBlur={handleBlur}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-1 focus:bg-teal-700 focus:outline-none focus:underline font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                {isSubmitting ? 'Loading...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
