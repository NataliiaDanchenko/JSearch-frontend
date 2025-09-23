export interface ApiJob {
  job_id: string;
  job_title: string;
  employer_name: string;
  job_location?: string;
  job_description?: string;
  apply_link: string;
  employer_logo?: string;
  job_employment_type?: string;
}