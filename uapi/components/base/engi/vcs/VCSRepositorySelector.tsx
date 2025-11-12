'use client';

import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, GitFork, Lock, Search } from 'lucide-react';
import { cn } from '@engi/styling';
import { Button } from '@/components/base/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/base/shadcn/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/base/shadcn/popover';
import { Badge } from '@/components/base/shadcn/badge';
import { VCSProviderType, VCSRepository } from '@engi/vcs-core';
import { toast } from '@/components/base/shadcn/sonner';

interface VCSRepositorySelectorProps {
  provider: VCSProviderType;
  instanceUrl?: string;
  value?: string;
  onSelect: (repository: VCSRepository | null) => void;
  placeholder?: string;
  className?: string;
}

export function VCSRepositorySelector({
  provider,
  instanceUrl,
  value,
  onSelect,
  placeholder = 'Select repository...',
  className
}: VCSRepositorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [repositories, setRepositories] = useState<VCSRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<VCSRepository | null>(null);
  
  const fetchRepositories = async () => {
    setIsLoading(true);
    
    try {
      let url = `/api/vcs/${provider}/repositories`;
      if (instanceUrl) {
        url += `?instance_url=${encodeURIComponent(instanceUrl)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      const data = await response.json();
      setRepositories(data.repositories || []);
      
      // Find selected repository if value is provided
      if (value) {
        const selected = data.repositories.find((repo: VCSRepository) => 
          repo.fullName === value || repo.id === value
        );
        if (selected) {
          setSelectedRepo(selected);
        }
      }
    } catch (error) {
      console.error('Failed to fetch repositories:', error);
      toast.error('Failed to load repositories');
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (open && repositories.length === 0) {
      fetchRepositories();
    }
  }, [open]);
  
  const filteredRepositories = repositories.filter(repo =>
    repo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelect = (repo: VCSRepository) => {
    setSelectedRepo(repo);
    onSelect(repo);
    setOpen(false);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedRepo ? (
            <div className="flex items-center gap-2 truncate">
              {selectedRepo.private && <Lock className="h-3 w-3" />}
              <span className="truncate">{selectedRepo.fullName}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search repositories..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Loading repositories...
              </div>
            ) : filteredRepositories.length === 0 ? (
              <CommandEmpty>No repositories found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredRepositories.map((repo) => (
                  <CommandItem
                    key={repo.id}
                    value={repo.fullName}
                    onSelect={() => handleSelect(repo)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedRepo?.id === repo.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        {repo.private && <Lock className="h-3 w-3" />}
                        {repo.fork && <GitFork className="h-3 w-3" />}
                        <span className="font-medium truncate">{repo.fullName}</span>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {repo.language && (
                          <Badge variant="secondary" className="text-xs">
                            {repo.language}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          Updated {new Date(repo.updatedAt || '').toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
