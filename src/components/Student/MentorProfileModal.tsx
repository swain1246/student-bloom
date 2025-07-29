import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, Star, ExternalLink, Github, Linkedin } from "lucide-react";
import { StudentInvitation } from "@/lib/invitations";

interface MentorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: StudentInvitation['mentor'];
}

export function MentorProfileModal({ isOpen, onClose, mentor }: MentorProfileModalProps) {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mentor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <AvatarImage src={mentor.profilePicture} alt={mentor.name} />
              <AvatarFallback className="text-lg">
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-foreground">{mentor.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Briefcase className="h-4 w-4" />
                <span>{mentor.role} at {mentor.company}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{mentor.experience} experience</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-medium">{mentor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({mentor.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Bio Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">About</h4>
            <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Social Links */}
          {(mentor.linkedinUrl || mentor.githubUrl || mentor.portfolioUrl) && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-foreground mb-3">Connect</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.linkedinUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExternalLink(mentor.linkedinUrl!)}
                      className="gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  {mentor.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExternalLink(mentor.githubUrl!)}
                      className="gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                  {mentor.portfolioUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExternalLink(mentor.portfolioUrl!)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Portfolio
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}