import React, { useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ProfileView } from "@/components/Mentor/ProfileView";
import { EditProfileForm } from "@/components/Mentor/EditProfileForm";
import { mockMentorProfile } from "@/lib/mentorProfile";
import { MentorProfile, MentorProfileFormData } from "@/types/mentor";

export default function MentorProfilePage() {
  const [profile, setProfile] = useState<MentorProfile>(mockMentorProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (formData: MentorProfileFormData) => {
    // Calculate profile completion
    const calculateCompletion = (data: MentorProfileFormData): number => {
      let completed = 0;
      const total = 10; // Total number of key fields

      if (data.fullName) completed++;
      if (data.email) completed++;
      if (data.phone) completed++;
      if (data.location.city && data.location.country) completed++;
      if (data.currentRole) completed++;
      if (data.companyName) completed++;
      if (data.areasOfExpertise.length > 0) completed++;
      if (data.bio && data.bio.length >= 50) completed++;
      if (data.linkedinUrl) completed++;
      if (data.portfolioUrl || (data.education?.degree)) completed++;

      return Math.round((completed / total) * 100);
    };

    const updatedProfile: MentorProfile = {
      ...profile,
      ...formData,
      lastUpdated: new Date(),
      profileCompletion: calculateCompletion(formData),
    };

    setProfile(updatedProfile);
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handlePreviewAsPublic = () => {
    toast({
      title: "Public Preview",
      description: "This is how students will see your profile.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {isEditing ? "Edit Profile" : "My Profile"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing
                  ? "Update your information to help students find you"
                  : "Manage your mentor profile and information"
                }
              </p>
            </div>
          </div>
          
          {!isEditing && (
            <Button variant="outline" onClick={handlePreviewAsPublic}>
              <Eye className="h-4 w-4 mr-1" />
              Preview as Public
            </Button>
          )}
        </div>

        {/* Profile Content */}
        {isEditing ? (
          <EditProfileForm
            profile={profile}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <ProfileView
            profile={profile}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
}