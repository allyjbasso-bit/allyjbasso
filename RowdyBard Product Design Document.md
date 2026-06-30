# RowdyBard Product Design Document

## Repository Note
RowdyBard is documented inside the existing `allyjbasso-bit/allyjbasso` repository only. This file is product documentation, not a scaffolded app or separate project.

## Product Summary
RowdyBard is a creative writing companion for people who want help turning rough ideas into vivid stories, scenes, characters, and publishable drafts without losing their own voice.

The product should feel like a lively collaborator: fast, imaginative, opinionated when useful, and focused on helping the writer keep momentum.

## Mission
Help writers move from spark to finished draft with less friction, less blank-page anxiety, and more creative confidence.

## Target Users
- New writers who have ideas but struggle to structure them.
- Hobby writers building short stories, fan fiction, campaigns, poems, or serialized fiction.
- Indie authors who need help with outlining, revision, continuity, and scene polish.
- Game masters who need characters, lore, dialogue, encounters, and session recaps.
- Content creators who want a more theatrical voice for scripts, captions, newsletters, or posts.

## Core Problems
- The blank page is intimidating.
- Ideas are scattered across notes, docs, chats, and notebooks.
- Writers lose continuity across characters, settings, timelines, and lore.
- Revision feels vague: writers know something is wrong, but not what to fix.
- Generic AI writing often flattens the user's voice.
- Creative tools can feel sterile when the work itself should feel alive.

## Product Principle
RowdyBard should not replace the writer. It should keep the writer in flow.

Every feature should answer one of these questions:
- What is the writer trying to make?
- What is blocking them right now?
- What can RowdyBard do in one tap to help them continue?

## MVP Experience
### 1. Project Home
A simple dashboard for active writing projects.

Show:
- Project title
- Genre
- Current draft status
- Last edited section
- Open tasks
- Recent notes
- Continue Writing button

### 2. Idea Capture
A fast input area for rough thoughts.

Examples:
- "A bard wakes up with someone else's memories."
- "Enemies-to-lovers but both are cursed pirates."
- "Need a tavern scene with tension and jokes."

Output:
- Suggested story directions
- Character hooks
- Conflict ideas
- Tone options
- Save to project

### 3. Scene Builder
Guided scene creation.

Fields:
- Scene goal
- Characters present
- Setting
- Emotional tone
- Conflict
- Ending beat

Actions:
- Draft scene
- Outline scene
- Make it funnier
- Make it darker
- Tighten dialogue
- Continue from here

### 4. Character Cards
Reusable character profiles.

Include:
- Name
- Role
- Voice
- Motivation
- Fear
- Secret
- Relationships
- Recurring phrases
- Arc notes
- Continuity warnings

### 5. Lore Binder
A living record for worldbuilding.

Include:
- Locations
- Factions
- Magic rules
- Timeline
- Important objects
- Cultural notes
- Open mysteries
- Canon facts

### 6. Voice Keeper
A style memory that helps preserve the user's writing voice.

Features:
- Save sample passages
- Detect tone
- Suggest style rules
- Rewrite without flattening personality
- Flag when a draft stops sounding like the writer

### 7. Revision Assistant
Focused editing instead of vague feedback.

Revision modes:
- Clarity
- Pacing
- Dialogue
- Emotion
- Tension
- Comedy
- Continuity
- Line polish

Each suggestion should explain:
- What changed
- Why it helps
- Whether it affects voice, plot, or continuity

## Differentiating Feature
### The Bard Table
A single workspace where the user can ask for help in different creative modes:

- **Muse:** brainstorms ideas
- **Editor:** improves structure and prose
- **Actor:** tests dialogue and character voice
- **Lorekeeper:** checks continuity
- **Jester:** adds jokes, chaos, and surprising options
- **Producer:** turns the project into next steps

The user can switch modes without changing tools or losing context.

## Navigation
Mobile-first navigation:
- Projects
- Write
- Characters
- Lore
- Review

Desktop can expand into a side navigation with project sections.

## Design Direction
- Warm, expressive, and writerly
- Mobile-first but comfortable for long desktop sessions
- Large writing controls
- Low-friction capture
- Strong project organization
- Playful without becoming distracting
- Clear distinction between draft text, notes, and AI suggestions

## AI Boundaries
AI should always be assistive and reviewable.

Do:
- Draft options
- Suggest improvements
- Organize notes
- Preserve continuity
- Help continue stuck scenes

Do not:
- Auto-publish
- Replace the user's saved draft without approval
- Pretend generated text is final
- Flatten the user's voice into generic prose

## Future Ideas
- Export to Markdown, DOCX, PDF, or Scrivener-style folders
- Session recap for tabletop campaigns
- Collaborative writing rooms
- Audio narration preview
- Character voice simulation
- Plot hole detector
- Timeline visualizer
- Publishing checklist
- Serial release planner

## Success Metrics
- User captures more ideas instead of losing them.
- User returns to projects more often.
- User completes more scenes.
- User accepts revisions because they preserve voice.
- User reports less blank-page friction.

## Open Questions
- Is RowdyBard primarily for fiction writers, tabletop creators, or both?
- Should the first version prioritize drafting, organizing, or revision?
- How much personality should the assistant have by default?
- Should projects be private local-first, cloud-synced, or both?
- What export formats matter most to early users?
