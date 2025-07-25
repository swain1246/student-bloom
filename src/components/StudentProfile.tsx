import React, { useState } from 'react';
import { 
  Edit, 
  Plus, 
  Trash2, 
  User, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code, 
  FolderOpen, 
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileEditModal } from './modals/ProfileEditModal';
import { EducationModal } from './modals/EducationModal';
import { CertificationModal } from './modals/CertificationModal';
import { InternshipModal } from './modals/InternshipModal';
import { SkillsModal } from './modals/SkillsModal';
import { ProjectModal } from './modals/ProjectModal';
import { ResumeUploadModal } from './modals/ResumeUploadModal';
import profileImage from '@/assets/student-profile.jpg';

interface StudentProfileProps {
  student: {
    name: string;
    profileScore: number;
    college: string;
    registrationNo: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    education: Array<{
      id: string;
      level: string;
      institution: string;
      year: string;
      grade: string;
    }>;
    certifications: Array<{
      id: string;
      name: string;
      issuer: string;
      date: string;
    }>;
    internships: Array<{
      id: string;
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
    skills: string[];
    projects: Array<{
      id: string;
      title: string;
      description: string;
      techStack: string[];
      links: string[];
    }>;
    resume?: {
      fileName: string;
      uploadDate: string;
    };
  };
}

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [showImageActions, setShowImageActions] = useState(false);

  const ScoreRing = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 20;
    const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;
    
    return (
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground">{score}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        {/* Quick Actions */}
        <div className="flex justify-end gap-3 mb-6">
          <Link to="/jobs">
            <Button className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <Search className="h-4 w-4" />
              Search Jobs
            </Button>
          </Link>
          <Link to="/applications">
            <Button variant="outline" className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
              <FileText className="h-4 w-4" />
              My Applications
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div 
                className="relative"
                onMouseEnter={() => setShowImageActions(true)}
                onMouseLeave={() => setShowImageActions(false)}
              >
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src={profileImage} alt={student.name} />
                  <AvatarFallback className="text-2xl bg-profile-gradient text-white">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {showImageActions && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{student.name}</h1>
                    <div className="flex items-center gap-4 mb-4">
                      <ScoreRing score={student.profileScore} />
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Score</p>
                        <p className="font-semibold">Complete your profile to increase score</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsProfileModalOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                {/* Profile Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">College</p>
                      <p className="font-medium">{student.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Registration No</p>
                      <p className="font-medium">{student.registrationNo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{student.gender}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">{student.dateOfBirth}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{student.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{student.location}</p>
                    </div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profile Summary</p>
                  <p className="text-foreground leading-relaxed">{student.summary}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education Section */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEducationModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {student.education.map((edu) => (
                <div key={edu.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{edu.level}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.year} • Grade: {edu.grade}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certification Section */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCertificationModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {student.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{cert.name}</p>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Internship Section */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Internships
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsInternshipModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {student.internships.map((internship) => (
                <div key={internship.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{internship.role}</p>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                    <p className="text-xs text-muted-foreground">{internship.duration}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSkillsModalOpen(true)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {student.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Projects
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsProjectModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {student.projects.map((project) => (
                <div key={project.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.techStack.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.links.map((link, index) => (
                      <a key={index} href={link} className="text-xs text-primary hover:underline">
                        View Project
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resume Upload Section */}
        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Resume
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsResumeModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {student.resume ? 'Update' : 'Upload'}
            </Button>
          </CardHeader>
          <CardContent>
            {student.resume ? (
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{student.resume.fileName}</p>
                    <p className="text-sm text-muted-foreground">Uploaded on {student.resume.uploadDate}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No resume uploaded yet</p>
                <p className="text-sm text-muted-foreground">Upload your resume to increase your profile score</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ProfileEditModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        student={student}
      />
      <EducationModal 
        isOpen={isEducationModalOpen} 
        onClose={() => setIsEducationModalOpen(false)}
      />
      <CertificationModal 
        isOpen={isCertificationModalOpen} 
        onClose={() => setIsCertificationModalOpen(false)}
      />
      <InternshipModal 
        isOpen={isInternshipModalOpen} 
        onClose={() => setIsInternshipModalOpen(false)}
      />
      <SkillsModal 
        isOpen={isSkillsModalOpen} 
        onClose={() => setIsSkillsModalOpen(false)}
        currentSkills={student.skills}
      />
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)}
      />
      <ResumeUploadModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default StudentProfile;