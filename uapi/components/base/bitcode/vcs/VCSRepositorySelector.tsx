'use client';

import React, { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, GitFork, Lock, Search } from 'lucide-react';
import { cn } from '@bitcode/styling';
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
import { VCSProviderType, VCSRepository } from '@bitcode/vcs-core';
import { toast } from '@/components/base/shadcn/sonner';

interface VCSRepositorySelectorProps {
  provider: VCSProviderType;
  instanceUrl?: string;
  value?: string;
  onSelect: (repository: VCSRepository | null) => void;
  placeholder?: string;
  className?: string;
  repositories?: VCSRepository[] | null;
  loading?: boolean;
}

export function VCSRepositorySelector({
  provider,
  instanceUrl,
  value,
  onSelect,
  placeholder = 'Select repository...',
  className,
  repositories: providedRepositories,
  loading: providedLoading,
}: VCSRepositorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [fetchedRepositories, setFetchedRepositories] = useState<VCSRepository[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<VCSRepository | null>(null);

  const repositories = providedRepositories ?? fetchedRepositories;
  const isLoading = providedLoading ?? isFetching;

  const readJsonResponse = async (response: Response) => {
    const contentType = response.headers?.get?.('content-type') || '';
    if (contentType && !contentType.includes('application/json')) {
      return null;
    }

    return response.json().catch(() => null);
  };
  
  const fetchRepositories = async () => {
    setIsFetching(true);
    
    try {
      let url = `/api/vcs/${provider}/repositories`;
      if (instanceUrl) {
        url += `?instance_url=${encodeURIComponent(instanceUrl)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch repositories');
      }
      
      const data = await readJsonResponse(response);
      if (!data) {
        throw new Error('The repositories endpoint returned an invalid response');
      }

      setFetchedRepositories(data.repositories || []);
      
      // Find selected repository if value is provided
      if (value) {
        const selected = data.repositories.find((repo: VCSRepository) => 
          repo.fullName === value || repo.id === value
        );
        if (selected) {
          setSelectedRepo(selected);
        }
      }
    } catch {
      toast.error('Failed to load repositories');
      setFetchedRepositories([]);
    } finally {
      setIsFetching(false);
    }
  };
  
  useEffect(() => {
    if (!providedRepositories && open && fetchedRepositories.length === 0) {
      fetchRepositories();
    }
  }, [fetchedRepositories.length, open, providedRepositories]);

  useEffect(() => {
    if (!value) {
      setSelectedRepo(null);
      return;
    }

    const selected = repositories.find((repo) => repo.fullName === value || repo.id === value);
    setSelectedRepo(selected || null);
  }, [repositories, value]);
  
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
