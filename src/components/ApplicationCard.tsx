import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Application } from '@/lib/applications';
import { 
  Building, 
  Calendar, 
  MapPin, 
  DollarSign,
  Eye,
  Clock
} from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
  onViewJob: (jobId: string) => void;
  isHighlighted?: boolean;
}

const getStatusColor = (status: Application['status']) => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Shortlisted':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Interview':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Offer':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: Application['status']) => {
  switch (status) {
    case 'Applied':
      return <Clock className="h-3 w-3" />;
    case 'Shortlisted':
      return <Eye className="h-3 w-3" />;
    case 'Interview':
      return <Calendar className="h-3 w-3" />;
    case 'Rejected':
      return <span className="text-xs">✕</span>;
    case 'Offer':
      return <span className="text-xs">✓</span>;
    default:
      return null;
  }
};

export const ApplicationCard = ({ 
  application, 
  onViewJob, 
  isHighlighted = false 
}: ApplicationCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isRecent = () => {
    const applicationDate = new Date(application.appliedDate);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return applicationDate >= threeDaysAgo;
  };

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${
        isHighlighted ? 'ring-2 ring-primary ring-opacity-50 shadow-lg' : ''
      } ${isRecent() ? 'border-primary/20' : ''}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground truncate">
                {application.jobTitle}
              </h3>
              {isRecent() && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  New
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Building className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{application.company}</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Applied {formatDate(application.appliedDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{application.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <Badge 
              className={`flex items-center gap-1 ${getStatusColor(application.status)}`}
              variant="outline"
            >
              {getStatusIcon(application.status)}
              <span className="text-xs font-medium">{application.status}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium">{application.jobType}</span>
            </div>
            {application.salary && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>{application.salary}</span>
              </div>
            )}
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewJob(application.jobId)}
            className="flex items-center gap-1"
          >
            <Eye className="h-3 w-3" />
            View Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};