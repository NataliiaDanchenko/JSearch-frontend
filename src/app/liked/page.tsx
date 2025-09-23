'use client';

import { useLikes } from '@/hooks/useLikes';
import JobList from '@/components/Job/JobList/JobList';

export default function LikedJobsPage() {
  const { likedJobs } = useLikes();

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Вподобані вакансії</h1>
      {likedJobs.length === 0 ? (
        <p>Ви ще не вподобали жодної вакансії.</p>
      ) : (
        <JobList jobs={likedJobs} />
      )}
    </div>
  );
}
