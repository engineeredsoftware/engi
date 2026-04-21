# 🔍 BITCODE CODE REVIEW FRAMEWORK

Interactive full-screen code review system for optimal feedback collection and rapid iteration.

## Quick Usage

```bash
# Run a review and copy results to clipboard
bash scripts/code-review/reviews/review_prompt_primitives_evolution.sh | pbcopy

# Then paste the results directly into chat for feedback
```

## How It Works

1. **Full-Screen Interactive Experience**: Each review opens a clean, focused terminal interface
2. **Code Display**: Shows exact code snippets with line numbers and syntax highlighting  
3. **Strategic Questions**: Presents specific questions to minimize review surface area
4. **Structured Output**: Exports responses in a format perfect for chat feedback

## Review Structure

Each review consists of:
- **Sub-Reviews A-E**: Focused sections covering different aspects
- **Code Windows**: Displays relevant code snippets with context
- **Strategic Questions**: Targeted questions for optimal feedback
- **Response Collection**: Structured collection of all feedback

## Creating New Reviews

1. Copy `reviews/review_prompt_primitives_evolution.sh` as a template
2. Modify the sub-review functions to show relevant code and ask relevant questions
3. Update the main review title and description
4. Make executable with `chmod +x`

## Features

- **Optimal Code Display**: Shows exactly what needs review
- **Minimal Surface Area**: Strategic questions that maximize learning
- **Fast Iteration**: Quick to run, quick to review, quick to feedback
- **Structured Export**: Perfect format for chat-based collaboration

This system dramatically accelerates code review cycles by presenting exactly the right information for comprehensive feedback.
