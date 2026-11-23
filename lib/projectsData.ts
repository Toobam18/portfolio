// All project content lives here: cards, case study pages, hero stats and the command palette
// read from this one file.
//
// Emphasis: wrap the RESULT part of a sentence in **double asterisks** to render it in the accent
// colour (for example "cutting lookup time by **60%**"). Only emphasize results, never tool names.

export interface ProjectResult {
  /** The big number or short value, for example "60%" or "21" */
  value: string
  /** What the value measures, for example "faster outage-planning lookups" */
  label: string
}

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

/** Illustrations drawn in code (see components/projects/ProjectCover.tsx) */
export type ProjectIllustration = 'motu' | 'coop-tracker'

export type ProjectCoverSource =
  | { kind: 'image'; image: ProjectImage }
  | { kind: 'illustration'; illustration: ProjectIllustration; alt: string }

export interface Project {
  id: string
  /** Short name shown as the main title, for example "MOTU" */
  title: string
  /** Second line under the title, for example "AI Campus Navigation System" */
  subtitle: string
  date: string
  /** One-line summary for cards and the case study header */
  summary: string
  /** Course or context line, for example "SOFE 3700U Data Management Systems" */
  context: string
  role: string
  teamSize: number
  team?: string[]
  /** Short label shown above the title on featured cards, for example "AI and Algorithms" */
  category: string
  featured: boolean
  techStack: string[]
  /** Resume bullets. Pattern: did X using Y, resulting in **Z**. */
  keyPoints: string[]
  cover: ProjectCoverSource
  /** Screenshots shown in the case study gallery */
  images: ProjectImage[]
  /** The problem: why it exists */
  problem: string[]
  /** What I built: approach paragraphs */
  solution: string[]
  /** Key features, rendered as a list under "What I built" */
  features: string[]
  /** Short notes shown beside the architecture diagram (diagram lives in lib/architectureDiagrams.ts) */
  architecture: string[]
  results: ProjectResult[]
  learned: string
  /** Optional proof stat shown in the hero (uses the same ** emphasis) */
  heroStat?: string
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'motu',
    title: 'MOTU',
    subtitle: 'AI Campus Navigation System',
    date: 'Dec 2026',
    summary:
      'Mapping OTU: an AI route planner that finds the best path between rooms across Ontario Tech buildings and floors, comparing four search algorithms under different cost modes.',
    context: 'Introduction to Artificial Intelligence, Fall 2026',
    role: 'AI developer',
    teamSize: 4,
    team: ['Pavishan Chandrakumar', 'Adiyat Jubair', 'Vishal Kathiran Kannan'],
    category: 'AI and Algorithms',
    featured: true,
    techStack: ['Python', 'A*', 'Greedy Best-First', 'UCS', 'BFS'],
    keyPoints: [
      'Built a multi-floor route planner for 4 Ontario Tech buildings by implementing A*, Greedy Best-First, UCS and BFS over a weighted campus graph, returning **optimal routes in under 50 ms**.',
      'Designed admissible distance, time and weather heuristics with costs for elevators, blocked hallways and indoor preference, **matching UCS’s optimal cost in 100% of 30+ trials**.',
      'Benchmarked all 4 algorithms on path cost, nodes expanded and runtime across randomized trials, showing **A* expanded 60% fewer nodes than UCS**.',
    ],
    cover: {
      kind: 'illustration',
      illustration: 'motu',
      alt: 'Illustration of the MOTU campus graph: UA, UB, the Library and Shaw drawn as stacked floors of connected nodes, with a highlighted route from a room in UA to a room in Shaw.',
    },
    images: [],
    problem: [
      'Getting around Ontario Tech means choosing between entrances, stairs, elevators, hallways and outdoor paths across several buildings. The shortest walk on a map is not always the best route: a hallway might be closed, it might be raining, or you might want to stay indoors.',
      'We wanted an agent that finds the cheapest route between any two rooms on campus, across buildings and floors, and reports clearly when no route exists.',
    ],
    solution: [
      'We modelled the campus as a weighted graph. Every room, hallway junction, entrance, stairwell and elevator on each floor is a state, and every connection between them is an action with a cost. The user picks a start, a goal, a map, an algorithm and a cost mode.',
      'The cost function accounts for weather, blocked hallways and indoor preference. Elevators add 0 m of distance but add wait and ride time, so the distance and time modes can pick different routes. The search engine then runs Uniform Cost Search, Greedy Best-First, A* or BFS and returns the route, its total cost and the search metrics.',
    ],
    features: [
      'Four buildings (UA, UB, the Library and Shaw) with multiple floors linked by stairs and elevators',
      'Three cost modes: distance, time and weather, each with its own heuristic',
      'Blocked hallways and an indoor preference that change edge costs at query time',
      'Path display with the full route and total cost, plus metrics for cost, nodes expanded, runtime and whether a route was found',
      'Experiment harness that runs 30+ randomized trials and checks that A* and UCS always agree on path cost',
    ],
    architecture: [
      'Inputs: MOTU map data for UA, UB, the Library and Shaw, plus the user’s start, goal, map, algorithm and cost mode.',
      'AI core: the graph and cost function feed a search engine that runs UCS, Greedy, A* or BFS, using the heuristic that matches the cost mode.',
      'Outputs: the route with its total cost, and the metrics (cost, nodes expanded, time, found) used in the experiments.',
    ],
    results: [
      { value: '<50 ms', label: 'to return an optimal route' },
      { value: '100%', label: 'of 30+ trials matched UCS optimal cost' },
      { value: '60%', label: 'fewer nodes expanded by A* than UCS' },
      { value: '4', label: 'search algorithms benchmarked' },
    ],
    learned:
      'A heuristic is only useful if you can prove it never overestimates, and writing that proof for each cost mode changed how we designed them. Running randomized trials against UCS as a reference caught bugs that hand-picked test routes never would have.',
    heroStat: 'A* routing in **under 50 ms**',
  },
  {
    id: 'coop-tracker',
    title: 'Co-op Tracker',
    subtitle: 'Self-Updating Application Tracker',
    date: 'Nov 2026',
    summary:
      'An open-source app that tracks co-op applications by itself: a browser extension saves postings in one click, and a Gmail sync moves each application from Applied to Offer as employers reply.',
    context: 'Personal project, open source',
    role: 'Solo full-stack developer',
    teamSize: 1,
    category: 'Full-Stack and Automation',
    featured: true,
    heroStat: '**57** automated tests in CI',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Gmail API', 'OAuth 2.0', 'WebExtensions', 'd3', 'Docker', 'Jest', 'GitHub Actions'],
    keyPoints: [
      'Built a full-stack tracker with React, Node.js/Express and PostgreSQL that reads employer replies through the Gmail API with OAuth 2.0, **updating application statuses automatically**.',
      'Developed a Firefox and Chrome extension that extracts job details from postings and co-op portal tables, **saving any posting in one click** with duplicate detection by Job ID.',
      'Wrote 57 Jest and Supertest tests in a GitHub Actions pipeline that also builds and starts the Docker image, **catching regressions on every push**.',
    ],
    cover: {
      kind: 'image',
      image: {
        src: '/images/projects/coop-tracker/dashboard.webp',
        alt: 'Co-op Tracker dashboard with application counts, response and interview rates, a weekly goal ring, upcoming deadlines and interviews, a weekly applications chart and a Gmail activity feed.',
        width: 1600,
        height: 1000,
      },
    },
    images: [
      {
        src: '/images/projects/coop-tracker/dashboard.webp',
        alt: 'Co-op Tracker dashboard with stat cards, a weekly goal ring, a coming up list, a weekly applications chart and Gmail activity.',
        width: 1600,
        height: 1000,
        caption: 'Dashboard: stat cards filter the table, and the Gmail feed shows what the sync changed.',
      },
      {
        src: '/images/projects/coop-tracker/insights.webp',
        alt: 'Insights page with a Sankey diagram from Applications to No reply, Ghosted, Assessment and Interview, then on to Offer or Rejected after interview, above reply rates by resume version.',
        width: 1600,
        height: 1000,
        caption: 'Insights: a d3 Sankey of where every application ended up, and reply rates by resume version.',
      },
      {
        src: '/images/projects/coop-tracker/detail.webp',
        alt: 'Application detail panel for an RBC interview showing the interview time, notes, Add to Google Calendar button and an email timeline.',
        width: 1600,
        height: 1000,
        caption: 'Every application has a timeline of the emails the sync matched to it.',
      },
      {
        src: '/images/projects/coop-tracker/calendar-dark.webp',
        alt: 'Calendar in dark mode with interview and deadline events for November 2026.',
        width: 1600,
        height: 1000,
        caption: 'Calendar of deadlines and interviews, with Google Calendar and .ics export.',
      },
    ],
    problem: [
      'Applying for co-op means juggling dozens of postings across the school portal, LinkedIn and Indeed, then watching an inbox for assessment invites, interviews and rejections. A spreadsheet only works if you update it, and nobody does once the emails start piling up.',
      'I wanted a tracker that keeps itself up to date: capture a posting the moment I see it, then let the replies move each application through the pipeline without any typing.',
    ],
    solution: [
      'A browser extension captures postings. It reads structured JobPosting data when a site provides it, and the label tables that school co-op portals use when it does not. It uses the posting’s Job ID to tell apart portal postings that share one web address.',
      'A background job checks Gmail every 15 minutes with read-only OAuth access, searching only for likely application updates. Each email is classified as a confirmation, assessment, interview, offer or rejection, matched to an application by normalized company name, and allowed only to move it forward. Every processed message ID is stored so nothing is handled twice.',
      'The app is open source and runs entirely on the user’s own computer: one Docker command starts the API, the React app and PostgreSQL, and database migrations run on startup.',
    ],
    features: [
      'One-click capture in Firefox and Chrome, with duplicate detection',
      'Gmail sync with a rule-based email reader, or Claude for any wording when an API key is added',
      'd3 Sankey diagram of outcomes, which tracks the furthest stage each application reached',
      'Reply and interview rates by resume version and cover letter',
      'Weekly goal ring and streak, calendar view, desktop notifications and Ctrl+K command bar',
      'CSV import with automatic column, date and status matching, plus CSV export',
      'Dark mode, mobile layout, and installable as a desktop app (PWA)',
    ],
    architecture: [
      'Browser extension and React app call the same REST API; the extension sends the page’s structured data and label tables for extraction.',
      'Node.js and Express serve 21 REST endpoints, the email reader and the scheduled Gmail sync, with parameterized SQL throughout.',
      'PostgreSQL stores applications, processed emails and settings. The Claude API is optional and only used when a key is configured.',
    ],
    results: [
      { value: '1 click', label: 'to save a posting' },
      { value: '15 min', label: 'between automatic Gmail checks' },
      { value: '57', label: 'automated tests in CI' },
      { value: '21', label: 'REST API endpoints' },
    ],
    learned:
      'Testing the extension on a real co-op portal page caught a bug no unit test would have: every posting shared one web address, so they all looked like duplicates. Matching on the posting’s Job ID fixed it. I also learned to keep status changes forward-only, because emails arrive out of order and an old confirmation should never undo an interview.',
    githubUrl: 'https://github.com/Toobam18/coop-tracker',
  },
  {
    id: 'nuclearops',
    title: 'NuclearOps',
    subtitle: 'Maintenance and Outage Tracker',
    date: 'Dec 2026',
    summary:
      'A full-stack web app that tracks maintenance work, equipment, workers and planned outages at nuclear generating stations in one place.',
    context: 'SOFE 3700U Data Management Systems, Fall 2026',
    role: 'Full-stack developer',
    teamSize: 4,
    team: ['Pavishan Chandrakumar', 'Adiyat Jubair', 'Vishal Kathiran Kannan'],
    category: 'Full-Stack Web',
    featured: true,
    techStack: ['Python', 'Flask', 'PostgreSQL', 'JavaScript', 'Chart.js', 'pandas'],
    keyPoints: [
      'Built a Flask web app with a team of 4 exposing 21 REST API endpoints for work orders, equipment and workers, **centralizing maintenance data previously split across 4+ separate records**.',
      'Designed a 12-table PostgreSQL schema and 10 SQL views flagging overdue inspections, low-stock parts and expiring certifications, **cutting outage-planning lookup time by 60%**.',
      'Implemented role-based access control with hashed passwords and CSV/PDF report export using pandas and fpdf2, **reducing manual report preparation by 75%**.',
    ],
    cover: {
      kind: 'image',
      image: {
        src: '/images/projects/nuclearops/dashboard.webp',
        alt: 'NuclearOps dashboard showing counts for active work orders, overdue inspections, parts to reorder and outages in progress, with bar charts of work orders by priority and status.',
        width: 1600,
        height: 1000,
      },
    },
    images: [
      {
        src: '/images/projects/nuclearops/dashboard.webp',
        alt: 'NuclearOps dashboard with summary counts and Chart.js charts for backlog by priority, work orders by status and planned versus actual outage length.',
        width: 1600,
        height: 1000,
        caption: 'Dashboard: live counts and three Chart.js charts fed by the /api/charts endpoint.',
      },
      {
        src: '/images/projects/nuclearops/work-orders.webp',
        alt: 'NuclearOps work orders page with keyword, status, priority, station and due date filters above a table of 13 work orders, with overdue dates shown in red.',
        width: 1600,
        height: 1000,
        caption: 'Work orders: search and filters run as parameterized SQL, and edits save without a page reload.',
      },
      {
        src: '/images/projects/nuclearops/reports.webp',
        alt: 'NuclearOps reports page listing the 10 database views, each with buttons to view it or export it.',
        width: 1600,
        height: 1000,
        caption: 'Reports: all 10 SQL views in one place.',
      },
      {
        src: '/images/projects/nuclearops/report-overdue-inspections.webp',
        alt: 'NuclearOps overdue inspections report shown as an HTML table with CSV and PDF export buttons.',
        width: 1600,
        height: 1000,
        caption: 'Any report exports to CSV (pandas) or PDF (fpdf2).',
      },
      {
        src: '/images/projects/nuclearops/weather.webp',
        alt: 'NuclearOps outage weather page showing saved readings, average temperature, highest wind and total precipitation, with a temperature and wind chart.',
        width: 1600,
        height: 1000,
        caption: 'Outage weather: readings from the Open-Meteo API are saved to WEATHER_LOG and summarized.',
      },
    ],
    problem: [
      'A nuclear station has thousands of pumps, valves and pipes that need inspections and repairs under a CNSC-required maintenance program. Much of that work happens during planned outages, while the reactor is shut down and producing no electricity, so every extra outage day is expensive.',
      'Repair requests, inspection records, spare parts and staff schedules are usually stored separately. When nobody can see them together, inspections get missed and outages run long.',
    ],
    solution: [
      'We built NuclearOps in three phases: a proposal, a database design and a web application. The database models the station from the top down (station, reactor unit, plant system, equipment) and links work orders to the equipment, outage and worker involved.',
      'The Flask app serves the pages and a JSON REST API. Every page talks to the API with the Fetch API, so planners can search, create and edit records without reloading. The ten reporting views answer the questions planners ask before an outage: what is overdue, what parts are low, and who is free and certified.',
    ],
    features: [
      '21 REST API endpoints, with full CRUD for work orders, equipment and workers plus stations, systems and outages',
      'Role-based access control with admin, user and guest roles and hashed passwords',
      'Dashboard, work orders, equipment, workers, weather and reports pages',
      'Dynamic forms: picking equipment auto-fills its location and narrows the outage and worker lists',
      'Any report exports to CSV or PDF',
      'Outage weather from the Open-Meteo API, saved to the database with a summary and chart',
    ],
    architecture: [
      'Browser: HTML, CSS and JavaScript pages that call the API with the Fetch API and draw charts with Chart.js.',
      'Flask app: page routes, the REST API, session login with role checks, and server-side validation. All SQL is parameterized.',
      'PostgreSQL: 12 tables and 10 views. Side paths go to the Open-Meteo API for weather and to the export module (pandas and fpdf2) for CSV and PDF.',
    ],
    results: [
      { value: '60%', label: 'faster outage-planning lookups' },
      { value: '75%', label: 'less manual report preparation' },
      { value: '21', label: 'REST API endpoints' },
      { value: '12', label: 'tables in the PostgreSQL schema' },
      { value: '10', label: 'SQL views for planners' },
    ],
    learned:
      'Designing the schema and views before writing any Flask code made the app itself almost straightforward, because each page became a thin layer over a view or table. Keeping every query parameterized and every role check in one decorator also made security reviews quick for a team of four.',
    heroStat: '**21-endpoint** Flask API',
    githubUrl: 'https://github.com/c-pavi/nuclearops',
  },
  {
    id: 'finance-tracker',
    title: 'Finance Tracker',
    subtitle: 'Budgets, recurring bills and insights',
    date: 'Nov 2026',
    summary:
      'A personal finance app to log income and expenses, set budgets and manage recurring bills with monthly insights.',
    context: 'Personal project',
    role: 'Solo full-stack developer',
    teamSize: 1,
    category: 'Web App',
    featured: false,
    techStack: ['JavaScript', 'Supabase', 'Chart.js', 'Jest', 'GitHub Actions'],
    keyPoints: [
      'Built a finance tracker with expense logging, input validation and live spending summaries using JavaScript and Supabase, **reducing manual budgeting time by 80%**.',
      'Added 25+ Jest unit tests to a GitHub Actions CI pipeline, **reaching 90% test coverage** and catching regressions before every merge.',
    ],
    cover: {
      kind: 'image',
      image: {
        src: '/images/projects/finance-tracker/overview.webp',
        alt: 'Finance Tracker showing total income, total expenses and net balance for January 2026 above the add transaction form.',
        width: 1277,
        height: 800,
      },
    },
    images: [
      {
        src: '/images/projects/finance-tracker/overview.webp',
        alt: 'Finance Tracker overview with monthly totals for income, expenses and net balance, and the add transaction form.',
        width: 1277,
        height: 800,
        caption: 'Monthly totals update live as transactions are added.',
      },
      {
        src: '/images/projects/finance-tracker/breakdown.webp',
        alt: 'Finance Tracker transactions table and a Chart.js pie chart of spending by category.',
        width: 1277,
        height: 1000,
        caption: 'Transactions and the Chart.js spending breakdown.',
      },
      {
        src: '/images/projects/finance-tracker/budgets.webp',
        alt: 'Finance Tracker budgets table showing spent versus budget per category, and a list of recurring rules.',
        width: 1277,
        height: 1245,
        caption: 'Per-category budgets and recurring rules that generate transactions automatically.',
      },
    ],
    problem: [
      'Budgeting in a spreadsheet means typing the same rent, salary and subscription rows every month and doing the category maths by hand. It is easy to overspend without noticing until the month is over.',
    ],
    solution: [
      'I built a web app on Supabase (PostgreSQL) for authentication and storage, with Row Level Security so each user can only read and write their own rows. Recurring rules generate transactions automatically, and budgets warn you when a category goes over.',
      'Every change runs through a GitHub Actions pipeline with Jest unit tests before it can merge, and the app deploys to Vercel.',
    ],
    features: [
      'Expense and income logging with input validation',
      'Monthly filtering with live totals for income, expenses and net balance',
      'Per-category budgets with over-budget warnings',
      'Recurring rules that auto-generate transactions',
      'Chart.js spending breakdown by category',
    ],
    architecture: [
      'Vanilla JavaScript frontend deployed on Vercel, with Chart.js for the spending breakdown.',
      'Supabase for authentication and a PostgreSQL database protected by Row Level Security.',
      'GitHub Actions runs the Jest suite on every pull request before merge.',
    ],
    results: [
      { value: '80%', label: 'less manual budgeting time' },
      { value: '90%', label: 'test coverage' },
      { value: '25+', label: 'Jest unit tests in CI' },
    ],
    learned:
      'Row Level Security moved authorization into the database, which meant one policy protected every query instead of a check in every function. Writing tests early made it safe to refactor the recurring rules logic twice.',
    githubUrl: 'https://github.com/Toobam18/finance-tracker',
    liveUrl: 'https://finance-tracker-khaki-theta.vercel.app',
  },
  {
    id: 'taskly',
    title: 'Taskly',
    subtitle: 'Task Manager Web App',
    date: 'Sep 2025',
    summary:
      'A full-stack task manager for organizing academic and personal tasks, built as a three-person team project.',
    context: 'Team project',
    role: 'Full-stack developer',
    teamSize: 3,
    category: 'Web App',
    featured: false,
    techStack: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    keyPoints: [
      'Developed a full-stack task manager with PHP CRUD operations and a MySQL database, **improving on-time task completion by 25% among 10 peer testers**.',
      'Secured accounts with bcrypt password hashing and session-based authentication, **achieving zero cross-account data access in testing**.',
    ],
    cover: {
      kind: 'image',
      image: {
        src: '/images/projects/taskly/dashboard.webp',
        alt: 'Taskly dashboard with a navigation sidebar for views and filters, a new task form, and a monthly calendar view.',
        width: 1600,
        height: 1265,
      },
    },
    images: [
      {
        src: '/images/projects/taskly/dashboard.webp',
        alt: 'Taskly dashboard with the add task form, category and status filters, and the Cards, Table and Calendar views.',
        width: 1600,
        height: 1265,
        caption: 'One dashboard with Cards, Table and Calendar views, switched with AJAX and no page reloads.',
      },
    ],
    problem: [
      'Students juggle assignments, labs and exams across several courses, and generic to-do apps do not group work by course or show deadlines on a calendar. The idea came from a Notion workspace I built to manage my own courses and exams.',
    ],
    solution: [
      'Our team built a PHP and MySQL web app with full create, read, update and delete for tasks. The dashboard has three views (Cards, Table and Calendar) that switch with AJAX, so the page never reloads.',
      'Accounts use bcrypt password hashing and session-based authentication, and every query is scoped to the logged-in user.',
    ],
    features: [
      'Create, edit, delete and complete tasks',
      'Filtering by category and status',
      'Cards, Table and Calendar views with AJAX navigation',
      'Secure accounts with bcrypt and sessions',
    ],
    architecture: [
      'HTML, CSS and JavaScript frontend that loads views with AJAX.',
      'PHP backend handling sessions, authentication and CRUD endpoints.',
      'MySQL database with every task query scoped to the logged-in user.',
    ],
    results: [
      { value: '25%', label: 'better on-time completion among 10 testers' },
      { value: '0', label: 'cross-account data access in testing' },
      { value: '3', label: 'views: Cards, Table and Calendar' },
    ],
    learned:
      'This was my first team project with a shared database, and agreeing on the schema before splitting up the work saved us from painful merges later. Testing with real classmates showed which features actually helped people finish on time.',
    githubUrl: 'https://github.com/Toobam18/taskly',
  },
]

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Full display name, for example "MOTU: AI Campus Navigation System" */
export function projectFullName(p: Project): string {
  return `${p.title}: ${p.subtitle}`
}
