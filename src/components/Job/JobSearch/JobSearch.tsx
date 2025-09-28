'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { mapApiJobToJob, Job } from '@/types/jobsMapper';
import JobList from '@/components/Job/JobList/JobList';
import JobSearchForm from '@/components/Job/FormSearch/FormSearch';
import { useJobs } from '@/hooks/useJobs';
import { useProfile } from '@/hooks/useProfile';


function JobsSearchComponent() {
  const { profile } = useProfile();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recommendedQuery, setRecommendedQuery] = useState<string | null>(null);

  useEffect(() => {
    const desiredTitle = profile?.desiredJobTitle || null;
    if (desiredTitle !== recommendedQuery) {
      setRecommendedQuery(desiredTitle);
    }
  }, [profile, recommendedQuery]);

  const {
    jobs: searchJobs,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useJobs(searchQuery);

  const {
    jobs: recommendedJobs,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useJobs(recommendedQuery || '');

  const mappedSearchJobs: Job[] = useMemo(
    () => searchJobs.map(mapApiJobToJob),
    [searchJobs],
  );
  const mappedRecommendedJobs: Job[] = useMemo(
    () => recommendedJobs.map(mapApiJobToJob),
    [recommendedJobs],
  );

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
  };

  useEffect(() => {
    console.log(
      'JobsSearch: searchQuery:',
      searchQuery,
      'recommendedQuery:',
      recommendedQuery,
    );
  }, [searchQuery, recommendedQuery]);

  return (
    <div className='p-4 max-w-6xl mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>
        {profile ? 'Вакансії та рекомендації' : 'Пошук вакансій'}
      </h1>

      <JobSearchForm onSearch={handleSearch} initialQuery={searchQuery} />

      {!searchQuery && (
        <div className='mt-6 text-gray-600'>
          <p>Введіть запит у поле пошуку, щоб побачити вакансії.</p>
        </div>
      )}

      {searchQuery && (
        <div className='mt-6'>
          <h2 className='text-xl font-semibold mb-2 text-gray-800'>
            Результати пошуку: {searchQuery}
          </h2>

          {isSearchLoading && (
            <p className='text-gray-600'>Завантаження результатів...</p>
          )}
          {isSearchError && (
            <p className='text-red-500'>Помилка при завантаженні вакансій</p>
          )}
          {mappedSearchJobs.length === 0 &&
            !isSearchLoading &&
            !isSearchError && (
              <p className='text-gray-600'>
                {`Немає результатів для "${searchQuery}"`}
              </p>
            )}
          {mappedSearchJobs.length > 0 && <JobList jobs={mappedSearchJobs} />}
        </div>
      )}

      {searchQuery && recommendedQuery && (
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-2 text-blue-600'>
            Рекомендації на основі вашої бажаної посади: {recommendedQuery}
          </h2>

          {isRecommendedLoading && (
            <p className='text-gray-600'>Завантаження рекомендацій...</p>
          )}
          {isRecommendedError && (
            <p className='text-red-500'>
              Помилка при завантаженні рекомендацій
            </p>
          )}
          {mappedRecommendedJobs.length === 0 &&
            !isRecommendedLoading &&
            !isRecommendedError && (
              <p className='text-gray-600'>
                {`Немає рекомендацій для "${recommendedQuery}"`}
              </p>
            )}
          {mappedRecommendedJobs.length > 0 && (
            <JobList jobs={mappedRecommendedJobs} />
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(JobsSearchComponent);
