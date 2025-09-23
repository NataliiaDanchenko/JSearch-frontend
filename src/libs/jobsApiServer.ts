import { ApiJob } from '../types/apiJobInterface';
import axios from 'axios';

export async function fetchJobById(id: string): Promise<ApiJob | null> {
  if (!id) return null;

  const apiKey = process.env.JSEARCH_API_KEY;
  const apiHost = process.env.JSEARCH_API_HOST;

  if (!apiKey || !apiHost) {
    console.error('API key or host not configured');
    return null;
  }

  try {
    const response = await axios.get(`https://${apiHost}/job-details`, {
      params: { job_id: id, country: 'us' },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
      timeout: 5000,
    });

    const job: ApiJob | undefined = response.data?.data?.[0];
    return job ?? null;
  } catch (err) {
    console.error('Error fetching job by ID:', err);
    return null;
  }
}







