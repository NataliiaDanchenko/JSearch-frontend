'use client';

import { Formik, Form, Field } from 'formik';
import { useRegister } from '@/hooks/useRegister';

export default function RegisterForm() {
  const { mutate, isPending, isError, data } = useRegister();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        desiredJobTitle: '',
        about: '',
      }}
      onSubmit={(values) => mutate(values)}
    >
      <Form>
        <Field name='name' placeholder='Name' />
        <Field name='email' type='email' placeholder='Email' />
        <Field name='password' type='password' placeholder='Password' />
        <Field name='desiredJobTitle' placeholder='Desired Job Title' />
        <Field name='about' placeholder='About Me' as='textarea' />

        <button type='submit' disabled={isPending}>
          {isPending ? 'Loading...' : 'Register'}
        </button>

        {isError && <p className='text-red-500'>Registration failed</p>}
        {data && <p className='text-green-600'>{data.message}</p>}
      </Form>
    </Formik>
  );
}
