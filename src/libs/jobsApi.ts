import axios from 'axios';
import { ApiJob } from '../types/apiJobInterface';

export async function fetchJobs(query: string): Promise<ApiJob[]> {
  if (!query.trim()) return [];
  const res = await fetch(`/api/jobs?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Server error');
  return res.json();
}

export async function fetchJobById(id: string): Promise<ApiJob | null> {
  const apiKey = process.env.JSEARCH_API_KEY;
  const apiHost = process.env.JSEARCH_API_HOST;

  if (!apiKey || !apiHost) {
    console.error('API key and host no exist');
    return null;
  }

  try {
    const response = await axios.get(`https://${apiHost}/job-details`, {
      params: {
        job_id: id,
        extended_publisher_details: 'false',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });
    const job: ApiJob | undefined = response.data.data?.[0];
    if (!job) {
      return null;
    }
    return job;
  } catch (err) {
    console.error('fetchJobById: Loading error:', err);
    if (axios.isAxiosError(err)) {
      console.error('fetchJobById: Детали ошибки Axios:', err.response?.data, err.response?.status);
    }
    return null;
  }
}



