import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education?: {
    id: string;
    level: string;
    institution: string;
    year: string;
    grade: string;
  };
}

export const EducationModal: React.FC<EducationModalProps> = ({
  isOpen,
  onClose,
  education,
}) => {
  const [formData, setFormData] = useState({
    level: education?.level || '',
    institution: education?.institution || '',
    year: education?.year || '',
    grade: education?.grade || '',
  });

  const educationLevels = [
    'X (10th Grade)',
    'XII (12th Grade)',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate (PhD)',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Education data:', formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {education ? 'Edit Education' : 'Add Education'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="level">Education Level</Label>
            <Select value={formData.level} onValueChange={(value) => handleInputChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution">Institution/School Name</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => handleInputChange('institution', e.target.value)}
              placeholder="Enter institution name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="year">Year of Completion</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="e.g., 2023 or 2020-2024"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grade">Grade/Percentage</Label>
            <Input
              id="grade"
              value={formData.grade}
              onChange={(e) => handleInputChange('grade', e.target.value)}
              placeholder="e.g., 85% or 8.5 CGPA"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {education ? 'Update' : 'Add'} Education
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};