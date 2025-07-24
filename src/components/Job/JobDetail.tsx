import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Job } from '@/lib/jobs';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  Building, 
  User, 
  CheckCircle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onApply: (job: Job) => void;
}

export const JobDetail = ({ job, onBack, onApply }: JobDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlineNear = () => {
    const deadline = new Date(job.applicationDeadline);
    const now = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Job Search
      </Button>

      {/* Job Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{job.title}</h1>
                <Badge 
                  variant="outline" 
                  className="bg-primary/5 border-primary/20 text-primary font-medium"
                >
                  {job.type}
                </Badge>
                {job.isRemote && (
                  <Badge variant="secondary">Remote</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-lg text-muted-foreground mb-3">
                <Building className="h-5 w-5" />
                <span className="font-medium">{job.company}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Posted by {job.postedBy}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <Button 
                size="lg" 
                onClick={() => onApply(job)}
                className="w-full md:w-auto min-w-32"
              >
                Apply Now
              </Button>
              <div className="text-sm text-muted-foreground text-right">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted: {formatDate(job.postedDate)}</span>
                </div>
                <div className={`flex items-center gap-1 mt-1 ${isDeadlineNear() ? 'text-destructive' : ''}`}>
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                  {isDeadlineNear() && <span className="text-xs">(Soon!)</span>}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Custom Questions Preview */}
          {job.customQuestions && job.customQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Application Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {job.customQuestions.map((question, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-foreground">
                        {index + 1}. {question}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  You'll be asked to answer these questions when you apply.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About {job.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{job.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                </div>
                <Separator />
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Company Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Application Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Tailor your resume to match the job requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Highlight relevant skills and experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Write a compelling cover letter</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Apply early to stand out</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};