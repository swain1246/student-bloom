import { useState, useMemo } from 'react';
import { JobCard } from '@/components/Job/JobCard';
import { JobFilter } from '@/components/Job/JobFilter';
import { JobDetail } from '@/components/Job/JobDetail';
import { JobApplicationModal } from '@/components/Job/JobApplicationModal';
import { dummyJobs, Job, JobFilters } from '@/lib/jobs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobSearch = () => {
  const [filters, setFilters] = useState<JobFilters>({
    skills: [],
    timeFilter: 'all',
    jobTypes: [],
    searchQuery: ''
  });
  
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applicationJob, setApplicationJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Get student skills from sample data (in real app, this would come from user context)
  const studentSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'Machine Learning', 
    'TensorFlow', 'AWS', 'MongoDB', 'Git', 'Docker', 'TypeScript', 'Java'
  ];

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    let jobs = [...dummyJobs];

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Filter by skills
    if (filters.skills.length > 0) {
      jobs = jobs.filter(job =>
        filters.skills.some(skill => job.skills.includes(skill))
      );
    }

    // Filter by job types
    if (filters.jobTypes.length > 0) {
      jobs = jobs.filter(job => filters.jobTypes.includes(job.type));
    }

    // Filter by time
    if (filters.timeFilter !== 'all') {
      const now = new Date();
      jobs = jobs.filter(job => {
        const postedDate = new Date(job.postedDate);
        const diffTime = now.getTime() - postedDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (filters.timeFilter) {
          case 'last24h':
            return diffDays <= 1;
          case 'last7days':
            return diffDays <= 7;
          case 'last30days':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }

    // Sort by relevance to student skills (jobs matching more skills appear first)
    jobs.sort((a, b) => {
      const aMatches = a.skills.filter(skill => studentSkills.includes(skill)).length;
      const bMatches = b.skills.filter(skill => studentSkills.includes(skill)).length;
      return bMatches - aMatches;
    });

    return jobs;
  }, [filters, studentSkills]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleApply = (job: Job) => {
    setApplicationJob(job);
    setShowApplicationModal(true);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
  };

  const handleCloseApplication = () => {
    setShowApplicationModal(false);
    setApplicationJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Profile
              </Button>
            </Link>
          </div>
          
          {!selectedJob && (
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Job Search</h1>
                <p className="text-muted-foreground">
                  Find opportunities that match your skills and interests
                </p>
              </div>
            </div>
          )}
        </div>

        {selectedJob ? (
          /* Job Detail View */
          <JobDetail 
            job={selectedJob} 
            onBack={handleBackToList}
            onApply={handleApply}
          />
        ) : (
          /* Job List View */
          <>
            {/* Filters */}
            <JobFilter 
              filters={filters}
              onFiltersChange={setFilters}
              totalJobs={filteredJobs.length}
            />

            {/* Job Cards Grid */}
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onViewDetails={handleViewDetails}
                    onApply={handleApply}
                  />
                ))}
              </div>
            ) : (
              /* No Jobs Found */
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    skills: [],
                    timeFilter: 'all',
                    jobTypes: [],
                    searchQuery: ''
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Application Modal */}
        <JobApplicationModal
          job={applicationJob}
          isOpen={showApplicationModal}
          onClose={handleCloseApplication}
        />
      </div>
    </div>
  );
};

export default JobSearch;