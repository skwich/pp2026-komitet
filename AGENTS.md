# Repository Guidelines

## Project Structure & Module Organization

The repository has two empty project directories. Use `frontend/` for the user interface and its assets, and `backend/` for server-side code. Keep module-specific documentation with the relevant code. Put instructions that apply to both modules at the repository root.

## Build, Test, and Development Commands

The repository has yet to define build, test, or development commands. When adding the first runnable module, document its prerequisites, dependency installation, and local startup command. Include the working directory for each command so a contributor can run it from a fresh checkout. Use `git status --short` to review the files you changed before committing.

## Coding Style & Naming Conventions

Follow the chosen language's standard conventions for indentation and names until the module defines its own rules. If you introduce a formatter or linter, check in its configuration and document how to run it. Give files and directories names that describe their role, and follow the module's established layout as it develops.

## Testing Guidelines

A test framework, file naming convention, and coverage threshold are still to be established. When introducing tests, follow the framework's discovery conventions and document the command for running the suite. Cover expected behavior and relevant edge cases. Include a regression test when fixing a reproducible bug.

## Commit & Pull Request Guidelines

The repository has no commit history yet. Use short, imperative commit subjects such as `Add frontend setup instructions` and keep each commit focused on one change. In pull requests, summarize the change, list the checks you ran, and link any related issue. Include screenshots for visible interface changes when they help reviewers verify the result.
