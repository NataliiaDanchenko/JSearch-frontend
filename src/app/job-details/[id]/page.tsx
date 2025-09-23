// app/job-details/[id]/page.tsx
import { fetchJobById } from '@/libs/jobsApi';
import { mapApiJobToJob, Job } from '@/libs/jobsMapper';
import JobCard from '@/components/Job/JobCard/JobCard';

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id); // Декодируем ID
  console.log('JobDetailsPage: Запрашиваем вакансию с ID:', decodedId);

  let apiJob = null;

  try {
    apiJob = await fetchJobById(decodedId);
  } catch (err) {
    console.error('Ошибка при загрузке деталей вакансии:', err);
    return (
      <div className='text-red-500 p-4'>
        Не удалось загрузить детали вакансии.
      </div>
    );
  }

  if (!apiJob) {
    console.log('JobDetailsPage: Вакансия не найдена для ID:', decodedId);
    return <div className='text-gray-700 p-4'>Вакансия не найдена.</div>;
  }

  const job: Job = mapApiJobToJob(apiJob);

  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <JobCard job={job} />
      <div className='mt-6 space-y-4'>
        <h2 className='text-lg font-bold'>Описание вакансии</h2>
        <p className='text-gray-700 whitespace-pre-wrap'>{job.description}</p>
        <p className='text-gray-600'>
          <strong>Тип занятости:</strong> {job.employmentType}
        </p>
        <p className='text-gray-600'>
          <strong>Зарплата:</strong> {job.salary}
        </p>
        <p className='text-gray-600'>
          <strong>Компания:</strong> {job.company}
        </p>
        <p className='text-gray-600'>
          <strong>Местоположение:</strong> {job.location}
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

// // app/job-details/[id]/page.tsx
// import { fetchJobById } from '@/libs/jobsApiServer';
// import { mapApiJobToJob, Job } from '@/libs/jobsMapper';
// import JobCard from '@/components/Job/JobCard/JobCard';

// interface JobDetailsPageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
//   let apiJob = null;

//   try {
//     apiJob = await fetchJobById(params.id);
//   } catch (err) {
//     return <div className='text-red-500 p-4'>Failed to load job details.</div>;
//   }

//   if (!apiJob) {
//     return <div className='text-gray-700 p-4'>Job not found.</div>;
//   }

//   const job: Job = mapApiJobToJob(apiJob);

//   return (
//     <div className='p-4 max-w-3xl mx-auto'>
//       {/* Карточка с базовой информацией */}
//       <JobCard job={job} />

//       {/* Расширенная информация */}
//       <div className='mt-6 space-y-4'>
//         <h2 className='text-lg font-bold'>Job Description</h2>
//         <p className='text-gray-700 whitespace-pre-wrap'>{job.description}</p>

//         {job.employmentType && (
//           <p className='text-gray-600'>
//             <strong>Employment Type:</strong> {job.employmentType}
//           </p>
//         )}

//         {job.salary && (
//           <p className='text-gray-600'>
//             <strong>Salary:</strong> {job.salary}
//           </p>
//         )}

//         <p className='text-gray-600'>
//           <strong>Company:</strong> {job.company}
//         </p>

//         <p className='text-gray-600'>
//           <strong>Location:</strong> {job.location}
//         </p>

//         <a
//           href={job.url}
//           target='_blank'
//           rel='noopener noreferrer'
//           className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
//         >
//           Apply
//         </a>
//       </div>
//     </div>
//   );
// }

// import { fetchJobById } from '@/libs/jobsApiServer';
// import { mapApiJobToJob, Job } from '@/libs/jobsMapper';
// import JobCard from '@/components/Job/JobCard/JobCard';

// interface JobDetailsPageProps {
//   params: { id: string };
// }

// export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
//   const apiJob = await fetchJobById(params.id);

//   if (!apiJob) return <div>Job not found</div>;

//   const job: Job = mapApiJobToJob(apiJob);

//   return (
//     <div className='p-4 max-w-3xl mx-auto'>
//       {/* Карточка с базовой информацией */}
//       <JobCard job={job} />

//       {/* Расширенная информация */}
//       <div className='mt-6 space-y-2'>
//         <h2 className='text-lg font-bold'>Description</h2>
//         <p className='text-gray-700 whitespace-pre-wrap'>{job.description}</p>

//         {job.employmentType && (
//           <p className='text-gray-600'>
//             <strong>Employment type:</strong> {job.employmentType}
//           </p>
//         )}
//         {job.salary && (
//           <p className='text-gray-600'>
//             <strong>Salary:</strong> {job.salary}
//           </p>
//         )}

//         <p className='text-gray-600'>
//           <strong>Company:</strong> {job.company}
//         </p>
//         <p className='text-gray-600'>
//           <strong>Location:</strong> {job.location}
//         </p>

//         <a
//           href={job.url}
//           target='_blank'
//           rel='noopener noreferrer'
//           className='mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
//         >
//           Apply
//         </a>
//       </div>
//     </div>
//   );
// }
