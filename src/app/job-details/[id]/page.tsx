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
      <JobCard job={job} />
      <div className='mt-6 space-y-4'>
        <h2 className='text-lg font-bold'>Орис вакансії</h2>
        <p className='text-gray-700 whitespace-pre-wrap'>{job.description}</p>
        <p className='text-gray-600'>
          <strong>Тип зайнятості:</strong> {job.employmentType}
        </p>
        <p className='text-gray-600'>
          <strong>Зарплата:</strong> {job.salary}
        </p>
        <p className='text-gray-600'>
          <strong>Компанія:</strong> {job.company}
        </p>
        <p className='text-gray-600'>
          <strong>Місце розташування:</strong> {job.location}
        </p>
        <a
          href={job.url}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Подать заявку
        </a>
      </div>
    </div>
  );
}

