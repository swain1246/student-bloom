import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MentorProfile } from "@/lib/mentorDashboardData";
import { Clock } from "lucide-react";

interface WelcomeCardProps {
  mentor: MentorProfile;
}

export function WelcomeCard({ mentor }: WelcomeCardProps) {
  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.profilePicture} alt={mentor.name} />
            <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{mentor.name}</h1>
            <Badge variant="secondary" className="mt-1">
              {mentor.role}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last active {formatLastLogin(mentor.lastLogin)}</span>
        </div>
      </CardContent>
    </Card>
  );
}