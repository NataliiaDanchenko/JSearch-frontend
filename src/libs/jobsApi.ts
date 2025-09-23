// libs/jobsApi.ts
import axios from 'axios';
import { ApiJob } from './apiJobInterface';

export async function fetchJobs(query: string): Promise<ApiJob[]> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/jobs?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Ошибка сервера');
  return res.json();
}

export async function fetchJobById(id: string): Promise<ApiJob | null> {
  const apiKey = process.env.JSEARCH_API_KEY;
  const apiHost = process.env.JSEARCH_API_HOST;

  if (!apiKey || !apiHost) {
    console.error('API key или host не настроены');
    return null;
  }

  console.log('fetchJobById: Отправляем запрос с job_id:', id);

  try {
    const response = await axios.get(`https://${apiHost}/job-details`, {
      params: {
        job_id: id, // Передаем декодированный ID
        extended_publisher_details: 'false',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });

    console.log('fetchJobById: Ответ API:', response.data);
    const job: ApiJob | undefined = response.data.data?.[0];
    if (!job) {
      console.log(`fetchJobById: Вакансия не найдена для ID: ${id}`);
      return null;
    }
    return job;
  } catch (err) {
    console.error('fetchJobById: Ошибка при загрузке вакансии:', err);
    if (axios.isAxiosError(err)) {
      console.error('fetchJobById: Детали ошибки Axios:', err.response?.data, err.response?.status);
    }
    return null;
  }
}



