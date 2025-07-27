import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ActiveMentorship } from "@/lib/mentorDashboardData";
import { Handshake, Calendar, Clock } from "lucide-react";

interface MentorshipSummaryProps {
  mentorships: ActiveMentorship[];
}

export function MentorshipSummary({ mentorships }: MentorshipSummaryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-primary';
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5 text-primary" />
          Active Mentorships
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mentorships.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Handshake className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No active mentorships</p>
          </div>
        ) : (
          <div className="space-y-6">
            {mentorships.map((mentorship) => (
              <div 
                key={mentorship.id} 
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1">
                      {mentorship.studentName}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {mentorship.projectTitle}
                    </p>
                  </div>
                  <Badge variant="outline" className={getProgressColor(mentorship.progressPercentage)}>
                    {mentorship.progressPercentage}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{mentorship.progressPercentage}%</span>
                    </div>
                    <Progress value={mentorship.progressPercentage} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Started {formatDate(mentorship.startDate)}</span>
                    </div>
                    {mentorship.nextMeeting && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Next: {formatDate(mentorship.nextMeeting)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}