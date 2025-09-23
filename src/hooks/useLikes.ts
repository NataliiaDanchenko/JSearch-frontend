// hooks/useLikes.ts
'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/libs/jobsMapper';

export function useLikes() {
  const [likedJobs, setLikedJobs] = useState<Job[]>([]);

  // Загружаем лайки из LocalStorage при монтировании
  useEffect(() => {
    const storedLikes = localStorage.getItem('likedJobs');
    if (storedLikes) {
      setLikedJobs(JSON.parse(storedLikes));
    }
  }, []);

  // Сохраняем лайки в LocalStorage при изменении
  useEffect(() => {
    if (likedJobs.length > 0) {
      localStorage.setItem('likedJobs', JSON.stringify(likedJobs));
    } else {
      localStorage.removeItem('likedJobs');
    }
  }, [likedJobs]);

  // Добавление вакансии в лайки
  const addLike = (job: Job) => {
    setLikedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev; // Избегаем дубликатов
      return [...prev, job];
    });
  };

  // Удаление вакансии из лайков
  const removeLike = (jobId: string) => {
    setLikedJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  // Проверка, лайкнута ли вакансия
  const isLiked = (jobId: string) => likedJobs.some((j) => j.id === jobId);

  return { likedJobs, addLike, removeLike, isLiked };
}