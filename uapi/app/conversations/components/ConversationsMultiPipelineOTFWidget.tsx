/**
 * MULTI-PIPELINE OTF WIDGET - REVOLUTIONARY MULTI-PIPELINE CONTROL
 * 
 * Enables users to send instructions to multiple pipelines with an elegant interface.
 * "Send this instruction to all my pipelines: old-styles.css is legacy..."
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Send, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Filter,
  ChevronDown,
  X
} from 'lucide-react';

interface ActivePipeline {
  id: string;
  pipeline_type?: string;
  type?: string;
  conversation_id: string;
  status: string;
  conversations: { title: string; tags?: string[] };
}

interface TargetScope {
  type: 'all_pipelines' | 'pipeline_type' | 'conversation_tag' | 'specific_pipelines';
  pipelineType?: 'deliverable' | 'measure';
  conversationTag?: string;
  pipelineIds?: string[];
}

interface BroadcastResult {
  success: boolean;
  message: string;
  results: Array<{
    runId: string;
    pipelineType: string;
    success: boolean;
    error?: string;
  }>;
  summary: {
    totalTargets: number;
    successful: number;
    failed: number;
  };
}

export const MultiPipelineOTFWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [instruction, setInstruction] = useState('');
  const [targetScope, setTargetScope] = useState<TargetScope>({ type: 'all_pipelines' });
  const [activePipelines, setActivePipelines] = useState<ActivePipeline[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BroadcastResult | null>(null);
  const [confirmationRequired, setConfirmationRequired] = useState<any>(null);

  // Fetch active pipelines
  useEffect(() => {
    if (isOpen) {
      fetchActivePipelines();
    }
  }, [isOpen]);

  const fetchActivePipelines = async () => {
    try {
      const response = await fetch('/api/otf-instructions/multi-pipeline?groupBy=type');
      if (response.ok) {
        const data = await response.json();
        setActivePipelines(data.pipelines || []);
      }
    } catch (error) {
      console.error('Failed to fetch active pipelines:', error);
    }
  };

  const getTargetPipelines = () => {
    switch (targetScope.type) {
      case 'all_pipelines':
        return activePipelines;
      case 'pipeline_type':
        return activePipelines.filter(p => (p.type || p.pipeline_type) === targetScope.pipelineType);
      case 'conversation_tag':
        return activePipelines.filter(p => 
          p.conversations.tags?.includes(targetScope.conversationTag || '')
        );
      case 'specific_pipelines':
        return activePipelines.filter(p => 
          targetScope.pipelineIds?.includes(p.id)
        );
      default:
        return [];
    }
  };

  const targetPipelines = getTargetPipelines();

  const handleSendInstruction = async (confirmed = false) => {
    if (!instruction.trim()) return;

    setLoading(true);
    setResult(null);
    setConfirmationRequired(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };

      if (confirmed) {
        headers['x-confirm-broadcast'] = 'true';
      }

      const response = await fetch('/api/otf-instructions/multi-pipeline', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          instruction,
          targetScope,
          priority: 'normal'
        })
      });

      const data = await response.json();

      if (data.requiresConfirmation) {
        setConfirmationRequired(data);
      } else if (data.success) {
        setResult(data);
        setInstruction('');
      } else {
        throw new Error(data.error || 'Failed to send instruction');
      }
    } catch (error) {
      console.error('Failed to send multi-pipeline instruction:', error);
      setResult({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        results: [],
        summary: { totalTargets: 0, successful: 0, failed: 0 }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBroadcast = () => {
    handleSendInstruction(true);
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {activePipelines.length || '?'}
        </div>
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Multi-Pipeline Control
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold">Multi-Pipeline Control</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Active Pipelines Summary */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active Pipelines
            </span>
            <span className="text-lg font-bold text-emerald-600">
              {activePipelines.length}
            </span>
          </div>
          <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
            <span>
              Deliverables: {activePipelines.filter(p => (p.type || p.pipeline_type) === 'deliverable').length}
            </span>
            <span>
              Need measurement: {activePipelines.filter(p => (p.type || p.pipeline_type) === 'measure').length}
            </span>
          </div>
        </div>

        {/* Target Scope Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target Scope
          </label>
          <select
            value={targetScope.type}
            onChange={(e) => setTargetScope({ type: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="all_pipelines">All Active Pipelines</option>
            <option value="pipeline_type">By Pipeline Type</option>
            <option value="conversation_tag">By Conversation Tag</option>
            <option value="specific_pipelines">Specific Pipelines</option>
          </select>

          {/* Sub-options */}
          {targetScope.type === 'pipeline_type' && (
            <select
              value={targetScope.pipelineType || ''}
              onChange={(e) => setTargetScope({ ...targetScope, pipelineType: e.target.value as any })}
              className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">Select Pipeline Type</option>
              <option value="deliverable">Deliverables</option>
              <option value="measure">Need measurement</option>
            </select>
          )}

          {targetScope.type === 'conversation_tag' && (
            <input
              type="text"
              placeholder="Enter conversation tag"
              value={targetScope.conversationTag || ''}
              onChange={(e) => setTargetScope({ ...targetScope, conversationTag: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          )}
        </div>

        {/* Target Preview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Will target {targetPipelines.length} pipeline{targetPipelines.length !== 1 ? 's' : ''}
            </span>
          </div>
          {targetPipelines.length > 0 && (
            <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
              {targetPipelines.slice(0, 3).map(pipeline => (
                <div key={pipeline.id} className="flex justify-between">
                  <span>{pipeline.conversations.title}</span>
                  <span className="font-mono">{pipeline.type || pipeline.pipeline_type}</span>
                </div>
              ))}
              {targetPipelines.length > 3 && (
                <div className="text-center">
                  +{targetPipelines.length - 3} more...
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instruction Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instruction
          </label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="e.g., old-styles.css is legacy so don't edit it - make sure to reapply any edits or thinking to new-styles.css exclusively"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
            rows={3}
            maxLength={10000}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {instruction.length}/10,000 characters
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleSendInstruction()}
          disabled={!instruction.trim() || targetPipelines.length === 0 || loading}
          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Clock className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          {loading ? 'Broadcasting...' : `Send to ${targetPipelines.length} Pipeline${targetPipelines.length !== 1 ? 's' : ''}`}
        </button>

        {/* Confirmation Dialog */}
        <AnimatePresence>
          {confirmationRequired && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    {confirmationRequired.message}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleConfirmBroadcast}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
                    >
                      Confirm Broadcast
                    </button>
                    <button
                      onClick={() => setConfirmationRequired(null)}
                      className="px-3 py-1 border border-yellow-600 text-yellow-600 rounded text-sm hover:bg-yellow-50 dark:hover:bg-yellow-900/50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`rounded-lg p-4 ${
                result.success 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    result.success 
                      ? 'text-green-800 dark:text-green-200' 
                      : 'text-red-800 dark:text-red-200'
                  }`}>
                    {result.message}
                  </p>
                  {result.summary && (
                    <div className="mt-2 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Successful:</span>
                        <span className="font-bold text-green-600">{result.summary.successful}</span>
                      </div>
                      {result.summary.failed > 0 && (
                        <div className="flex justify-between">
                          <span>Failed:</span>
                          <span className="font-bold text-red-600">{result.summary.failed}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MultiPipelineOTFWidget;
