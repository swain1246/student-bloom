import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Users, Calendar } from "lucide-react";
import { InvitationCard } from "@/components/Student/InvitationCard";
import { mockInvitations, StudentInvitation } from "@/lib/invitations";

const statusFilters = ['All', 'Pending', 'Accepted', 'Declined'];

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<StudentInvitation[]>(mockInvitations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredInvitations = useMemo(() => {
    return invitations.filter((invitation) => {
      const matchesSearch = 
        invitation.mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitation.project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invitation.mentor.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || invitation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [invitations, searchQuery, statusFilter]);

  const handleStatusUpdate = (id: string, status: 'Accepted' | 'Declined') => {
    setInvitations(prev => 
      prev.map(invitation => 
        invitation.id === id ? { ...invitation, status } : invitation
      )
    );
  };

  const getStatsCount = (status: string) => {
    if (status === 'All') return invitations.length;
    return invitations.filter(inv => inv.status === status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Invitations</h1>
          <p className="text-muted-foreground">
            Manage project and internship invitations from mentors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-center">
              <Mail className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{getStatsCount('All')}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{getStatsCount('Pending')}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          
          <Card className="bg-success/5 border-success/20">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-success">{getStatsCount('Accepted')}</div>
              <div className="text-sm text-muted-foreground">Accepted</div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted border-border">
            <CardContent className="p-4 text-center">
              <div className="h-6 w-6 bg-muted-foreground/20 rounded mx-auto mb-2"></div>
              <div className="text-2xl font-bold text-muted-foreground">{getStatsCount('Declined')}</div>
              <div className="text-sm text-muted-foreground">Declined</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by mentor name, project title, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="whitespace-nowrap"
              >
                {status}
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-background/50 text-foreground"
                >
                  {getStatsCount(status)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Invitations List */}
        {filteredInvitations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Mail className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {searchQuery || statusFilter !== 'All' 
                    ? 'No invitations found' 
                    : 'No invitations yet'
                  }
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'All'
                    ? 'Try adjusting your search or filter criteria.'
                    : 'When mentors invite you to projects or internships, they\'ll appear here.'
                  }
                </p>
                {(searchQuery || statusFilter !== 'All') && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('All');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {filteredInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}