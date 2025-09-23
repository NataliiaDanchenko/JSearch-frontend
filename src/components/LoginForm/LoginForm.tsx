'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLogin, LoginValues } from '@/hooks/useLogin';

const LoginForm = () => {
  const { mutate: login, isPending, isError, data, error } = useLogin();

  const initialValues: LoginValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });

  const handleSubmit = (values: LoginValues) => {
    login(values, {
      onSuccess: (res) => {
        localStorage.setItem('token', res.token);
      },
    });
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow rounded'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className='space-y-4'>
          <div>
            <label className='block font-medium'>Email</label>
            <Field
              name='email'
              type='email'
              className='w-full border p-2 rounded'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <div>
            <label className='block font-medium'>Password</label>
            <Field
              name='password'
              type='password'
              className='w-full border p-2 rounded'
            />
            <ErrorMessage
              name='password'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='w-full bg-green-500 text-white p-2 rounded hover:bg-green-600'
          >
            {isPending ? 'Loading...' : 'Login'}
          </button>
        </Form>
      </Formik>

      {isError && (
        <div className='mt-4 text-center text-red-500'>
          {(error as any)?.response?.data?.message || 'Login failed'}
        </div>
      )}

      {data && (
        <div className='mt-4 text-center text-green-600'>
          Welcome back, {data.user.name}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
