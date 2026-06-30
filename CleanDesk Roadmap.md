# CleanDesk Roadmap

## Product Focus
CleanDesk AI is for small residential cleaning companies with roughly 1-10 cleaners.

The first ideal customer is someone like Rachel: an owner-operator who still cleans, manages a small team, handles leads herself, and relies on Apple Calendar, paper notes, text messages, and phone photos to run the business.

CleanDesk should not try to beat broad field-service platforms on feature count. It should win by becoming the living memory and daily operating system for residential cleaning businesses.

## Core Mission
Every time Rachel has to stop cleaning to do office work, CleanDesk should either automate it or reduce it to one tap.

## Current MVP
The current prototype includes:

- Role switcher for Rachel, Becca, Rachelle, Emily, and Noah
- Rachel Morning Brief
- Daily Inbox
- Dispatch board
- Cleaner dashboard
- Cleaning Mode
- Completion workflow
- House Brain
- House Brain timeline
- Property photo folders
- Walkthrough notes
- Leads with draft replies
- Airbnb turnover workflow
- Marketing helper
- Supply inventory mockup
- Follow-up reminders
- Mock AI service layer
- Product vision document

## Version 1.0
Version 1.0 should turn the prototype into a usable SaaS foundation.

### Authentication & Real Data
- Add Supabase authentication
- Create user accounts
- Add organizations as tenant workspaces
- Support invite-only employees
- Replace local mock data with database-backed screens
- Ensure every query is organization-scoped

### Multi-Tenant SaaS Architecture
Each cleaning company must only see its own data.

Example:
- Rachel's Cleaning sees only Rachel's clients, jobs, employees, photos, leads, and settings.
- Sarah's Cleaning sees only Sarah's company data.

### Core Database
Initial tables:

- Organizations
- Users
- Employees
- Clients
- Properties
- Jobs
- Walkthroughs
- HouseBrain
- Photos
- Messages
- Leads
- Invoices
- Inventory
- Notifications
- CleaningTypes
- Products
- Settings

### Customer Onboarding
New account flow:

1. Welcome
2. Company name
3. Number of cleaners
4. Residential, Airbnb, commercial, or mixed
5. Service area
6. Cleaning types offered
7. Starter products
8. Option to preload demo data

### Settings
Rachel needs configuration for:

- Business profile
- Employees
- Roles and permissions
- Products
- Cleaning types
- Service area
- Business hours
- Pricing defaults
- Notification preferences

## Version 1.1
Version 1.1 should deepen daily operations after the SaaS foundation works.

### In-App Notifications
Not real texting yet.

Examples:
- Becca finished Johnson clean.
- Emily reported damage.
- Inventory is low.
- New lead arrived.
- Client has not confirmed.

### Universal Search
One search bar for:

- Client
- Property
- Lead
- Job
- Photo
- Message
- Walkthrough
- Invoice

### Attachments Everywhere
Attach files to clients, properties, jobs, walkthroughs, and messages:

- Photos
- Videos
- PDFs
- Documents
- Contracts
- Inspection reports

### Mobile Polish
Rachel uses this while cleaning.

Improve:
- Larger tap targets
- Faster camera-first actions
- Cleaner one-handed flows
- Swipe actions for inbox items
- Offline placeholders
- Better loading states
- Fewer dense cards during active jobs

### Permissions
Initial roles:

- Cleaner
- Lead
- Manager
- Owner
- Admin

Each role should have distinct navigation, visible data, and allowed actions.

## Version 2.0
Version 2.0 should add portals and richer operational insight.

### Customer Portal
Customers can:

- Book
- Pay
- Reschedule
- View selected photos
- Message
- Leave reviews

### Employee App
Cleaner experience should stay extremely focused:

- Today's jobs
- Start Job
- Complete Job
- House Brain
- Chat
- Done

### Admin Portal
Rachel sees:

- All jobs
- Team status
- Leads
- Airbnb turnovers
- Invoices
- Inventory
- Follow-ups
- Settings
- Analytics

### Marketing Site
Eventually needed:

- Landing page
- Pricing
- Features
- Demo
- Sign up
- Customer stories

## Future Integrations
Integrations should be added one at a time after the core workflow is validated.

Planned:

- Twilio for texts
- Stripe for payments
- Google Calendar
- Apple Calendar support path
- Google Maps
- Facebook
- QuickBooks
- OpenAI or Anthropic for AI workflows
- Supabase Storage for photos and attachments

## Database Schema
High-level schema direction:

### Organizations
Represents each cleaning company workspace.

Key fields:
- id
- name
- plan
- created_at

### Users
Authentication identity.

Key fields:
- id
- email
- name
- active_organization_id

### Employees
Company-specific worker profile.

Key fields:
- id
- organization_id
- user_id
- name
- role
- phone
- active

### Clients
Residential customer record.

Key fields:
- id
- organization_id
- name
- phone
- email
- notes

### Properties
The house or Airbnb being cleaned.

Key fields:
- id
- organization_id
- client_id
- address
- property_type
- access_notes
- parking_notes
- alarm_notes

### HouseBrain
Living memory for each property.

Key fields:
- id
- organization_id
- property_id
- pets
- preferred_products
- products_to_avoid
- floor_types
- countertop_types
- recurring_requests
- health_score
- average_clean_time
- last_visit_summary

### Jobs
Scheduled work.

Key fields:
- id
- organization_id
- property_id
- assigned_employee_id
- job_type
- status
- starts_at
- ends_at
- confirmation_status
- completed_at

### Walkthroughs
Quote and intake record.

Key fields:
- id
- organization_id
- property_id
- requested_cleaning_type
- bedrooms
- bathrooms
- square_feet
- quote_min
- quote_max
- notes

### Photos
Attachments grouped by purpose.

Key fields:
- id
- organization_id
- property_id
- job_id
- category
- storage_path
- caption

### Messages
Job or client-attached communication.

Key fields:
- id
- organization_id
- job_id
- property_id
- sender_id
- message
- created_at

### Inventory
Products and supplies.

Key fields:
- id
- organization_id
- name
- quantity
- unit
- reorder_at

## API Architecture
Initial API/server action areas:

- Auth/session helpers
- Organization context
- Role and permission checks
- Client/property CRUD
- Job CRUD
- Walkthrough CRUD
- House Brain updates
- Photo upload and retrieval
- Message creation
- Lead draft generation
- Notification creation
- Inventory updates

Important rule:
Every API path and database query must enforce `organization_id`.

## Pricing Strategy
Initial hypothesis:

- Target small residential cleaning companies with 1-10 cleaners.
- Charge per company plus optional per-cleaner scaling.

Possible pricing:

- Starter: solo owner, low monthly price
- Team: includes multiple cleaners and House Brain
- Growth: adds Airbnb workflows, AI drafts, customer portal, and analytics

Early pricing questions:

- Does Rachel think per-cleaner pricing feels fair?
- Would owner-operators pay more for fewer interruptions?
- Is House Brain the premium differentiator?
- Are Airbnb turnovers a separate add-on?

## Competitor Analysis
Primary alternatives:

- Jobber
- Housecall Pro
- Launch27
- ZenMaid
- Google Calendar
- Apple Calendar
- Paper planners
- Text messages
- Camera roll

CleanDesk differentiation:

- House Brain as living operational memory
- Cleaner-first active job mode
- Daily Inbox for interruptions
- Residential cleaning-specific workflows
- Airbnb turnover workflow for small operators
- Photo and note organization by house
- AI only where it reduces repetitive admin

## Known Bugs
- Prototype uses mock data.
- No real auth yet.
- No database persistence yet.
- Buttons marked as placeholders do not perform real actions.
- Photo uploads are placeholders.
- Notifications are not persistent.
- No real permission enforcement until auth/database exist.

## Customer Feedback
Rachel pain points captured so far:

- Uses Apple Calendar and paper planner.
- Can share calendar with iPhone users but not Android users easily.
- Accidentally schedules on wrong day when busy.
- Answers Angi/Facebook leads while cleaning.
- Writes walkthrough notes by hand.
- Stores photos in phone camera roll.
- Forgets house-specific details unless she checks planner.
- Wants automated confirmation/reminder texts eventually.
- Wants help managing Airbnb turnovers without constant texting.
- Wants help posting before/after photos on Facebook.

## Feature Requests
Current requested / planned features:

- Daily Inbox
- Morning Brief
- House Brain timeline
- Property photo gallery
- Cleaner chat
- Supply inventory
- Repeat requests
- Airbnb turnover workflow
- Estimate builder
- Follow-up reminders
- House Health Score
- Auth and real data
- Customer portal
- Employee app
- Admin portal
- Marketing site

## Technical Debt
- Convert mock data to Supabase tables.
- Create reusable data access layer.
- Add organization-scoped query helpers.
- Add tests for permission boundaries.
- Replace placeholder buttons with real actions.
- Add upload/storage architecture.
- Add error and loading states.
- Add mobile QA pass for every route.
- Improve README with setup instructions.

## Beta Plan
Stop adding features after Version 1.0 foundation.

Give Rachel an account.

Do not over-explain the app.

Watch:
- Where she hesitates
- What she tries to tap
- What she cannot find
- What she ignores
- What she says she still needs Apple Calendar, paper, text messages, or camera roll for

Every confusion becomes roadmap input.
