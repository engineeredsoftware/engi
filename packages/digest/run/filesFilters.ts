import { log } from '@bitcode/logger';
import { writeStreamMessage } from '@bitcode/streams';
import path from 'path';
// Former import removed; buildSystemPrompt no longer exists in prompts package.
import { generateTextTraced as generateText } from '@bitcode/observability';
import { getModelInstance, MODEL_CONFIGS } from '@/lib/models';
import { z } from 'zod';

// Zod schema for file filter response
const FileFilterResponseSchema = z.array(z.string());

// best is to provide this will the full git-ls/ls of a cloned repo and the task to get liberally filtered
export async function filterFilesByTask(
  files: Array<{ path: string }>,
  task: string,
  debug?: boolean,
  dataStream?: any
): Promise<{
  filteredFiles: Array<{ path: string }>;
  excludedFiles: Array<{ path: string }>;
  filterReason: string;
}> {
  // Stream initial state
  await log('Task-Based File Filter Analysis:', 'info', {
    incomingFilesListCount: files.length,
    task,
    status: 'Generating filtered files list...',
  });

  try {
    const response = await generateText({
      model: getModelInstance(MODEL_CONFIGS[0]),
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `You are a senior software architect analyzing which files are potentially relevant to a coding task.
  Your analysis must be thorough and consider both direct and indirect file relationships.

  CRITICAL ANALYSIS REQUIREMENTS:
  1. Consider ALL context provided:
     - Task description and requirements
     - Issue context and discussions
     - Pull request details if available
     - Previous validation feedback
     - History of file operations
     - Related file patterns

  2. Look for these relationships:
     - Direct imports/exports
     - Parent/child components
     - Shared utilities and hooks
     - Type definitions and interfaces
     - Configuration dependencies
     - Test files for modified code
     - Documentation that needs updates
     - Similar features or patterns

  3. Include files that:
     - Will read direct modification
     - Import/use the modified code
     - Define related types/interfaces
     - Configure affected features
     - Test related functionality
     - Document the changes
Your goal is to LIBERALLY select files that MAY be relevant. It's better to include too many than too few.

CRITICAL REQUIREMENTS:
1. Return ONLY a JSON array of file paths that MAY be relevant to the task
2. Include files that:
   - Are directly related to the task
   - Contain similar functionality
   - May read to be referenced
   - Define related types/interfaces
   - Share common patterns
3. Be generous - include files if unsure
4. Consider common relationships:
   - Parent/child components
   - Shared utilities
   - Type definitions
   - Configuration
   - Similar features

The key here is that you must return any files that you think may be relevant to the task. It is most important that you only find files and parts of the code that you are *certain* are not relevant to the task and exclude those, returning the list of all potentially relevant files. It is also extremely helpful when you filter out obviously needless files.

At the very end of your response, Return ONLY a JSON array of file paths. Example:
["path/to/file1.ts", "path/to/file2.tsx"]
`,
        },
        { role: 'user', content: 'Produce the optimal files.' }
      ],
    });

    await log('Got file selections response. Parsing...', 'info', {});

    let selectedPaths: string[];
    parser: {
      try {
        // First attempt direct parsing with schema (in case the model skips the chain of thought)
        try {
          selectedPaths = FileFilterResponseSchema.parse(JSON.parse(response.text));
          await log('First straight parse was successful!', 'info', {});
          break parser; // first parse succeeded
        } catch {
          // continue with alternative parsing approach
        }

        // Extract the last JSON block, considering nested or stray ticks
        const jsonBlockMatch = response.text.match(/```(?:json)?\n([\s\S]*?)\n```/g);

        if (jsonBlockMatch) {
          // Get the last JSON block
          const lastJsonBlock = jsonBlockMatch[jsonBlockMatch.length - 1];

          // Extract content between the ticks
          const jsonContent = lastJsonBlock.replace(/```(?:json)?\n/, '').replace(/\n```$/, '');

          // Parse the JSON content
          selectedPaths = FileFilterResponseSchema.parse(JSON.parse(jsonContent));
          await log('Second parse from last json block was successful!', 'info', {});
          break parser;
        } else {
          // Fallback: Directly search for a JSON array in the entire response
          const arrayMatch = response.text.match(/(\[\s*[\s\S]*?\s*\])/);
          if (arrayMatch) {
            selectedPaths = FileFilterResponseSchema.parse(JSON.parse(arrayMatch[0]));
            await log('Third parse from last array block was successful!', 'info', {});
            break parser;
          } else {
            throw new Error('No valid JSON block or array found in response');
          }
        }
      } catch (err) {
        // Log and return fallback
        await log('Failed to parse/validate file filter response', 'warn', {
          error: err,
          response: response.text,
        });
        throw new Error('Parsing file selection output totally failed!');
      }
    }

    await log(`Parsed ${selectedPaths.length} selected files from response. Normalizing...`, 'info', {
      selectedPaths,
    });

    // Normalize paths for comparison
    const normalizedSelected = new Set(selectedPaths.map(p => p.split(path.sep).join('/')));
    const filteredFiles = files.filter(f => normalizedSelected.has(f.path.split(path.sep).join('/')));

    await log('📊 File Filtering Complete', 'info', {
      inputFiles: files.length,
      selectedFileCount: filteredFiles.length,
      reduction: `${((1 - filteredFiles.length / files.length) * 100).toFixed(1)}%`,
      selectionRate: `${((filteredFiles.length / files.length) * 100).toFixed(1)}%`,
      selectedFiles: filteredFiles.map(f => f.path),
      excludedFiles: files.filter(f => !filteredFiles.includes(f)).map(f => f.path),
    });

    return {
      filteredFiles,
      excludedFiles: files.filter(f => !filteredFiles.includes(f)),
      filterReason: 'llm-filtered',
    };
  } catch (err) {
    await log('File filtering error! Returning all files for safety...', 'warn', { error: err });
    return { filteredFiles: files, excludedFiles: [], filterReason: 'error' };
  }
}
