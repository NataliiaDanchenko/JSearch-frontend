'use client';

import { Formik, Form, Field } from 'formik';

interface JobSearchFormProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

export default function JobSearchForm({ onSearch, initialQuery }: JobSearchFormProps) {
  return (
    <Formik
      initialValues={{ query: initialQuery }}
      onSubmit={(values) => onSearch(values.query)}
    >
      {() => (
        <Form className='mb-4'>
          <div className='flex flex-col sm:flex-row gap-2'>
            <Field
              name='query'
              type='text'
              placeholder='Назва вакансії'
              className='w-full sm:flex-1 max-w-lg p-2 border rounded'
            />
            <button
              type='submit'
              className='w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Пошук
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
