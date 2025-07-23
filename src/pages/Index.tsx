import StudentProfile from '@/components/StudentProfile';

// Sample student data
const sampleStudent = {
  name: 'Sarah Johnson',
  profileScore: 85,
  college: 'Massachusetts Institute of Technology',
  registrationNo: 'MIT2021CS001',
  gender: 'Female',
  dateOfBirth: '2001-03-15',
  email: 'sarah.johnson@student.mit.edu',
  phone: '+1 (555) 123-4567',
  location: 'Cambridge, Massachusetts',
  summary: 'Passionate computer science student with a focus on artificial intelligence and machine learning. Experienced in full-stack development and eager to contribute to innovative tech solutions.',
  education: [
    {
      id: '1',
      level: 'Bachelor\'s Degree',
      institution: 'Massachusetts Institute of Technology',
      year: '2021-2025',
      grade: '3.8 GPA'
    },
    {
      id: '2',
      level: 'XII (12th Grade)',
      institution: 'Cambridge High School',
      year: '2021',
      grade: '96%'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer Associate',
      issuer: 'Amazon Web Services',
      date: '2023-08-15'
    },
    {
      id: '2',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2023-06-10'
    }
  ],
  internships: [
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineering Intern',
      duration: 'Jun 2023 - Aug 2023',
      description: 'Developed machine learning models for search optimization, improving query response time by 15%.'
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'AI Research Intern',
      duration: 'Jan 2023 - May 2023',
      description: 'Worked on natural language processing projects using Python and TensorFlow.'
    }
  ],
  skills: [
    'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 
    'TensorFlow', 'AWS', 'MongoDB', 'Git', 'Docker', 'TypeScript', 'Java'
  ],
  projects: [
    {
      id: '1',
      title: 'AI-Powered Study Assistant',
      description: 'A web application that uses natural language processing to help students create personalized study plans and answer questions about their course materials.',
      techStack: ['React', 'Python', 'Flask', 'OpenAI API', 'PostgreSQL'],
      links: ['https://github.com/sarah/study-assistant', 'https://study-assistant-demo.vercel.app']
    },
    {
      id: '2',
      title: 'Smart Campus Navigation',
      description: 'Mobile app that provides real-time navigation within the MIT campus, including building information, room availability, and event scheduling.',
      techStack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
      links: ['https://github.com/sarah/campus-nav']
    }
  ],
  resume: {
    fileName: 'Sarah_Johnson_Resume_2024.pdf',
    uploadDate: '2024-01-15'
  }
};

const Index = () => {
  return <StudentProfile student={sampleStudent} />;
};

export default Index;