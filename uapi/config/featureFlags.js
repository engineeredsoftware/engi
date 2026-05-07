"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENABLE_MEASURE = exports.ENABLE_ENHANCE_NEED_DEFINITION = exports.ENABLE_OTF_INSTRUCTIONS = exports.MOCK_USER_TEMPLATES_SCENARIO = exports.MOCK_USER_TEMPLATES = exports.MOCK_GITHUB_FILES_SCENARIO = exports.MOCK_GITHUB_FILES = exports.MOCK_GITHUB_COMMITS_SCENARIO = exports.MOCK_GITHUB_COMMITS = exports.MOCK_GITHUB_BRANCHES_SCENARIO = exports.MOCK_GITHUB_BRANCHES = exports.MOCK_GITHUB_ISSUES_SCENARIO = exports.MOCK_GITHUB_ISSUES = exports.MOCK_GITHUB_REPOS_SCENARIO = exports.MOCK_GITHUB_REPOS = exports.MOCK_GITHUB_ACCOUNTS_SCENARIO = exports.MOCK_GITHUB_ACCOUNTS = exports.MOCK_MEASURE_ITEMS_SCENARIO = exports.MOCK_MEASURE_ITEMS = exports.MOCK_MEASURE_HISTORY_SCENARIO = exports.MOCK_MEASURE_HISTORY = exports.MOCK_MEASURE_SCENARIO = exports.MOCK_CHAT_SCENARIO = exports.MOCK_CHAT_STREAM = exports.MOCK_CHECKOUT_SESSION = exports.MOCK_GET_TITLE = exports.MOCK_USER_AUXILLARIES_SCENARIO = exports.MOCK_USER_AUXILLARIES = exports.MOCK_MEASURE = exports.ENABLE_MOCKS = void 0;
// uapi/app/config/featureFlags.ts
// Feature flags for enabling mocks and other dev utilities
exports.ENABLE_MOCKS = process.env.NEXT_PUBLIC_ENABLE_MOCKS === 'true';
exports.MOCK_MEASURE = process.env.NEXT_PUBLIC_MOCK_MEASURE === 'true';
exports.MOCK_USER_AUXILLARIES = process.env.NEXT_PUBLIC_MOCK_USER_AUXILLARIES === 'true';
exports.MOCK_USER_AUXILLARIES_SCENARIO = process.env.NEXT_PUBLIC_MOCK_USER_AUXILLARIES_SCENARIO || 'default';
exports.MOCK_GET_TITLE = process.env.NEXT_PUBLIC_MOCK_GET_TITLE === 'true';
exports.MOCK_CHECKOUT_SESSION = process.env.NEXT_PUBLIC_MOCK_CHECKOUT_SESSION === 'true';
exports.MOCK_CHAT_STREAM = process.env.NEXT_PUBLIC_MOCK_CHAT_STREAM === 'true';
exports.MOCK_CHAT_SCENARIO = process.env.NEXT_PUBLIC_MOCK_CHAT_SCENARIO || 'default';
exports.MOCK_MEASURE_SCENARIO = process.env.NEXT_PUBLIC_MOCK_MEASURE_SCENARIO || 'default';
// Measure history and items (reserved for pipeline placeholder)
exports.MOCK_MEASURE_HISTORY = process.env.NEXT_PUBLIC_MOCK_MEASURE_HISTORY === 'true';
exports.MOCK_MEASURE_HISTORY_SCENARIO = process.env.NEXT_PUBLIC_MOCK_MEASURE_HISTORY_SCENARIO || 'default';
exports.MOCK_MEASURE_ITEMS = process.env.NEXT_PUBLIC_MOCK_MEASURE_ITEMS === 'true';
exports.MOCK_MEASURE_ITEMS_SCENARIO = process.env.NEXT_PUBLIC_MOCK_MEASURE_ITEMS_SCENARIO || 'default';
// GitHub Selectors: accounts, repos, issues, branches, commits, files
exports.MOCK_GITHUB_ACCOUNTS = process.env.NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS === 'true';
exports.MOCK_GITHUB_ACCOUNTS_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_ACCOUNTS_SCENARIO || 'default';
exports.MOCK_GITHUB_REPOS = process.env.NEXT_PUBLIC_MOCK_GITHUB_REPOS === 'true';
exports.MOCK_GITHUB_REPOS_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_REPOS_SCENARIO || 'default';
exports.MOCK_GITHUB_ISSUES = process.env.NEXT_PUBLIC_MOCK_GITHUB_ISSUES === 'true';
exports.MOCK_GITHUB_ISSUES_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_ISSUES_SCENARIO || 'default';
exports.MOCK_GITHUB_BRANCHES = process.env.NEXT_PUBLIC_MOCK_GITHUB_BRANCHES === 'true';
exports.MOCK_GITHUB_BRANCHES_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_BRANCHES_SCENARIO || 'default';
exports.MOCK_GITHUB_COMMITS = process.env.NEXT_PUBLIC_MOCK_GITHUB_COMMITS === 'true';
exports.MOCK_GITHUB_COMMITS_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_COMMITS_SCENARIO || 'default';
exports.MOCK_GITHUB_FILES = process.env.NEXT_PUBLIC_MOCK_GITHUB_FILES === 'true';
exports.MOCK_GITHUB_FILES_SCENARIO = process.env.NEXT_PUBLIC_MOCK_GITHUB_FILES_SCENARIO || 'default';
// User template preferences
exports.MOCK_USER_TEMPLATES = process.env.NEXT_PUBLIC_MOCK_USER_TEMPLATES === 'true';
exports.MOCK_USER_TEMPLATES_SCENARIO = process.env.NEXT_PUBLIC_MOCK_USER_TEMPLATES_SCENARIO || 'default';
// V26 Feature Flags - disable features not ready for production
exports.ENABLE_OTF_INSTRUCTIONS = process.env.NEXT_PUBLIC_ENABLE_OTF_INSTRUCTIONS === 'true';
exports.ENABLE_ENHANCE_NEED_DEFINITION = process.env.NEXT_PUBLIC_ENABLE_ENHANCE_NEED_DEFINITION === 'true';
exports.ENABLE_MEASURE = process.env.NEXT_PUBLIC_ENABLE_MEASURE === 'true'; // Disabled for V26
