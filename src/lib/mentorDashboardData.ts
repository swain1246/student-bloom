export interface MentorProfile {
  id: string;
  name: string;
  profilePicture: string;
  bio: string;
  role: string;
  lastLogin: string;
}

export interface MentorStats {
  totalStudentsInvited: number;
  invitationsAccepted: number;
  ongoingMentorships: number;
  projectsPosted: number;
}

export interface StudentInvitation {
  id: string;
  studentName: string;
  projectTitle: string;
  dateInvited: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface ActiveMentorship {
  id: string;
  studentName: string;
  projectTitle: string;
  progressPercentage: number;
  startDate: string;
  nextMeeting?: string;
}

// Mock data
export const mockMentorProfile: MentorProfile = {
  id: "mentor-1",
  name: "Dr. Sarah Johnson",
  profilePicture: "/placeholder.svg",
  bio: "Senior Software Engineer with 10+ years of experience in full-stack development and mentoring.",
  role: "Senior Mentor",
  lastLogin: "2024-01-27T10:30:00Z"
};

export const mockMentorStats: MentorStats = {
  totalStudentsInvited: 45,
  invitationsAccepted: 32,
  ongoingMentorships: 8,
  projectsPosted: 12
};

export const mockRecentInvitations: StudentInvitation[] = [
  {
    id: "inv-1",
    studentName: "Alex Chen",
    projectTitle: "E-commerce Mobile App",
    dateInvited: "2024-01-25T14:30:00Z",
    status: "Pending"
  },
  {
    id: "inv-2",
    studentName: "Maria Rodriguez",
    projectTitle: "AI-Powered Study Assistant",
    dateInvited: "2024-01-24T09:15:00Z",
    status: "Accepted"
  },
  {
    id: "inv-3",
    studentName: "James Wilson",
    projectTitle: "Blockchain Voting System",
    dateInvited: "2024-01-23T16:45:00Z",
    status: "Pending"
  },
  {
    id: "inv-4",
    studentName: "Emily Davis",
    projectTitle: "Machine Learning Portfolio",
    dateInvited: "2024-01-22T11:20:00Z",
    status: "Rejected"
  },
  {
    id: "inv-5",
    studentName: "Michael Brown",
    projectTitle: "React Native Weather App",
    dateInvited: "2024-01-21T13:10:00Z",
    status: "Accepted"
  }
];

export const mockActiveMentorships: ActiveMentorship[] = [
  {
    id: "mentor-1",
    studentName: "Maria Rodriguez",
    projectTitle: "AI-Powered Study Assistant",
    progressPercentage: 75,
    startDate: "2024-01-15T00:00:00Z",
    nextMeeting: "2024-01-29T15:00:00Z"
  },
  {
    id: "mentor-2",
    studentName: "Michael Brown",
    projectTitle: "React Native Weather App",
    progressPercentage: 40,
    startDate: "2024-01-18T00:00:00Z",
    nextMeeting: "2024-01-30T10:30:00Z"
  },
  {
    id: "mentor-3",
    studentName: "Lisa Thompson",
    projectTitle: "Social Media Analytics Dashboard",
    progressPercentage: 90,
    startDate: "2024-01-10T00:00:00Z"
  }
];