import { ApiJob } from './apiJobInterface';

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  description?: string;
  url: string;
  image?: string;
  employmentType?: string;
  salary?: string;
}

export const mapApiJobToJob = (apiJob: ApiJob): Job => ({
  id: apiJob.job_id,
  title: apiJob.job_title,
  company: apiJob.employer_name,
  location: apiJob.job_location,
  description: apiJob.job_description,
  url: apiJob.apply_link,
  image: apiJob.employer_logo,
  employmentType: apiJob.job_employment_type,
  //salary: apiJob.salary,
});

