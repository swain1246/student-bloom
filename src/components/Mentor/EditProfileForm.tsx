import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUploader } from "./ImageUploader";
import { MentorProfile, MentorProfileFormData } from "@/types/mentor";
import { expertiseOptions, experienceOptions } from "@/lib/mentorProfile";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  profilePicture: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.object({
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
  }),
  currentRole: z.string().min(2, "Current role is required"),
  companyName: z.string().min(2, "Company name is required"),
  yearsOfExperience: z.enum(["Fresher", "1-2", "3-5", "5+"]),
  areasOfExpertise: z.array(z.string()).min(1, "At least one area of expertise is required"),
  education: z.object({
    degree: z.string().optional(),
    institution: z.string().optional(),
    graduationYear: z.number().optional(),
  }).optional(),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid portfolio URL").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  profile: MentorProfile;
  onSave: (data: MentorProfileFormData) => void;
  onCancel: () => void;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
  const [selectedExpertise, setSelectedExpertise] = React.useState<string[]>(profile.areasOfExpertise);
  const [newExpertise, setNewExpertise] = React.useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.fullName,
      profilePicture: profile.profilePicture,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      currentRole: profile.currentRole,
      companyName: profile.companyName,
      yearsOfExperience: profile.yearsOfExperience,
      areasOfExpertise: profile.areasOfExpertise,
      education: profile.education,
      bio: profile.bio,
      linkedinUrl: profile.linkedinUrl || "",
      portfolioUrl: profile.portfolioUrl || "",
    },
  });

  const handleAddExpertise = () => {
    if (newExpertise.trim() && !selectedExpertise.includes(newExpertise.trim())) {
      const updated = [...selectedExpertise, newExpertise.trim()];
      setSelectedExpertise(updated);
      form.setValue("areasOfExpertise", updated);
      setNewExpertise("");
    }
  };

  const handleRemoveExpertise = (expertise: string) => {
    const updated = selectedExpertise.filter((item) => item !== expertise);
    setSelectedExpertise(updated);
    form.setValue("areasOfExpertise", updated);
  };

  const onSubmit = (data: ProfileFormData) => {
    const formData: MentorProfileFormData = {
      fullName: data.fullName,
      profilePicture: data.profilePicture,
      email: data.email,
      phone: data.phone,
      location: {
        city: data.location.city,
        country: data.location.country,
      },
      currentRole: data.currentRole,
      companyName: data.companyName,
      yearsOfExperience: data.yearsOfExperience,
      areasOfExpertise: selectedExpertise,
      education: data.education && data.education.degree && data.education.institution && data.education.graduationYear
        ? {
            degree: data.education.degree,
            institution: data.education.institution,
            graduationYear: data.education.graduationYear,
          }
        : undefined,
      bio: data.bio,
      linkedinUrl: data.linkedinUrl || undefined,
      portfolioUrl: data.portfolioUrl || undefined,
    };
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <ImageUploader
                      currentImage={field.value}
                      onImageChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="currentRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Role *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Label>Areas of Expertise *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {selectedExpertise.map((expertise) => (
                  <Badge key={expertise} variant="secondary" className="flex items-center gap-1">
                    {expertise}
                    <button
                      type="button"
                      onClick={() => handleRemoveExpertise(expertise)}
                      className="ml-1 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Select onValueChange={setNewExpertise}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select an area of expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    {expertiseOptions
                      .filter((option) => !selectedExpertise.includes(option))
                      .map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={handleAddExpertise} disabled={!newExpertise}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle>Education (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="education.degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., B.Tech, M.Sc" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education.institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="University name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education.graduationYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graduation Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1950}
                        max={new Date().getFullYear()}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bio & Social */}
        <Card>
          <CardHeader>
            <CardTitle>Bio & Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio *</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Tell students about yourself, your experience, and what you can help them with..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://linkedin.com/in/username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://yourportfolio.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-1" />
            Save Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};