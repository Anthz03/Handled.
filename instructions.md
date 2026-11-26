## 22. Mandatory Project Documentation and Continuity Protocol

An essential requirement for this project is that **every completed phase, feature, component, and significant development task must be properly documented.** The documentation will serve as the central reference for continuing the project in future sessions, preventing repeated work, confusion, and inconsistencies.

### A. Maintain a Central Project Documentation Folder

Create and continuously update a dedicated `/docs` folder in the project root. Maintain the following documentation files:

1. **PROJECT_OVERVIEW.md**
   - Project purpose, business concept, target clients, and objectives.
   - Brand identity, positioning, and confirmed business decisions.
   - Overall project scope and planned features.

2. **PROJECT_STATUS.md**
   - Current development phase.
   - Completed tasks and features.
   - Ongoing tasks and their progress.
   - Pending tasks and known issues.
   - The exact next steps required to continue development.

3. **DEVELOPMENT_LOG.md**
   - Chronological record of development activities.
   - Date of each update.
   - Features implemented or modified.
   - Files created, updated, or removed.
   - Bugs encountered and their corresponding resolutions.
   - Important technical decisions and explanations.

4. **TECHNICAL_DOCUMENTATION.md**
   - Technology stack and project architecture.
   - Folder and file structure.
   - Component descriptions and dependencies.
   - API routes, integrations, and environment configurations.
   - Authentication, authorization, and security implementation.

5. **DATABASE_DOCUMENTATION.md**
   - Database structure and ERD.
   - Tables, columns, relationships, and constraints.
   - Database migrations and changes.
   - Row Level Security (RLS) policies.
   - Database functions, triggers, and important queries.

6. **DESIGN_SYSTEM.md**
   - Brand colors, typography, spacing, and design principles.
   - Reusable UI components.
   - Layout standards and responsive behavior.
   - Design changes and established visual conventions.

7. **SETUP_AND_DEPLOYMENT.md**
   - Local development setup instructions.
   - Required dependencies and installation commands.
   - Environment variables (document variable names only; NEVER expose actual secrets).
   - Third-party service configurations.
   - Build, testing, and deployment instructions.
   - Troubleshooting procedures.

8. **KNOWN_ISSUES_AND_TODO.md**
   - Unresolved bugs and technical limitations.
   - Incomplete features.
   - Future improvements and enhancements.
   - Priority level and recommended resolution.

### B. Document Every Completed Phase or Development Task

At the end of every development phase or significant task, you MUST:

1. Summarize what was accomplished.
2. Identify all files created, modified, or deleted.
3. Explain how the implemented features work.
4. Record relevant technical decisions and why they were made.
5. Document database changes, integrations, and configuration requirements.
6. Record any bugs, limitations, or unfinished work.
7. Update the project status and identify the next recommended steps.
8. Update the relevant documentation files before considering the task complete.

Do not consider a phase fully completed until its implementation and documentation have both been addressed.

### C. Mandatory Documentation Check Before Continuing

Whenever I return to this project, start a new conversation, or ask you to continue development:

1. **Read the existing project documentation first**, particularly `PROJECT_OVERVIEW.md`, `PROJECT_STATUS.md`, `DEVELOPMENT_LOG.md`, and any documentation relevant to the requested task.
2. Inspect the existing project files and current implementation when necessary.
3. Identify the last completed phase and the exact point where development stopped.
4. Review pending tasks, known issues, and previously established technical decisions.
5. Continue from the documented progress instead of rebuilding, duplicating, or unnecessarily changing existing work.

Do not immediately start coding without first understanding the existing project state.

If documentation is missing, outdated, or inconsistent with the actual code, inspect the project, identify the discrepancies, and update the documentation before proceeding.

### D. Preserve Existing Work and Decisions

- Do not unnecessarily rewrite or replace completed features.
- Do not change the established technology stack, database structure, branding, or architecture without a clear technical reason.
- Before modifying an existing feature, understand how it connects to other components.
- Maintain compatibility with previously implemented functionality.
- If a change is necessary, document what changed, why it changed, and which parts of the project are affected.
- Never assume that a feature is implemented simply because it appears in the documentation. Verify the actual code.

### E. End-of-Session Handover Report

At the end of every working session, provide a concise handover report containing:

**SESSION SUMMARY**
- What was accomplished.
- Features completed or improved.
- Files affected.

**CURRENT PROJECT STATUS**
- Current phase.
- Completed milestones.
- Remaining tasks.

**ISSUES AND REQUIREMENTS**
- Outstanding bugs or limitations.
- Required credentials, configurations, or external dependencies (without revealing secrets).

**NEXT SESSION INSTRUCTIONS**
- Exact task to work on next.
- Relevant files to inspect.
- Documentation files to read before continuing.

Update the project documentation before providing the handover report.

### F. Core Rule: Documentation Is the Source of Continuity

Treat the `/docs` folder as the project's central knowledge base.

**Every time development resumes, consult the documentation first. Every time development progresses, update the documentation afterward.**

The objective is to ensure that development can continue across multiple Claude sessions without losing context, repeating completed work, or making conflicting technical decisions.

Do not rely solely on conversation history or memory. The actual project files and updated documentation must always be the primary source of truth.