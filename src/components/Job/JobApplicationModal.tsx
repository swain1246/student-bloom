import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job, JobApplication } from '@/lib/jobs';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, Building, MapPin } from 'lucide-react';

interface JobApplicationModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal = ({ job, isOpen, onClose }: JobApplicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<JobApplication>>({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    customAnswers: {}
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job) return;

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.resume) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume to apply.",
        variant: "destructive"
      });
      return;
    }

    // Check if all custom questions are answered
    if (job.customQuestions) {
      for (const question of job.customQuestions) {
        if (!formData.customAnswers?.[question]?.trim()) {
          toast({
            title: "Incomplete Application",
            description: "Please answer all application questions.",
            variant: "destructive"
          });
          return;
        }
      }
    }

    // Simulate application submission
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job.title} at ${job.company} has been submitted successfully.`,
    });

    // Reset form and close modal
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      customAnswers: {}
    });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleCustomAnswerChange = (question: string, answer: string) => {
    setFormData(prev => ({
      ...prev,
      customAnswers: {
        ...prev.customAnswers,
        [question]: answer
      }
    }));
  };

  if (!job) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Apply for Position</DialogTitle>
        </DialogHeader>

        {/* Job Summary */}
        <Card className="bg-muted/20">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{job.title}</CardTitle>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary">
                {job.type}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resume *</h3>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              {formData.resume ? (
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{formData.resume.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(formData.resume.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, resume: null }))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your resume (PDF or Word document)
                  </p>
                  <Label htmlFor="resume" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      Choose File
                    </Button>
                  </Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Maximum file size: 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cover Letter</h3>
            <Textarea
              value={formData.coverLetter || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
              placeholder="Write a brief cover letter explaining why you're interested in this position..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Custom Questions */}
          {job.customQuestions && job.customQuestions.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Questions *</h3>
              {job.customQuestions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`question-${index}`}>
                    {index + 1}. {question}
                  </Label>
                  <Textarea
                    id={`question-${index}`}
                    value={formData.customAnswers?.[question] || ''}
                    onChange={(e) => handleCustomAnswerChange(question, e.target.value)}
                    placeholder="Enter your answer..."
                    rows={3}
                    className="resize-none"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};