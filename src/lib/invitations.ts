export interface StudentInvitation {
  id: string;
  mentor: {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
    company: string;
    skills: string[];
    bio: string;
    experience: string;
    rating: number;
    reviewCount: number;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
  };
  project: {
    title: string;
    type: 'Internship' | 'Project' | 'Mentorship';
    description: string;
  };
  dateInvited: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  message?: string;
}

export const mockInvitations: StudentInvitation[] = [
  {
    id: 'inv-1',
    mentor: {
      id: 'mentor-1',
      name: 'Sarah Chen',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      role: 'Senior Software Engineer',
      company: 'Google',
      skills: ['React', 'TypeScript', 'Node.js', 'System Design'],
      bio: 'Passionate about building scalable web applications and mentoring the next generation of developers.',
      experience: '6+ years',
      rating: 4.9,
      reviewCount: 23,
      linkedinUrl: 'https://linkedin.com/in/sarahchen',
      githubUrl: 'https://github.com/sarahchen',
      portfolioUrl: 'https://sarahchen.dev'
    },
    project: {
      title: 'Full-Stack E-commerce Platform',
      type: 'Project',
      description: 'Build a modern e-commerce platform with React, Node.js, and MongoDB. Learn about payment integration, user authentication, and scalable architecture.'
    },
    dateInvited: '2024-01-25T10:30:00Z',
    status: 'Pending',
    message: 'I saw your portfolio and I think you\'d be a great fit for this project!'
  },
  {
    id: 'inv-2',
    mentor: {
      id: 'mentor-2',
      name: 'Alex Rodriguez',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      role: 'Product Designer',
      company: 'Figma',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      bio: 'Design leader focused on creating intuitive user experiences. Love helping designers grow their skills.',
      experience: '5+ years',
      rating: 4.8,
      reviewCount: 18,
      linkedinUrl: 'https://linkedin.com/in/alexrodriguez',
      portfolioUrl: 'https://alexdesigns.com'
    },
    project: {
      title: 'Mobile App UI/UX Design',
      type: 'Internship',
      description: 'Join our design team to create beautiful and functional mobile app interfaces. Learn design systems, user research, and prototyping.'
    },
    dateInvited: '2024-01-22T14:15:00Z',
    status: 'Accepted'
  },
  {
    id: 'inv-3',
    mentor: {
      id: 'mentor-3',
      name: 'David Kim',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      role: 'Data Scientist',
      company: 'Meta',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      bio: 'ML engineer passionate about AI and its applications. Experienced in mentoring students in data science.',
      experience: '4+ years',
      rating: 4.7,
      reviewCount: 15,
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      githubUrl: 'https://github.com/davidkim'
    },
    project: {
      title: 'AI-Powered Recommendation System',
      type: 'Project',
      description: 'Develop a machine learning model for personalized recommendations. Learn about data preprocessing, model training, and deployment.'
    },
    dateInvited: '2024-01-20T09:45:00Z',
    status: 'Declined'
  },
  {
    id: 'inv-4',
    mentor: {
      id: 'mentor-4',
      name: 'Emily Wang',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      role: 'Frontend Developer',
      company: 'Airbnb',
      skills: ['Vue.js', 'CSS', 'JavaScript', 'Responsive Design'],
      bio: 'Frontend specialist with a passion for creating beautiful, accessible web experiences.',
      experience: '3+ years',
      rating: 4.9,
      reviewCount: 21,
      linkedinUrl: 'https://linkedin.com/in/emilywang',
      portfolioUrl: 'https://emilywang.design'
    },
    project: {
      title: 'Interactive Web Portfolio',
      type: 'Mentorship',
      description: 'Create a stunning personal portfolio website with modern animations and responsive design. Perfect for showcasing your work.'
    },
    dateInvited: '2024-01-18T16:20:00Z',
    status: 'Pending'
  }
];

export const getInvitationsByStatus = (status?: string) => {
  if (!status || status === 'All') {
    return mockInvitations;
  }
  return mockInvitations.filter(invitation => invitation.status === status);
};