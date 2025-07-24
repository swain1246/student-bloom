import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Job } from '@/lib/jobs';
import { MapPin, Calendar, DollarSign, Clock, Building } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const JobCard = ({ job, onViewDetails, onApply }: JobCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building className="h-4 w-4" />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
                {job.isRemote && (
                  <Badge variant="secondary" className="ml-1 px-2 py-0 text-xs">
                    Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(job.postedDate)}</span>
              </div>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className="bg-primary/5 border-primary/20 text-primary font-medium"
          >
            {job.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{job.experience}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {job.skills.slice(0, 4).map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-xs bg-secondary/50 hover:bg-secondary transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-secondary/50">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="flex-1"
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                onApply(job);
              }}
              className="flex-1"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};