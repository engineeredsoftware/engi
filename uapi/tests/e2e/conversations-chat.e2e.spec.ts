import { test, expect } from '@playwright/test';

test.describe('Conversations Chat Sidebars', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    // Ensure toggle buttons are loaded
    await expect(page.locator('[data-testid="sidebar-toggle-left"]')).toBeVisible();
    await expect(page.locator('[data-testid="sidebar-toggle-right"]')).toBeVisible();
  });

  test('Left Sidebar: Chat open, history, select chat, send message', async ({ page }) => {
    const toggle = page.locator('[data-testid="sidebar-toggle-left"]');
    const chatSidebar = page.locator('[data-testid="sidebar-chat"]');
    // Initially hidden
    await expect(chatSidebar).toBeHidden();
    // Open chat sidebar
    await toggle.click();
    await expect(chatSidebar).toBeVisible();
    // Chat view shows default header
    await expect(chatSidebar.locator('text=New Chat')).toBeVisible();
    // Open chat history by clicking the header
    await chatSidebar.locator('text=New Chat').click();
    await expect(chatSidebar.locator('text=Chat History')).toBeVisible();
    // History list contains at least one conversation
    const firstChat = chatSidebar.locator('text=Code Refactoring Discussion');
    await expect(firstChat).toBeVisible();
    // Select a conversation
    await firstChat.click();
    // Header updates to selected chat
    await expect(chatSidebar.locator('text=Code Refactoring Discussion')).toBeVisible();
    // Send a new message
    const userMsg = 'Hello Conversations';
    const input = chatSidebar.locator('textarea.rich-text-input');
    await input.fill(userMsg);
    await chatSidebar.locator('button.send-button').click();
    // User message appears
    await expect(chatSidebar.locator(`text=${userMsg}`)).toBeVisible();
    // Agent response appears (simulated)
    await expect(chatSidebar.locator('text=Let me analyze')).toBeVisible({ timeout: 3000 });
    // Close chat sidebar
    await toggle.click();
    await expect(chatSidebar).toBeHidden();
  });
  
  test('Left Sidebar: Chat history grouping by repository and time', async ({ page }) => {
    const toggle = page.locator('[data-testid="sidebar-toggle-left"]');
    const chatSidebar = page.locator('[data-testid="sidebar-chat"]');
    // Open chat sidebar and history
    await toggle.click();
    await chatSidebar.locator('text=New Chat').click();
    // Repository grouping
    await expect(chatSidebar.locator('text=Repositories')).toBeVisible();
    await expect(chatSidebar.locator('text=engi/frontend')).toBeVisible();
    await expect(chatSidebar.locator('text=engi/backend')).toBeVisible();
    await expect(chatSidebar.locator('text=engi/database')).toBeVisible();
    // Time grouping
    await expect(chatSidebar.locator('text=Today')).toBeVisible();
    await expect(chatSidebar.locator('text=Yesterday')).toBeVisible();
    await expect(chatSidebar.locator('text=Previous Seven Days')).toBeVisible();
    // Close chat sidebar
    await toggle.click();
    await expect(chatSidebar).toBeHidden();
  });

  test('Right Sidebar: Deliverables vs AI Documents toggle', async ({ page }) => {
    const toggle = page.locator('[data-testid="sidebar-toggle-right"]');
    const delSidebar = page.locator('[data-testid="sidebar-deliverables"]');
    const upgSidebar = page.locator('[data-testid="sidebar-ai_documents"]');
    // Initially both hidden
    await expect(delSidebar).toBeHidden();
    await expect(upgSidebar).toBeHidden();
    // Open deliverables sidebar
    await toggle.click();
    await expect(delSidebar).toBeVisible();
    // Empty state shows 'No deliverables yet'
    await expect(delSidebar.locator('text=No deliverables yet')).toBeVisible();
    await expect(upgSidebar).toBeHidden();
    // Switch to ai_documents
    const switchUpg = page.locator('[data-testid="sidebar-switch-ai_documents"]');
    await switchUpg.click();
    await expect(delSidebar).toBeHidden();
    await expect(upgSidebar).toBeVisible();
    // Empty state shows 'No ai_documents yet'
    await expect(upgSidebar.locator('text=No ai_documents yet')).toBeVisible();
    // Switch back to deliverables
    const switchDel = page.locator('[data-testid="sidebar-switch-deliverables"]');
    await switchDel.click();
    await expect(delSidebar).toBeVisible();
    await expect(upgSidebar).toBeHidden();
    // Close right sidebar
    await toggle.click();
    await expect(delSidebar).toBeHidden();
  });

  test('Left Sidebar: switch Chat ↔ Feedbacks and navigate feedbacks history', async ({ page }) => {
    const toggle = page.locator('[data-testid="sidebar-toggle-left"]');
    const chatSidebar = page.locator('[data-testid="sidebar-chat"]');
    const feedbacksSidebar = page.locator('[data-testid="sidebar-feedbacks"]');
    // Open chat sidebar
    await toggle.click();
    await expect(chatSidebar).toBeVisible();
    // Switch to feedbacks
    const switchToFeedbacks = page.locator('[data-testid="sidebar-switch-feedbacks"]');
    await switchToFeedbacks.click();
    await expect(chatSidebar).toBeHidden();
    await expect(feedbacksSidebar).toBeVisible();
    // Default view in feedbacks
    await expect(feedbacksSidebar.locator('text=New Chat')).toBeVisible();
    // Open feedbacks history
    await feedbacksSidebar.locator('text=New Chat').click();
    await expect(feedbacksSidebar.locator('text=Chat History')).toBeVisible();
    // Select first feedback conversation
    const firstFeedback = feedbacksSidebar.locator('text=Code Refactoring Discussion');
    await expect(firstFeedback).toBeVisible();
    await firstFeedback.click();
    // Header updates to selected feedback
    await expect(feedbacksSidebar.locator('text=Code Refactoring Discussion')).toBeVisible();
    // Switch back to Chat
    const switchToChat = page.locator('[data-testid="sidebar-switch-chat"]');
    await switchToChat.click();
    await expect(feedbacksSidebar).toBeHidden();
    await expect(chatSidebar).toBeVisible();
    // Chat header resets to default
    await expect(chatSidebar.locator('text=New Chat')).toBeVisible();
    // Close chat sidebar
    await toggle.click();
    await expect(chatSidebar).toBeHidden();
  });
  
  test('Left Sidebar: Feedbacks history grouping by repository and time', async ({ page }) => {
    const toggle = page.locator('[data-testid="sidebar-toggle-left"]');
    const feedbacksSidebar = page.locator('[data-testid="sidebar-feedbacks"]');
    // Open feedbacks sidebar
    await toggle.click();
    await page.locator('[data-testid="sidebar-switch-feedbacks"]').click();
    await expect(feedbacksSidebar).toBeVisible();
    // Open history view
    await feedbacksSidebar.locator('text=New Chat').click();
    // Repository grouping
    await expect(feedbacksSidebar.locator('text=Repositories')).toBeVisible();
    await expect(feedbacksSidebar.locator('text=engi/frontend')).toBeVisible();
    await expect(feedbacksSidebar.locator('text=engi/backend')).toBeVisible();
    await expect(feedbacksSidebar.locator('text=engi/database')).toBeVisible();
    // Time grouping
    await expect(feedbacksSidebar.locator('text=Today')).toBeVisible();
    await expect(feedbacksSidebar.locator('text=Yesterday')).toBeVisible();
    await expect(feedbacksSidebar.locator('text=Previous Seven Days')).toBeVisible();
    // Close feedbacks sidebar
    await toggle.click();
    await expect(feedbacksSidebar).toBeHidden();
  });

  test.skip('Right Sidebar: selecting stubbed deliverable and ai_document items navigates correctly (deprecated: items endpoints removed)', async ({ page }) => {
    // Stub deliverable items
    await page.route('**/api/deliverables/items', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '1', run_id: 'runA', title: 'Run A Item', created_at: '2025-05-01T12:00:00Z', repository: 'repoA', deliverable_type: 'pull_request', deliverable_id: 'a', deliverable_status: 'open' }
        ])
      })
    );
    // Stub ai_document items
    await page.route('**/api/ai_documents/items', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([
        { id: '2', run_id: 'runB', title: 'Run B Item', created_at: '2025-05-02T12:00:00Z', repository: 'repoB', ai_document_type: 'dependency', ai_document_id: 'b', ai_document_status: 'pending' }
      ]) })
    );
    await page.goto('/');
    const toggleRight = page.locator('[data-testid="sidebar-toggle-right"]');
    await toggleRight.click();
    // Click deliverable run button
    const delBtn = page.locator('button', { hasText: 'Run A Item' });
    await delBtn.click();
    await expect(page).toHaveURL(/\/deliverables\?runId=runA/);
    // Open sidebar again
    await page.goto('/');
    await toggleRight.click();
    // Switch to ai_documents
    const switchUpg = page.locator('[data-testid="sidebar-switch-ai_documents"]');
    await switchUpg.click();
    // Click ai_document run button
    const upgBtn = page.locator('button', { hasText: 'Run B Item' });
    await upgBtn.click();
    await expect(page).toHaveURL(/\/ai_documents\?runId=runB/);
  });

  test.skip('Right Sidebar: Deliverables sidebar grouping by type and time (deprecated: items endpoints removed)', async ({ page }) => {
    const runId = 'time-group-run';
    const now = Date.now();
    const yesterday = now - 24 * 60 * 60 * 1000;
    // Stub deliverable items
    await page.route('**/api/deliverables/items', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 'p1', run_id: runId, title: 'Today PR', created_at: new Date(now).toISOString(), repository: 'repoX', deliverable_type: 'pull_request', deliverable_id: '1', deliverable_status: 'open' },
          { id: 'i1', run_id: runId, title: 'Yesterday Issue', created_at: new Date(yesterday).toISOString(), repository: 'repoX', deliverable_type: 'issue', deliverable_id: '2', deliverable_status: 'closed' }
        ])
      })
    );
    // Stub ai_document items empty
    await page.route('**/api/ai_documents/items', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    );
    await page.goto('/');
    const toggleRight = page.locator('[data-testid="sidebar-toggle-right"]');
    await toggleRight.click();
    // Click run button
    const runBtn = page.locator('button', { hasText: 'Today PR' });
    await runBtn.click();
    const delSidebar = page.locator('[data-testid="sidebar-deliverables"]');
    await expect(delSidebar).toBeVisible();
    // Type grouping
    await expect(delSidebar.locator('text=Pull Requests')).toBeVisible();
    await expect(delSidebar.locator('text=Issues')).toBeVisible();
    // Time grouping
    await expect(delSidebar.locator('text=Today')).toBeVisible();
    await expect(delSidebar.locator('text=Yesterday')).toBeVisible();
  });
  
  test.skip('Right Sidebar: AI Documents sidebar grouping by type, repository and time (deprecated: items endpoints removed)', async ({ page }) => {
    // Stub deliverable items empty to focus on ai_documents
    await page.route('**/api/deliverables/items', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    );
    const runId = 'upg-group-run';
    const now = Date.now();
    const yesterday = now - 24 * 60 * 60 * 1000;
    const fourDaysAgo = now - 4 * 24 * 60 * 60 * 1000;
    // Stub ai_document items with different types, repos, and times
    await page.route('**/api/ai_documents/items', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 'u1', run_id: runId, title: 'Today Knowledge', created_at: new Date(now).toISOString(), repository: 'repo1', ai_document_type: 'knowledge' },
          { id: 'u2', run_id: runId, title: 'Yesterday Template', created_at: new Date(yesterday).toISOString(), repository: 'repo2', ai_document_type: 'template' },
          { id: 'u3', run_id: runId, title: '4Days Guidance', created_at: new Date(fourDaysAgo).toISOString(), repository: 'repo1', ai_document_type: 'guidance' }
        ])
      })
    );
    // Load app and open right sidebar
    await page.goto('/');
    const toggleRight = page.locator('[data-testid="sidebar-toggle-right"]');
    await toggleRight.click();
    // Click the stubbed ai_document run button
    await page.locator('button', { hasText: 'Today Knowledge' }).click();
    const upgSidebar = page.locator('[data-testid="sidebar-ai_documents"]');
    await expect(upgSidebar).toBeVisible();
    // Type grouping headers
    await expect(upgSidebar.locator('text=Knowledge')).toBeVisible();
    await expect(upgSidebar.locator('text=Template')).toBeVisible();
    await expect(upgSidebar.locator('text=Guidance')).toBeVisible();
    // Repository grouping header and entries
    await expect(upgSidebar.locator('text=Repositories')).toBeVisible();
    await expect(upgSidebar.locator('text=repo1')).toBeVisible();
    await expect(upgSidebar.locator('text=repo2')).toBeVisible();
    // Time grouping headers
    await expect(upgSidebar.locator('text=Today')).toBeVisible();
    await expect(upgSidebar.locator('text=Yesterday')).toBeVisible();
    await expect(upgSidebar.locator('text=Previous Seven Days')).toBeVisible();
  });
  
  test('Sidebars toggles are hidden on mobile viewport (<768px)', async ({ page }) => {
    // Simulate mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    // Sidebar toggles should not be visible
    await expect(page.locator('[data-testid="sidebar-toggle-left"]')).toBeHidden();
    await expect(page.locator('[data-testid="sidebar-toggle-right"]')).toBeHidden();
  });
});
