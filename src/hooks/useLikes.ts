'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types/jobsMapper';

export function useLikes() {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedJobs');
    if (storedLikes) {
      setLikedJobs(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    if (likedJobs.length > 0) {
      localStorage.setItem('likedJobs', JSON.stringify(likedJobs));
    } else {
      localStorage.removeItem('likedJobs');
    }
  }, [likedJobs]);

  const addLike = (job: Job) => {
    setLikedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev; 
      return [...prev, job];
    });
  };

  const removeLike = (jobId: string) => {
    setLikedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const isLiked = (jobId: string) => likedJobs.some((j) => j.id === jobId);

  return { likedJobs, addLike, removeLike, isLiked };
}