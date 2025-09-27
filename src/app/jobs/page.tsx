import JobsSearchPage from '@/components/Job/JobSearch/JobSearch';
import Link from 'next/link';

export default function JobsPage() {
  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <div className='mb-4 flex gap-4'>
        <Link href='/login' className='text-blue-500 hover:underline'>
          Login
        </Link>
        <Link href='/register' className='text-green-500 hover:underline'>
          Register
        </Link>
      </div>

      <JobsSearchPage />
    </div>
  );
}
