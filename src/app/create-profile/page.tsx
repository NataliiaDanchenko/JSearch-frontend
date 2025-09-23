'use client';

import { useProfile } from '@/hooks/useProfile';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Ім'я обов'язкове").min(2, 'Мінімум 2 символи'),
  desiredJobTitle: Yup.string()
    .required("Бажана посада обов'язкова")
    .min(2, 'Мінімум 2 символи'),
  about: Yup.string().max(500, 'Максимум 500 символів'),
});

export default function CreateProfilePage() {
  const { profile, saveProfile } = useProfile();

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Створити профіль</h1>
      <Formik
        initialValues={{
          name: profile?.name || '',
          desiredJobTitle: profile?.desiredJobTitle || '',
          about: profile?.about || '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          saveProfile(values);
          alert('Профіль збережено!');
        }}
      >
        {() => (
          <Form className='space-y-4'>
            <div>
              <label htmlFor='name' className='block text-sm font-medium'>
                Ім&apos;я
              </label>
              <Field
                id='name'
                name='name'
                type='text'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='name'
                component='p'
                className='text-red-500 text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='desiredJobTitle'
                className='block text-sm font-medium'
              >
                Бажана посада
              </label>
              <Field
                id='desiredJobTitle'
                name='desiredJobTitle'
                type='text'
                className='w-full p-2 border rounded'
              />
              <ErrorMessage
                name='desiredJobTitle'
                component='p'
                className='text-red-500 text-sm'
              />
            </div>
            <div>
              <label htmlFor='about' className='block text-sm font-medium'>
                Про мене
              </label>
              <Field
                as='textarea'
                id='about'
                name='about'
                className='w-full p-2 border rounded'
                rows={4}
              />
              <ErrorMessage
                name='about'
                component='p'
                className='text-red-500 text-sm'
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Зберегти профіль
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
