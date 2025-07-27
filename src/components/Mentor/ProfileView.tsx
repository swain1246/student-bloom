import React from "react";
import { Edit, MapPin, Briefcase, GraduationCap, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MentorProfile } from "@/types/mentor";

interface ProfileViewProps {
  profile: MentorProfile;
  onEdit: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEdit }) => {
  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-muted-foreground">{profile.profileCompletion}%</span>
          </div>
          <Progress value={profile.profileCompletion} className="h-2" />
          {profile.profileCompletion < 100 && (
            <p className="text-xs text-muted-foreground mt-2">
              Complete your profile to attract more students
            </p>
          )}
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.profilePicture} alt={profile.fullName} />
                <AvatarFallback>{profile.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-semibold">{profile.fullName}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Phone:</span>
                  <p>{profile.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location.city}, {profile.location.country}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Professional Details
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-sm">Current Role</span>
              <p>{profile.currentRole}</p>
            </div>
            <div>
              <span className="font-medium text-sm">Company</span>
              <p>{profile.companyName}</p>
            </div>
            <div>
              <span className="font-medium text-sm">Experience</span>
              <p>{profile.yearsOfExperience} years</p>
            </div>
          </div>
          <div>
            <span className="font-medium text-sm">Areas of Expertise</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.areasOfExpertise.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      {profile.education && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-medium text-sm">Degree</span>
                <p>{profile.education.degree}</p>
              </div>
              <div>
                <span className="font-medium text-sm">Institution</span>
                <p>{profile.education.institution}</p>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium text-sm">Graduated:</span>
                <span>{profile.education.graduationYear}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bio & Social */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bio & Social Links</CardTitle>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-medium text-sm">Bio</span>
            <p className="mt-1 text-muted-foreground">{profile.bio}</p>
          </div>
          <div className="flex flex-col gap-2">
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn Profile
              </a>
            )}
            {profile.portfolioUrl && (
              <a
                href={profile.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                Portfolio Website
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};