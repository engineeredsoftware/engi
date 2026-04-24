import { ShippableTemplates } from '@/types/templates';

export const templates: ShippableTemplates = {
  pullRequests: [
    {
      id: 'pr-quick-todo',
      name: 'Quick TODO PR',
      text: 'an opened pull request that completes a simple TODO item from the codebase'
    },
    {
      id: 'pr-feat',
      name: 'New Feature PR',
      text: `# Feature: __[FEATURE_NAME]__

## Definition of Need
- [ ] Implemented __[CORE_FUNCTIONALITY]__ that solves __[BUSINESS_NEED]__
- [ ] Added tests covering critical paths
- [ ] Updated relevant documentation
- [ ] Code follows project standards
- [ ] Passes CI/CD pipeline
- [ ] Reviewed by at least one team member

## Implementation Notes
- Key files changed: __[KEY_FILES]__
- Closes #__[ISSUE_NUMBER]__`
    },
    {
      id: 'pr-refactor',
      name: 'Code Refactor PR',
      text: `# Refactor: __[AREA]__

## Definition of Need
- [ ] Improved __[CODE_QUALITY_ASPECT]__ without changing external behavior
- [ ] Before/after metrics: __[METRICS]__
- [ ] All tests pass with same coverage
- [ ] No new bugs introduced
- [ ] Code is more maintainable/readable
- [ ] Performance impact verified

## Key Changes
- __[PRIMARY_CHANGE]__
- __[SECONDARY_CHANGE]__`
    },
    {
      id: 'pr-bug',
      name: 'Bug Fix PR',
      text: `# Fix: __[BUG_TITLE]__

## Definition of Need
- [ ] Root cause identified: __[ROOT_CAUSE]__
- [ ] Fix implemented in __[LOCATION]__
- [ ] Added regression test that would have caught this bug
- [ ] Verified fix in __[ENVIRONMENT]__
- [ ] No new issues introduced
- [ ] Updated documentation if needed

## Reproduction Steps
1. __[STEP_1]__
2. __[STEP_2]__

Fixes #__[ISSUE_NUMBER]__`
    }
  ],
  pullRequestReviews: [
    {
      id: 'review-security',
      name: 'Security Review',
      text: `# Security Review: __[PR_TITLE]__

## Definition of Need
- [ ] Analyzed code for security vulnerabilities
- [ ] Checked for: injection, auth issues, data exposure, CSRF, etc.
- [ ] Verified secure handling of __[SENSITIVE_DATA]__
- [ ] Confirmed input validation for __[USER_INPUTS]__
- [ ] Security recommendations provided with severity levels
- [ ] Critical issues must be addressed before merge

## Key Findings
- __[FINDING_1]__ (Priority: High/Medium/Low)
- __[FINDING_2]__ (Priority: High/Medium/Low)`
    },
    {
      id: 'review-perf',
      name: 'Performance Review',
      text: `# Performance Review: __[PR_TITLE]__

## Definition of Need
- [ ] Analyzed performance impact on __[CRITICAL_PATHS]__
- [ ] Identified bottlenecks in __[COMPONENTS]__
- [ ] Measured key metrics: __[METRICS]__
- [ ] Compared against baseline performance
- [ ] Provided actionable optimization recommendations
- [ ] Verified critical paths meet performance requirements

## Key Insights
- __[INSIGHT_1]__ (Impact: High/Medium/Low)
- __[INSIGHT_2]__ (Impact: High/Medium/Low)`
    }
  ],
  issues: [
    {
      id: 'issue-bug',
      name: 'Bug Report',
      text: `# Bug: __[CONCISE_TITLE]__

## Definition of Need
- [ ] Bug is reproducible with clear steps
- [ ] Impact and severity assessed
- [ ] Root cause identified
- [ ] Fix implemented and tested
- [ ] Regression test added
- [ ] Documentation updated if needed

## Reproduction
1. __[STEP_1]__
2. __[STEP_2]__

Expected: __[EXPECTED]__
Actual: __[ACTUAL]__

Environment: __[ENVIRONMENT]__`
    },
    {
      id: 'issue-feature',
      name: 'Feature Request',
      text: `# Feature: __[FEATURE_NAME]__

## Definition of Need
- [ ] Problem clearly defined: __[PROBLEM]__
- [ ] Solution approach agreed upon
- [ ] Acceptance criteria defined
- [ ] Implementation completed
- [ ] Tests added covering key scenarios
- [ ] Documentation updated
- [ ] Stakeholder approval received

## User Story
As a __[USER]__, I want __[CAPABILITY]__ so that __[BENEFIT]__.

## Acceptance Criteria
- [ ] __[CRITERION_1]__
- [ ] __[CRITERION_2]__`
    },
    {
      id: 'issue-docs',
      name: 'Documentation Update',
      text: `# Docs: __[TOPIC]__

## Definition of Need
- [ ] Documentation gaps identified
- [ ] Content created/updated for __[AREAS]__
- [ ] Technical accuracy verified
- [ ] Examples/code snippets tested
- [ ] Formatting and structure follow standards
- [ ] Peer review completed
- [ ] Published to appropriate channels

## Scope
- __[SCOPE_ITEM_1]__
- __[SCOPE_ITEM_2]__`
    }
  ],
  comments: [
    {
      id: 'comment-clarify',
      name: 'Request Clarification',
      text: `# Clarification Needed

## Definition of Need
- [ ] Specific questions clearly articulated
- [ ] Context for why this information is needed provided
- [ ] Current understanding stated for correction
- [ ] Blocker issues identified

## Questions
1. __[QUESTION_1]__?
2. __[QUESTION_2]__?

Current understanding: __[ASSUMPTION]__`
    },
    {
      id: 'comment-suggest',
      name: 'Suggest Alternative',
      text: `# Alternative Suggestion

## Definition of Need
- [ ] Current approach summarized accurately
- [ ] Alternative clearly described
- [ ] Benefits quantified where possible
- [ ] Implementation path outlined
- [ ] Tradeoffs acknowledged

## Suggestion
Instead of __[CURRENT_APPROACH]__, consider __[ALTERNATIVE]__ because:
- __[BENEFIT_1]__
- __[BENEFIT_2]__

Implementation: __[IMPLEMENTATION_NOTES]__`
    }
  ]
};
