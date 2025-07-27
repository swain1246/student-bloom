import { MentorProfile } from "@/types/mentor";

export const mockMentorProfile: MentorProfile = {
  id: "mentor-1",
  fullName: "Sarah Chen",
  profilePicture: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
  email: "sarah.chen@techcorp.com",
  phone: "+1 (555) 123-4567",
  location: {
    city: "San Francisco",
    country: "USA"
  },
  currentRole: "Senior Software Engineer",
  companyName: "TechCorp Inc.",
  yearsOfExperience: "5+",
  areasOfExpertise: ["React", "Node.js", "TypeScript", "System Design", "Mentoring"],
  education: {
    degree: "M.S. Computer Science",
    institution: "Stanford University",
    graduationYear: 2018
  },
  bio: "Passionate software engineer with 6+ years of experience building scalable web applications. I love mentoring junior developers and helping them grow their careers. Specialized in full-stack development with modern JavaScript frameworks.",
  linkedinUrl: "https://linkedin.com/in/sarahchen",
  portfolioUrl: "https://sarahchen.dev",
  lastUpdated: new Date("2024-01-15"),
  profileCompletion: 95
};

export const expertiseOptions = [
  "React", "Vue.js", "Angular", "Node.js", "Python", "Java", "JavaScript", "TypeScript",
  "System Design", "Database Design", "DevOps", "AWS", "Docker", "Kubernetes",
  "UI/UX Design", "Product Management", "Data Science", "Machine Learning",
  "Mobile Development", "iOS", "Android", "Flutter", "React Native",
  "Mentoring", "Leadership", "Career Guidance", "Interview Preparation"
];

export const experienceOptions = [
  { value: "Fresher", label: "Fresher (0-1 years)" },
  { value: "1-2", label: "1-2 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5+", label: "5+ years" }
] as const;