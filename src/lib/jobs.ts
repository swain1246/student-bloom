export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  skills: string[];
  postedBy: string;
  postedDate: string;
  applicationDeadline: string;
  companyLogo?: string;
  isRemote: boolean;
  customQuestions?: string[];
}

export type JobType = 'Fresher' | '1+ years' | '2-3 years' | '3-5 years' | '5+ years';

export type TimeFilter = 'last24h' | 'last7days' | 'last30days' | 'all';

export interface JobFilters {
  skills: string[];
  timeFilter: TimeFilter;
  jobTypes: JobType[];
  searchQuery: string;
}

export interface JobApplication {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  customAnswers: Record<string, string>;
}

// Dummy job data
export const dummyJobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Fresher',
    experience: '0-1 years',
    salary: '$60,000 - $80,000',
    description: 'Join our dynamic team as a Frontend Developer Intern. You will work on cutting-edge web applications using React, TypeScript, and modern development tools. This is an excellent opportunity to gain hands-on experience in a fast-paced startup environment.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      'Strong knowledge of JavaScript and React',
      'Familiarity with HTML5, CSS3, and responsive design',
      'Basic understanding of version control (Git)',
      'Excellent problem-solving skills'
    ],
    skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
    postedBy: 'Sarah Manager',
    postedDate: '2024-01-20',
    applicationDeadline: '2024-02-15',
    isRemote: false,
    customQuestions: [
      'Why are you interested in frontend development?',
      'Describe a challenging project you\'ve worked on.'
    ]
  },
  {
    id: '2',
    title: 'Data Science Intern',
    company: 'DataTech Analytics',
    location: 'New York, NY',
    type: 'Fresher',
    experience: '0-1 years',
    salary: '$70,000 - $90,000',
    description: 'Work with our data science team to analyze large datasets, build predictive models, and create data visualizations. You\'ll use Python, SQL, and machine learning libraries to solve real-world business problems.',
    requirements: [
      'Degree in Data Science, Statistics, or related field',
      'Proficiency in Python and SQL',
      'Knowledge of machine learning algorithms',
      'Experience with data visualization tools',
      'Strong analytical and communication skills'
    ],
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas'],
    postedBy: 'John Data',
    postedDate: '2024-01-18',
    applicationDeadline: '2024-02-10',
    isRemote: true,
    customQuestions: [
      'What interests you most about data science?',
      'Describe your experience with machine learning projects.'
    ]
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    location: 'Austin, TX',
    type: '1+ years',
    experience: '1-2 years',
    salary: '$80,000 - $100,000',
    description: 'Looking for a passionate Full Stack Developer to join our team. You\'ll be responsible for developing both frontend and backend components of our web applications using Node.js, React, and MongoDB.',
    requirements: [
      'Bachelor\'s degree in Computer Science',
      '1+ years of experience in web development',
      'Proficiency in Node.js and React',
      'Experience with databases (MongoDB, PostgreSQL)',
      'Knowledge of RESTful APIs and microservices'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
    postedBy: 'Tech Recruiter',
    postedDate: '2024-01-15',
    applicationDeadline: '2024-02-05',
    isRemote: false,
    customQuestions: [
      'Describe your experience with full-stack development.',
      'What is your preferred tech stack and why?'
    ]
  },
  {
    id: '4',
    title: 'AI/ML Engineer',
    company: 'FutureTech AI',
    location: 'Seattle, WA',
    type: '2-3 years',
    experience: '2-3 years',
    salary: '$100,000 - $130,000',
    description: 'Join our AI team to develop cutting-edge machine learning models and deploy them in production. Work with large-scale data processing, deep learning frameworks, and cloud technologies.',
    requirements: [
      'Master\'s degree in AI, ML, or Computer Science',
      '2+ years of experience in machine learning',
      'Proficiency in Python, TensorFlow, and PyTorch',
      'Experience with cloud platforms (AWS, GCP)',
      'Strong mathematical and statistical background'
    ],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'AWS', 'Deep Learning'],
    postedBy: 'AI Team Lead',
    postedDate: '2024-01-22',
    applicationDeadline: '2024-02-20',
    isRemote: true,
    customQuestions: [
      'Describe a complex ML project you\'ve worked on.',
      'How do you approach model optimization and deployment?'
    ]
  },
  {
    id: '5',
    title: 'Mobile App Developer',
    company: 'AppCraft Studios',
    location: 'Los Angeles, CA',
    type: '1+ years',
    experience: '1-3 years',
    salary: '$75,000 - $95,000',
    description: 'Develop innovative mobile applications for iOS and Android platforms using React Native. Collaborate with designers and backend developers to create seamless user experiences.',
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '1+ years of mobile development experience',
      'Proficiency in React Native or Flutter',
      'Knowledge of mobile UI/UX principles',
      'Experience with mobile app deployment'
    ],
    skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Firebase'],
    postedBy: 'Mobile Team Lead',
    postedDate: '2024-01-19',
    applicationDeadline: '2024-02-12',
    isRemote: false,
    customQuestions: [
      'What mobile platforms have you worked with?',
      'Describe your approach to mobile app performance optimization.'
    ]
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudScale Systems',
    location: 'Denver, CO',
    type: '2-3 years',
    experience: '2-4 years',
    salary: '$90,000 - $120,000',
    description: 'Manage and optimize our cloud infrastructure, implement CI/CD pipelines, and ensure system reliability and scalability. Work with containerization technologies and monitoring tools.',
    requirements: [
      'Bachelor\'s degree in Computer Science or Engineering',
      '2+ years of DevOps or Infrastructure experience',
      'Proficiency in Docker, Kubernetes, and CI/CD',
      'Experience with cloud platforms (AWS, Azure, GCP)',
      'Knowledge of infrastructure as code (Terraform, Ansible)'
    ],
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'Linux'],
    postedBy: 'Infrastructure Manager',
    postedDate: '2024-01-17',
    applicationDeadline: '2024-02-08',
    isRemote: true,
    customQuestions: [
      'Describe your experience with container orchestration.',
      'How do you approach infrastructure monitoring and alerting?'
    ]
  }
];

// All available skills for filtering
export const availableSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
  'Machine Learning', 'TensorFlow', 'PyTorch', 'AWS', 'Docker', 'Kubernetes',
  'SQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'Git', 'Linux', 'CSS', 'HTML',
  'Vue.js', 'Angular', 'Express', 'Django', 'Flask', 'Spring Boot',
  'React Native', 'Flutter', 'iOS', 'Android', 'Jenkins', 'Terraform',
  'Deep Learning', 'Data Science', 'Pandas', 'NumPy', 'Scikit-learn'
];

export const jobTypes: JobType[] = ['Fresher', '1+ years', '2-3 years', '3-5 years', '5+ years'];

export const timeFilterOptions = [
  { value: 'all' as TimeFilter, label: 'All Time' },
  { value: 'last24h' as TimeFilter, label: 'Last 24 Hours' },
  { value: 'last7days' as TimeFilter, label: 'Last 7 Days' },
  { value: 'last30days' as TimeFilter, label: 'Last 30 Days' }
];