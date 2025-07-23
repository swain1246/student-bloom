import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus } from 'lucide-react';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSkills: string[];
}

export const SkillsModal: React.FC<SkillsModalProps> = ({
  isOpen,
  onClose,
  currentSkills,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentSkills);
  const [customSkill, setCustomSkill] = useState('');

  const predefinedSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Express.js',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'Docker', 'AWS', 'Azure',
    'Machine Learning', 'Data Analysis', 'UI/UX Design', 'HTML/CSS',
    'TypeScript', 'Vue.js', 'Angular', 'Spring Boot', 'Django', 'Flask',
    'Kubernetes', 'Jenkins', 'GraphQL', 'Redis', 'Elasticsearch'
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills(prev => [...prev, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Selected skills:', selectedSkills);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selected Skills */}
          <div className="space-y-2">
            <Label>Selected Skills ({selectedSkills.length})</Label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-lg min-h-[60px] bg-muted/20">
              {selectedSkills.map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-primary/30 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedSkills.length === 0 && (
                <p className="text-muted-foreground text-sm">No skills selected</p>
              )}
            </div>
          </div>

          {/* Add Custom Skill */}
          <div className="space-y-2">
            <Label>Add Custom Skill</Label>
            <div className="flex gap-2">
              <Input
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="Enter a skill not listed below"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
              />
              <Button type="button" onClick={addCustomSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Predefined Skills */}
          <div className="space-y-2">
            <Label>Select from Predefined Skills</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
              {predefinedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`p-2 text-sm rounded border text-left transition-colors ${
                    selectedSkills.includes(skill)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted border-border'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Skills
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};