/**
 * Source: public-docs/deliverables.md (Deliverables Page Header section)
 * Screenshot: deliverables-header.png
 */
import React from 'react';
import ExecutionPageHeader from '@/app/executions/components/ExecutionPageHeader';
import { templates as defaultTemplates } from '@/config/templates';

export default {
  title: 'Docs/AutoScreenshots/Deliverables/DeliverablesHeader',
  parameters: { layout: 'fullscreen' },
};

export const DeliverablesHeader = {
  render: () => (
    <div style={{ background: '#0f0f0f', padding: 24, minHeight: '100vh' }}>
      <ExecutionPageHeader
        executionStatus="execute"
        onExecuteDeliverableClickSetTask={() => {}}
        showSourceEdu={false}
        showAttachmentsEdu={false}
        showEnhanceEdu={false}
        showSaveTemplateEdu={false}
        showExecuteButtonEdu={false}
        templates={defaultTemplates}
        onTemplateSelect={() => {}}
      />
    </div>
  ),
};
