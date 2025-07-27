import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MentorStats as MentorStatsType } from "@/lib/mentorDashboardData";
import { Users, UserCheck, Handshake, FolderOpen } from "lucide-react";

interface MentorStatsProps {
  stats: MentorStatsType;
}

export function MentorStats({ stats }: MentorStatsProps) {
  const statItems = [
    {
      title: "Total Invitations",
      value: stats.totalStudentsInvited,
      icon: Users,
      description: "Students invited"
    },
    {
      title: "Accepted",
      value: stats.invitationsAccepted,
      icon: UserCheck,
      description: "Invitations accepted"
    },
    {
      title: "Active Mentorships",
      value: stats.ongoingMentorships,
      icon: Handshake,
      description: "Ongoing collaborations"
    },
    {
      title: "Projects Posted",
      value: stats.projectsPosted,
      icon: FolderOpen,
      description: "Total projects"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Card key={item.title} className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <IconComponent className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {item.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}