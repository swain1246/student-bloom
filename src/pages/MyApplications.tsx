import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ApplicationCard } from '@/components/ApplicationCard';
import { getApplications, type Application } from '@/lib/applications';
import { 
  Search, 
  Filter, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

export default function MyApplications() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const applications = getApplications();

  // Filter applications based on search term and status
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get status counts for filter badges
  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: applications.length,
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Rejected: 0,
      Offer: 0
    };

    applications.forEach(app => {
      counts[app.status]++;
    });

    return counts;
  }, [applications]);

  const handleViewJob = (jobId: string) => {
    // Navigate to job details - you can implement this based on your routing
    navigate(`/jobs?id=${jobId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Check if most recent application should be highlighted
  const mostRecentDate = applications.length > 0 ? applications[0].appliedDate : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          </div>
          <p className="text-muted-foreground">
            Track your job applications and their current status
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by job title or company..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
                    <SelectItem value="Applied">Applied ({statusCounts.Applied})</SelectItem>
                    <SelectItem value="Shortlisted">Shortlisted ({statusCounts.Shortlisted})</SelectItem>
                    <SelectItem value="Interview">Interview ({statusCounts.Interview})</SelectItem>
                    <SelectItem value="Offer">Offer ({statusCounts.Offer})</SelectItem>
                    <SelectItem value="Rejected">Rejected ({statusCounts.Rejected})</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              {(searchTerm || statusFilter !== 'all') && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Status Overview Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Object.entries(statusCounts).filter(([key]) => key !== 'all').map(([status, count]) => (
                <Badge 
                  key={status} 
                  variant="secondary" 
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                >
                  {status}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedApplications.length} of {filteredApplications.length} applications
            {searchTerm && ` for "${searchTerm}"`}
            {statusFilter !== 'all' && ` with status "${statusFilter}"`}
          </p>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No applications found' 
                  : 'No applications yet'
                }
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : "You haven't applied to any jobs yet. Start exploring opportunities!"
                }
              </p>
              {(!searchTerm && statusFilter === 'all') && (
                <Button onClick={() => navigate('/jobs')}>
                  Browse Jobs
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Applications Grid */}
            <div className="grid gap-4 mb-8">
              {paginatedApplications.map((application, index) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onViewJob={handleViewJob}
                  isHighlighted={index === 0 && currentPage === 1 && application.appliedDate === mostRecentDate}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}