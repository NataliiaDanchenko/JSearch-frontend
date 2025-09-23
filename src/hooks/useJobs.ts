'use client';

import useSWR from "swr";
import { ApiJob } from "@/libs/apiJobInterface";

const fetcher = async (url: string): Promise<ApiJob[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ошибка сервера: ${res.statusText}`);
  }
  return res.json();
};

export function useJobs(query: string) {
  const shouldFetch = query.trim().length > 0;

  const { data, error, isValidating } = useSWR<ApiJob[]>(
    shouldFetch ? `/api/jobs?query=${encodeURIComponent(query)}` : null,
    fetcher
  );

  return {
    jobs: data ?? [],
    isLoading: !data && !error,
    isValidating,
    isError: !!error,
  };
}

