import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { ApiJob } from '@/types/apiJobInterface';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query?.trim()) {
    return NextResponse.json([]);
  }

  const apiKey = process.env.JSEARCH_API_KEY;
  const apiHost = process.env.JSEARCH_API_HOST;

  if (!apiKey || !apiHost) {
    console.error('JSEARCH_API_KEY or JSEARCH_API_HOST is not set');
    return NextResponse.json(
      { error: 'API key or host not configured' },
      { status: 500 }
    );
  }

  try {
    const url = `https://${apiHost}/search`;

    const response = await axios.get(url, {
      params: {
        query,
        page: 1,       
        num_pages: 1,
        country: 'us',
        date_posted: 'all',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost,
      },
    });

    const jobs: ApiJob[] = response.data?.data ?? [];
    return NextResponse.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    return NextResponse.json(
      { error: 'Error fetching jobs' },
      { status: 500 }
    );
  }
}



