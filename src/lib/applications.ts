export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Rejected' | 'Offer';
  jobType: string;
  location: string;
  salary?: string;
  jobId: string; // Reference to original job posting
}

export const mockApplications: Application[] = [
  {
    id: 'app-001',
    jobTitle: 'Frontend Developer Intern',
    company: 'TechCorp',
    appliedDate: '2024-01-20',
    status: 'Shortlisted',
    jobType: 'Internship',
    location: 'San Francisco, CA',
    salary: '$15-20/hour',
    jobId: 'job-001'
  },
  {
    id: 'app-002',
    jobTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    appliedDate: '2024-01-18',
    status: 'Interview',
    jobType: 'Full-time',
    location: 'Remote',
    salary: '$70,000 - $90,000',
    jobId: 'job-002'
  },
  {
    id: 'app-003',
    jobTitle: 'UI/UX Designer',
    company: 'DesignStudio',
    appliedDate: '2024-01-15',
    status: 'Applied',
    jobType: 'Full-time',
    location: 'New York, NY',
    salary: '$60,000 - $80,000',
    jobId: 'job-003'
  },
  {
    id: 'app-004',
    jobTitle: 'Data Science Intern',
    company: 'DataTech Inc',
    appliedDate: '2024-01-12',
    status: 'Rejected',
    jobType: 'Internship',
    location: 'Boston, MA',
    salary: '$18-22/hour',
    jobId: 'job-004'
  },
  {
    id: 'app-005',
    jobTitle: 'Software Engineer',
    company: 'BigTech Solutions',
    appliedDate: '2024-01-10',
    status: 'Offer',
    jobType: 'Full-time',
    location: 'Seattle, WA',
    salary: '$95,000 - $120,000',
    jobId: 'job-005'
  },
  {
    id: 'app-006',
    jobTitle: 'Backend Developer',
    company: 'CloudServices Co',
    appliedDate: '2024-01-08',
    status: 'Applied',
    jobType: 'Full-time',
    location: 'Austin, TX',
    salary: '$75,000 - $95,000',
    jobId: 'job-006'
  },
  {
    id: 'app-007',
    jobTitle: 'Marketing Intern',
    company: 'AdTech Agency',
    appliedDate: '2024-01-05',
    status: 'Shortlisted',
    jobType: 'Internship',
    location: 'Los Angeles, CA',
    salary: '$12-16/hour',
    jobId: 'job-007'
  },
  {
    id: 'app-008',
    jobTitle: 'Product Manager',
    company: 'Innovation Labs',
    appliedDate: '2024-01-03',
    status: 'Interview',
    jobType: 'Full-time',
    location: 'Chicago, IL',
    salary: '$85,000 - $110,000',
    jobId: 'job-008'
  },
  {
    id: 'app-009',
    jobTitle: 'DevOps Engineer',
    company: 'Infrastructure Pro',
    appliedDate: '2024-01-01',
    status: 'Applied',
    jobType: 'Full-time',
    location: 'Denver, CO',
    salary: '$80,000 - $100,000',
    jobId: 'job-009'
  },
  {
    id: 'app-010',
    jobTitle: 'Quality Assurance Intern',
    company: 'TestingSolutions',
    appliedDate: '2023-12-28',
    status: 'Rejected',
    jobType: 'Internship',
    location: 'Phoenix, AZ',
    salary: '$14-18/hour',
    jobId: 'job-010'
  },
  {
    id: 'app-011',
    jobTitle: 'Mobile App Developer',
    company: 'MobileFirst Inc',
    appliedDate: '2023-12-25',
    status: 'Applied',
    jobType: 'Full-time',
    location: 'Miami, FL',
    salary: '$70,000 - $90,000',
    jobId: 'job-011'
  },
  {
    id: 'app-012',
    jobTitle: 'Cybersecurity Analyst',
    company: 'SecureNet Systems',
    appliedDate: '2023-12-22',
    status: 'Shortlisted',
    jobType: 'Full-time',
    location: 'Washington, DC',
    salary: '$75,000 - $95,000',
    jobId: 'job-012'
  }
];

export const getApplications = (): Application[] => {
  return mockApplications.sort((a, b) => 
    new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
  );
};

export const getApplicationById = (id: string): Application | undefined => {
  return mockApplications.find(app => app.id === id);
};