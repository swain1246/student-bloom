import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobFilters, JobType, TimeFilter, availableSkills, jobTypes, timeFilterOptions } from '@/lib/jobs';
import { Search, X, Filter } from 'lucide-react';

interface JobFilterProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  totalJobs: number;
}

export const JobFilter = ({ filters, onFiltersChange, totalJobs }: JobFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSkillToggle = (skill: string) => {
    const updatedSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    
    onFiltersChange({ ...filters, skills: updatedSkills });
  };

  const handleJobTypeToggle = (jobType: JobType) => {
    const updatedTypes = filters.jobTypes.includes(jobType)
      ? filters.jobTypes.filter(t => t !== jobType)
      : [...filters.jobTypes, jobType];
    
    onFiltersChange({ ...filters, jobTypes: updatedTypes });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      skills: [],
      timeFilter: 'all',
      jobTypes: [],
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.skills.length > 0 || 
                          filters.jobTypes.length > 0 || 
                          filters.timeFilter !== 'all' || 
                          filters.searchQuery.trim() !== '';

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            <Badge variant="secondary" className="ml-2">
              {totalJobs} jobs
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? 'Less' : 'More'} Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs by title, company, or keyword..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Quick Filters Row */}
        <div className="flex flex-wrap gap-2">
          <Select
            value={filters.timeFilter}
            onValueChange={(value: TimeFilter) => 
              onFiltersChange({ ...filters, timeFilter: value })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Posted time" />
            </SelectTrigger>
            <SelectContent>
              {timeFilterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Job Types - Quick Select */}
          {jobTypes.slice(0, 3).map((type) => (
            <Badge
              key={type}
              variant={filters.jobTypes.includes(type) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => handleJobTypeToggle(type)}
            >
              {type}
            </Badge>
          ))}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {filters.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleSkillToggle(skill)}
                />
              </Badge>
            ))}
            {filters.jobTypes.map((type) => (
              <Badge key={type} variant="secondary" className="gap-1">
                {type}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-destructive" 
                  onClick={() => handleJobTypeToggle(type)}
                />
              </Badge>
            ))}
          </div>
        )}

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-border">
            {/* All Job Types */}
            <div>
              <h4 className="font-medium mb-3">Experience Level</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.jobTypes.includes(type)}
                      onCheckedChange={() => handleJobTypeToggle(type)}
                    />
                    <label 
                      htmlFor={`type-${type}`} 
                      className="text-sm cursor-pointer hover:text-foreground transition-colors"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-medium mb-3">Required Skills</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={filters.skills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <label 
                      htmlFor={`skill-${skill}`} 
                      className="text-sm cursor-pointer hover:text-foreground transition-colors"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};