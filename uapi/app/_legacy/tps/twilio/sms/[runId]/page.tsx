/**
 * SMS Pipeline Execution Viewer (Twilio)
 * Unified under /tps/twilio/sms/[runId]
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface StreamEvent {
  id: string;
  timestamp: string;
  type: 'connected' | 'status' | 'progress' | 'complete' | 'error' | 'info' | 'ping';
  title?: string;
  message?: string;
  progress?: number;
  files?: Array<{ path: string; icon: string }>;
  results?: {
    files: string[];
    metrics: Record<string, any>;
    summary: string;
  };
  status?: string;
  pipelineType?: string;
  startTime?: string;
  task?: string;
}

export default function SMSRunViewer() {
  const params = useParams();
  const searchParams = useSearchParams();
  const runId = params.runId as string;
  const token = searchParams.get('token');
  
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'complete'>('connecting');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Connect to SSE stream
  useEffect(() => {
    if (!runId) return;
    
    const url = new URL('/api/sms/stream', window.location.origin);
    url.searchParams.set('runId', runId);
    if (token) url.searchParams.set('token', token);
    
    const eventSource = new EventSource(url.toString());
    
    eventSource.onopen = () => {
      setStatus('connected');
      setError(null);
    };
    
    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      setStatus('error');
      setError('Connection lost. Retrying...');
      
      // Auto-retry after 5 seconds
      setTimeout(() => {
        if (eventSource.readyState === EventSource.CLOSED) {
          setStatus('connecting');
        }
      }, 5000);
    };
    
    // Handle different event types
    eventSource.addEventListener('connected', (e) => {
      const data = JSON.parse(e.data);
      console.log('Connected:', data);
    });
    
    eventSource.addEventListener('status', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, { ...data, id: 'status', type: 'status' }]);
    });
    
    eventSource.addEventListener('progress', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, data]);
      if (data.progress) setProgress(data.progress);
    });
    
    eventSource.addEventListener('complete', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, data]);
      setStatus('complete');
      setProgress(100);
      eventSource.close();
    });
    
    eventSource.addEventListener('error', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, data]);
      setError(data.message);
      eventSource.close();
    });
    
    eventSource.addEventListener('info', (e) => {
      const data = JSON.parse(e.data);
      setEvents(prev => [...prev, data]);
    });
    
    return () => {
      eventSource.close();
    };
  }, [runId, token]);
  
  // Get latest meaningful event
  const latestEvent = events.filter(e => e.type !== 'ping').slice(-1)[0];
  const initialStatus = events.find(e => e.type === 'status');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 tablet:px-6 desktop:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ENGI Pipeline
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Run {runId.substring(0, 8)}
                </p>
              </div>
            </div>
            
            {/* Status Badge */}
            <div className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${status === 'connecting' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' : ''}
              ${status === 'connected' && progress < 100 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : ''}
              ${status === 'complete' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
              ${status === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : ''}
            `}>
              {status === 'connecting' && 'Connecting...'}
              {status === 'connected' && progress < 100 && 'Running'}
              {status === 'complete' && 'Complete'}
              {status === 'error' && 'Error'}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 tablet:px-6 desktop:px-8">
        {/* Task Info */}
        {initialStatus && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {initialStatus.pipelineType?.toUpperCase()} PIPELINE
            </h2>
            <p className="text-lg text-gray-900 dark:text-white">
              {initialStatus.task}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Started {new Date(initialStatus.startTime || '').toLocaleTimeString()}
            </p>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
        
        {/* Event Stream */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Activity Log
          </h3>
          
          <AnimatePresence mode="popLayout">
            {events.filter(e => e.type !== 'status' && e.type !== 'ping').map((event, index) => (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 text-2xl">
                    {event.title?.split(' ')[0] || 'ℹ️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title?.split(' ').slice(1).join(' ') || event.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {event.message}
                    </p>
                    
                    {/* File list */}
                    {event.files && event.files.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {event.files.map((file, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm">
                            <span>{file.icon}</span>
                            <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {file.path}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Results summary */}
                    {event.results && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          Pipeline Complete!
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                          {event.results.files.length} files modified
                        </p>
                        {event.results.summary && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            {event.results.summary}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Loading state */}
          {status === 'connected' && progress < 100 && events.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-4"
            >
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-300">
              {error}
            </p>
          </div>
        )}
        
        {/* Completion Actions */}
        {status === 'complete' && (
          <div className="mt-8 flex flex-col tablet:flex-row gap-4">
            <a
              href={`/executions/${runId}`}
              className="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Full Details
            </a>
            <a
              href="/executions?type=pipeline:deliverables"
              className="flex-1 text-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Go to Deliverables
            </a>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="mt-12 pb-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Powered by ENGI • Revolutionary AI Engineering</p>
      </footer>
    </div>
  );
}
