import { WelcomeCard } from "@/components/Mentor/WelcomeCard";
import { MentorStats } from "@/components/Mentor/MentorStats";
import { RecentInvitations } from "@/components/Mentor/RecentInvitations";
import { MentorshipSummary } from "@/components/Mentor/MentorshipSummary";
import {
  mockMentorProfile,
  mockMentorStats,
  mockRecentInvitations,
  mockActiveMentorships
} from "@/lib/mentorDashboardData";

export default function MentorDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <WelcomeCard mentor={mockMentorProfile} />
        </div>

        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Dashboard Overview</h2>
          <MentorStats stats={mockMentorStats} />
        </div>

        {/* Recent Activity & Mentorships */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentInvitations invitations={mockRecentInvitations} />
          <MentorshipSummary mentorships={mockActiveMentorships} />
        </div>
      </div>
    </div>
  );
}