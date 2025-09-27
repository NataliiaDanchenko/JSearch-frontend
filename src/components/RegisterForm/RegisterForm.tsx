'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRegister } from '@/hooks/useRegister';
import * as Yup from 'yup';

export default function RegisterForm() {
  const { mutate, isPending, isError, data } = useRegister();

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    desiredJobTitle: Yup.string().required('Required'),
    about: Yup.string().max(500, 'Maximum 500 characters'),
  });

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow rounded'>
      <h2 className='text-2xl font-bold mb-4'>Registration</h2>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          desiredJobTitle: '',
          about: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutate(values)}
      >
        <Form className='space-y-4'>
          <div>
            <label className='block font-medium'>Name</label>
            <Field
              name='name'
              type='text'
              className='w-full border p-2 rounded'
              placeholder='Name'
            />
            <ErrorMessage
              name='name'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <div>
            <label className='block font-medium'>Email</label>
            <Field
              name='email'
              type='email'
              className='w-full border p-2 rounded'
              placeholder='Email'
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
              placeholder='Password'
            />
            <ErrorMessage
              name='password'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <div>
            <label className='block font-medium'>Desired Job Title</label>
            <Field
              name='desiredJobTitle'
              type='text'
              className='w-full border p-2 rounded'
              placeholder='Desired Job Title'
            />
            <ErrorMessage
              name='desiredJobTitle'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <div>
            <label className='block font-medium'>About Me</label>
            <Field
              name='about'
              as='textarea'
              className='w-full border p-2 rounded'
              placeholder='Tell us about yourself'
              rows={4}
            />
            <ErrorMessage
              name='about'
              component='div'
              className='text-red-500 text-sm'
            />
          </div>

          <button
            type='submit'
            disabled={isPending}
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            {isPending ? 'Loading...' : 'Register'}
          </button>
        </Form>
      </Formik>

      {isError && (
        <div className='mt-4 text-center text-red-500'>Registration failed</div>
      )}

      {data && (
        <div className='mt-4 text-center text-green-600'>{data.message}</div>
      )}
    </div>
  );
}
