'use client';

// components/Job/JobCard/JobCard.tsx
import React from 'react';
import { Job } from '@/libs/jobsMapper';
import Link from 'next/link';
import { useLikes } from '@/hooks/useLikes';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { addLike, removeLike, isLiked } = useLikes();
  const liked = isLiked(job.id);

  const handleLike = () => {
    if (liked) {
      removeLike(job.id);
    } else {
      addLike(job);
    }
  };

  console.log('JobCard: Данные вакансии:', job);
  return (
    <div className='border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col'>
      <img
        src={job.image}
        alt={job.title}
        className='w-full h-40 object-cover rounded mb-4'
        onError={(e) => {
          e.currentTarget.src = '/default-logo.png';
        }}
      />
      <h3 className='text-lg font-bold mb-1'>{job.title}</h3>
      <p className='text-gray-600 mb-1'>{job.company}</p>
      <p className='text-gray-500 mb-1'>{job.location}</p>
      <p className='text-gray-500 mb-1'>Тип: {job.employmentType}</p>
      <p className='text-gray-500 mb-1'>Зарплата: {job.salary}</p>
      <p className='text-gray-700 mb-4 line-clamp-3'>{job.description}</p>
      <div className='mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
        <a
          href={job.url}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
        >
          Подать заявку
        </a>
        <Link
          href={`/job-details/${encodeURIComponent(job.id)}`}
          className='bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300'
        >
          Детали
        </Link>
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded ${
            liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-opacity-80`}
        >
          {liked ? 'Убрать лайк' : 'Лайк'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
