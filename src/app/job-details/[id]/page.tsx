import { fetchJobById } from '@/libs/jobsApi';
import { mapApiJobToJob, Job } from '@/types/jobsMapper';
import JobCard from '@/components/Job/JobCard/JobCard';

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let apiJob = null;

  try {
    apiJob = await fetchJobById(decodedId);
  } catch (err) {
    console.error('Помилка завантаження деталей вакансії:', err);
    return (
      <div className='text-red-500 p-4'>
        Не вдалося завантажити деталі вакансії
      </div>
    );
  }

  if (!apiJob) {
    return <div className='text-gray-700 p-4'>Вакансію не знайдено</div>;
  }

  const job: Job = mapApiJobToJob(apiJob);

  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <JobCard job={job} detailed />
    </div>
  );
}
