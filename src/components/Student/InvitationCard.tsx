import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Briefcase, User, Check, X } from "lucide-react";
import { StudentInvitation } from "@/lib/invitations";
import { MentorProfileModal } from "./MentorProfileModal";
import { toast } from "@/hooks/use-toast";

interface InvitationCardProps {
  invitation: StudentInvitation;
  onStatusUpdate: (id: string, status: 'Accepted' | 'Declined') => void;
}

export function InvitationCard({ invitation, onStatusUpdate }: InvitationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-success/10 text-success border-success/20';
      case 'Declined':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'Internship':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'Project':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'Mentorship':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const handleAccept = () => {
    onStatusUpdate(invitation.id, 'Accepted');
    toast({
      title: "Invitation Accepted",
      description: `You've accepted the invitation from ${invitation.mentor.name}`,
    });
  };

  const handleDecline = () => {
    onStatusUpdate(invitation.id, 'Declined');
    toast({
      title: "Invitation Declined",
      description: `You've declined the invitation from ${invitation.mentor.name}`,
    });
  };

  return (
    <>
      <Card className="shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src={invitation.mentor.profilePicture} alt={invitation.mentor.name} />
                <AvatarFallback>
                  {invitation.mentor.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {invitation.mentor.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {invitation.mentor.role} at {invitation.mentor.company}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={getProjectTypeColor(invitation.project.type)}>
                    {invitation.project.type}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(invitation.status)}>
                    {invitation.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(invitation.dateInvited)}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Project Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-foreground">{invitation.project.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {invitation.project.description}
            </p>
          </div>

          {/* Skills */}
          <div>
            <h5 className="text-sm font-medium text-foreground mb-2">Mentor's Expertise</h5>
            <div className="flex flex-wrap gap-1">
              {invitation.mentor.skills.slice(0, 4).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="text-xs bg-primary/5 text-primary border-primary/20"
                >
                  {skill}
                </Badge>
              ))}
              {invitation.mentor.skills.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{invitation.mentor.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Personal Message */}
          {invitation.message && (
            <div className="bg-accent/50 p-3 rounded-lg">
              <p className="text-sm text-foreground italic">"{invitation.message}"</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 text-muted-foreground hover:text-primary"
            >
              <User className="h-4 w-4" />
              View Profile
            </Button>
            
            {invitation.status === 'Pending' && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  className="gap-2 border-destructive/20 text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Accept
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <MentorProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={invitation.mentor}
      />
    </>
  );
}