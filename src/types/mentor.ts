export interface MentorProfile {
  id: string;
  // Personal Info
  fullName: string;
  profilePicture?: string;
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  
  // Professional Details
  currentRole: string;
  companyName: string;
  yearsOfExperience: 'Fresher' | '1-2' | '3-5' | '5+';
  areasOfExpertise: string[];
  
  // Education
  education?: {
    degree: string;
    institution: string;
    graduationYear: number;
  };
  
  // Bio & Social
  bio: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  
  // Metadata
  lastUpdated: Date;
  profileCompletion: number;
}

export interface MentorProfileFormData {
  fullName: string;
  profilePicture?: string;
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  currentRole: string;
  companyName: string;
  yearsOfExperience: 'Fresher' | '1-2' | '3-5' | '5+';
  areasOfExpertise: string[];
  education?: {
    degree: string;
    institution: string;
    graduationYear: number;
  };
  bio: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}