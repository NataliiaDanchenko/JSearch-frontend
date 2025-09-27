'use client';

import React from 'react';
import { Job } from '@/types/jobsMapper';
import Link from 'next/link';
import { useLikes } from '@/hooks/useLikes';
import Image from 'next/image';

interface JobCardProps {
  job: Job;
  detailed?: boolean; 
}

const JobCard: React.FC<JobCardProps> = ({ job, detailed = false }) => {
  const { addLike, removeLike, isLiked } = useLikes();
  const liked = isLiked(job.id);

  const handleLike = () => {
    if (liked) {
      removeLike(job.id);
    } else {
      addLike(job);
    }
  };

  return (
    <div className='border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col'>
      <div className='w-full mb-4 relative aspect-[4/3] overflow-hidden rounded'>
        <Image
          src={job.image && job.image !== '' ? job.image : '/vercel.webp'}
          alt={job.title || 'Job Image'}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 400px' 
        />
      </div>

      <h3 className='text-lg font-bold mb-1'>{job.title}</h3>
      <p className='text-gray-600 mb-1'>{job.company}</p>
      <p className='text-gray-500 mb-1'>{job.location}</p>
      <p className='text-gray-500 mb-1'>Тип: {job.employmentType}</p>

      {!detailed && (
        <p className='text-gray-700 mb-4 line-clamp-3'>{job.description}</p>
      )}

      {detailed && (
        <div className='mt-4 space-y-3'>
          <h2 className='text-lg font-bold'>Опис вакансії</h2>
          <p className='text-gray-700 whitespace-pre-wrap'>{job.description}</p>
          <p className='text-gray-600'>
            <strong>Компанія:</strong> {job.company}
          </p>
          <p className='text-gray-600'>
            <strong>Місце розташування:</strong> {job.location}
          </p>
        </div>
      )}

      <div className='mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
        <a
          href={job.url}
          target='_blank'
          rel='noopener noreferrer'
          className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
          onClick={() => {
            alert('Application submitted');
          }}
        >
          Apply
        </a>
        {!detailed && (
          <Link
            href={`/job-details/${encodeURIComponent(job.id)}`}
            className='bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300'
          >
            Деталі
          </Link>
        )}
        <button
          onClick={handleLike}
          className={`px-3 py-1 rounded ${
            liked ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
          } hover:bg-opacity-80`}
        >
          {liked ? 'Delete like' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
