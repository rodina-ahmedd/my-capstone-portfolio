# [CLAUDE.md](http://CLAUDE.md)

## Project Overview

This is a personal capstone portfolio built to showcase frontend development skills.

## Tech Stack

- React (with Vite)

- JavaScript

- ESLint for linting

## Conventions

- Components go in `src/components/`, one component per file

- Use functional components with hooks (no class components)

- File names for components use PascalCase (e.g., `Header.jsx`)

- Use Conventional Commits format for all commits (feat:, fix:, docs:, chore:, etc.)

## Notes

- This project follows an explore-plan-code-verify workflow when using AI assistance

- Run `npm run dev` to start the local dev server

- Run `npm run lint` to check code style
## Rules Learned from FE-01 (Vague vs. Precise Prompt Drill)

1. **Forms always need explicit accessibility requirements in the prompt.**
   Every input must have a `<label htmlFor>` paired with its `id`, every
   validation error must be linked to its input via `aria-describedby`,
   and every error message must use `role="alert"`. This does not happen
   automatically — it must be stated as a constraint, or it may be skipped.

2. **Never rely on branch/file names to convey intent — state it in the prompt.**
   The AI read "lazy" in a branch name (`round1-lazy-settings-form`) as an
   instruction to use `React.lazy`/`Suspense`, not as a description of prompt
   effort. Constraints and intent must be written out in plain language in
   the prompt itself, never implied through naming.

3. **Any component with validation logic must ship with unit tests before
   being considered done.** Tests should cover: each required-field rule,
   each optional-field rule (confirming no error when empty), and at least
   one invalid-format case per field. A component "looks correct" is not
   sufficient — a passing test suite is.