// Layout specs for the architecture diagrams on each case study page.
// Rendered as SVG by components/projects/ArchitectureDiagram.tsx. Coordinates are in viewBox units.

export type DiagramNodeKind = 'input' | 'core' | 'output' | 'store' | 'external'
export type Side = 'top' | 'bottom' | 'left' | 'right'

export interface DiagramNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  title: string
  lines?: string[]
  kind: DiagramNodeKind
  /** Render the title in a monospace font (used for table names) */
  mono?: boolean
}

export interface DiagramEdge {
  from: string
  to: string
  fromSide: Side
  toSide: Side
  /** Position along the side, 0 to 1 (default 0.5) */
  fromAt?: number
  toAt?: number
  label?: string
  dashed?: boolean
}

export interface Diagram {
  title: string
  description: string
  width: number
  height: number
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  legend?: { kind: DiagramNodeKind; label: string }[]
}

// ERD helpers: 5 columns x 3 rows grid
const col = (i: number) => 20 + i * 180
const row = (i: number) => 20 + i * 120
const entity = (id: string, c: number, r: number, kind: DiagramNodeKind = 'store'): DiagramNode => ({
  id,
  x: col(c),
  y: row(r),
  w: 130,
  h: 44,
  title: id,
  kind,
  mono: true,
})

const threeTier = (
  a: Omit<DiagramNode, 'x' | 'y' | 'w' | 'h'>,
  b: Omit<DiagramNode, 'x' | 'y' | 'w' | 'h'>,
  c: Omit<DiagramNode, 'x' | 'y' | 'w' | 'h'>,
  labels: [string, string]
): Pick<Diagram, 'width' | 'height' | 'nodes' | 'edges'> => ({
  width: 780,
  height: 130,
  nodes: [
    { ...a, x: 20, y: 20, w: 210, h: 90 },
    { ...b, x: 285, y: 20, w: 210, h: 90 },
    { ...c, x: 550, y: 20, w: 210, h: 90 },
  ],
  edges: [
    { from: a.id, to: b.id, fromSide: 'right', toSide: 'left', label: labels[0] },
    { from: b.id, to: c.id, fromSide: 'right', toSide: 'left', label: labels[1] },
  ],
})

export const architectureDiagrams: Record<string, Diagram[]> = {
  motu: [
    {
      title: 'MOTU system block diagram',
      description:
        'Map data and user input feed the graph and cost function. The search engine runs UCS, Greedy, A* or BFS using the heuristic for the chosen cost mode, and returns the path display and the metrics.',
      width: 780,
      height: 430,
      nodes: [
        { id: 'map', x: 40, y: 20, w: 300, h: 64, title: 'MOTU map data', lines: ['UA, UB, Library, Shaw'], kind: 'input' },
        { id: 'user', x: 440, y: 20, w: 300, h: 64, title: 'User input', lines: ['Start, goal, map, algorithm, mode'], kind: 'input' },
        { id: 'graph', x: 240, y: 124, w: 300, h: 64, title: 'Graph + cost function', lines: ['Weather, blocked hallways, indoor'], kind: 'core' },
        { id: 'search', x: 240, y: 228, w: 300, h: 64, title: 'Search engine', lines: ['UCS, Greedy, A*, BFS'], kind: 'core' },
        { id: 'heur', x: 585, y: 228, w: 175, h: 64, title: 'Heuristic h(n)', lines: ['One per cost mode'], kind: 'core' },
        { id: 'path', x: 60, y: 332, w: 280, h: 64, title: 'Path display', lines: ['Route + total cost'], kind: 'output' },
        { id: 'metrics', x: 440, y: 332, w: 280, h: 64, title: 'Metrics', lines: ['Cost, nodes, time, found'], kind: 'output' },
      ],
      edges: [
        { from: 'map', to: 'graph', fromSide: 'bottom', toSide: 'top', toAt: 0.25 },
        { from: 'user', to: 'graph', fromSide: 'bottom', toSide: 'top', toAt: 0.75 },
        { from: 'graph', to: 'search', fromSide: 'bottom', toSide: 'top' },
        { from: 'heur', to: 'search', fromSide: 'left', toSide: 'right' },
        { from: 'search', to: 'path', fromSide: 'bottom', toSide: 'top', fromAt: 0.25 },
        { from: 'search', to: 'metrics', fromSide: 'bottom', toSide: 'top', fromAt: 0.75 },
      ],
      legend: [
        { kind: 'input', label: 'Inputs' },
        { kind: 'core', label: 'AI core' },
        { kind: 'output', label: 'Outputs' },
      ],
    },
  ],
  nuclearops: [
    {
      title: 'NuclearOps system architecture',
      description:
        'The browser calls the Flask app over HTTP with JSON. Flask handles page routes, the REST API, authentication with role checks and validation, and queries PostgreSQL. Flask also calls the Open-Meteo API for weather and uses an export module for CSV and PDF.',
      width: 780,
      height: 400,
      nodes: [
        { id: 'browser', x: 255, y: 20, w: 270, h: 76, title: 'Browser', lines: ['HTML, CSS, JavaScript pages', 'Fetch API + Chart.js'], kind: 'input' },
        { id: 'flask', x: 205, y: 146, w: 370, h: 104, title: 'Flask app', lines: ['Page routes + REST API (21 endpoints)', 'Session auth + RBAC: admin, user, guest', 'Server-side validation'], kind: 'core' },
        { id: 'db', x: 255, y: 300, w: 270, h: 80, title: 'PostgreSQL', lines: ['12 tables + 10 views', 'psycopg2, parameterized SQL'], kind: 'store' },
        { id: 'meteo', x: 620, y: 161, w: 145, h: 74, title: 'Open-Meteo API', lines: ['Outage weather'], kind: 'external' },
        { id: 'export', x: 15, y: 161, w: 145, h: 74, title: 'Export module', lines: ['CSV (pandas)', 'PDF (fpdf2)'], kind: 'output' },
      ],
      edges: [
        { from: 'browser', to: 'flask', fromSide: 'bottom', toSide: 'top', label: 'JSON over HTTP' },
        { from: 'flask', to: 'db', fromSide: 'bottom', toSide: 'top', label: 'SQL' },
        { from: 'flask', to: 'meteo', fromSide: 'right', toSide: 'left', label: 'HTTPS' },
        { from: 'flask', to: 'export', fromSide: 'left', toSide: 'right' },
      ],
      legend: [
        { kind: 'input', label: 'Client' },
        { kind: 'core', label: 'Server' },
        { kind: 'store', label: 'Database' },
        { kind: 'external', label: 'External API' },
        { kind: 'output', label: 'Export' },
      ],
    },
    {
      title: 'Key table relationships',
      description:
        'STATION has many REACTOR_UNITs, each with many PLANT_SYSTEMs, each with many pieces of EQUIPMENT. EQUIPMENT has many WORK_ORDERs and INSPECTIONs. Each REACTOR_UNIT has OUTAGEs, which group WORK_ORDERs and WEATHER_LOG readings. WORKERs are assigned WORK_ORDERs, USER_ACCOUNTs link to WORKERs, and WORK_ORDER_PART links WORK_ORDERs to SPARE_PARTs.',
      width: 890,
      height: 324,
      nodes: [
        entity('STATION', 0, 0),
        entity('REACTOR_UNIT', 1, 0),
        entity('PLANT_SYSTEM', 2, 0),
        entity('EQUIPMENT', 3, 0),
        entity('INSPECTION', 4, 0),
        entity('OUTAGE', 1, 1),
        entity('WORK_ORDER', 3, 1, 'core'),
        entity('WORK_ORDER_PART', 4, 1),
        entity('WEATHER_LOG', 1, 2),
        entity('WORKER', 2, 2),
        entity('USER_ACCOUNT', 3, 2),
        entity('SPARE_PART', 4, 2),
      ],
      edges: [
        { from: 'STATION', to: 'REACTOR_UNIT', fromSide: 'right', toSide: 'left', label: '1:N' },
        { from: 'REACTOR_UNIT', to: 'PLANT_SYSTEM', fromSide: 'right', toSide: 'left', label: '1:N' },
        { from: 'PLANT_SYSTEM', to: 'EQUIPMENT', fromSide: 'right', toSide: 'left', label: '1:N' },
        { from: 'EQUIPMENT', to: 'INSPECTION', fromSide: 'right', toSide: 'left', label: '1:N' },
        { from: 'EQUIPMENT', to: 'WORK_ORDER', fromSide: 'bottom', toSide: 'top', label: '1:N' },
        { from: 'REACTOR_UNIT', to: 'OUTAGE', fromSide: 'bottom', toSide: 'top', label: '1:N' },
        { from: 'OUTAGE', to: 'WORK_ORDER', fromSide: 'right', toSide: 'left', fromAt: 0.3, toAt: 0.3, label: '1:N' },
        { from: 'OUTAGE', to: 'WEATHER_LOG', fromSide: 'bottom', toSide: 'top', label: '1:N' },
        { from: 'WORKER', to: 'WORK_ORDER', fromSide: 'top', toSide: 'left', fromAt: 0.85, toAt: 0.75 },
        { from: 'USER_ACCOUNT', to: 'WORKER', fromSide: 'left', toSide: 'right', label: '1:1' },
        { from: 'WORK_ORDER', to: 'WORK_ORDER_PART', fromSide: 'right', toSide: 'left', label: '1:N' },
        { from: 'SPARE_PART', to: 'WORK_ORDER_PART', fromSide: 'top', toSide: 'bottom', label: '1:N' },
      ],
    },
  ],
  'coop-tracker': [
    {
      title: 'Co-op Tracker architecture',
      description:
        'The browser extension and the React app call one Node.js and Express API. A scheduled job reads Gmail with read-only OAuth and moves applications forward. Everything is stored in PostgreSQL, and the Claude API is an optional reader.',
      width: 780,
      height: 330,
      nodes: [
        { id: 'ext', x: 20, y: 20, w: 210, h: 80, title: 'Browser extension', lines: ['Firefox and Chrome', 'Captures postings'], kind: 'input' },
        { id: 'web', x: 20, y: 125, w: 210, h: 80, title: 'React app', lines: ['Dashboard, insights', 'Calendar, Ctrl+K'], kind: 'input' },
        { id: 'gmail', x: 20, y: 230, w: 210, h: 80, title: 'Gmail API', lines: ['OAuth 2.0, read-only'], kind: 'external' },
        { id: 'api', x: 285, y: 85, w: 210, h: 160, title: 'Node.js + Express', lines: ['21 REST endpoints', 'Email reader', 'Gmail sync every 15 min', 'CSV import and export'], kind: 'core' },
        { id: 'pg', x: 550, y: 40, w: 210, h: 100, title: 'PostgreSQL', lines: ['applications', 'email_events, settings'], kind: 'store' },
        { id: 'claude', x: 550, y: 200, w: 210, h: 80, title: 'Claude API', lines: ['Optional AI reader'], kind: 'external' },
      ],
      edges: [
        { from: 'ext', to: 'api', fromSide: 'right', toSide: 'left', toAt: 0.2, label: 'posting' },
        { from: 'web', to: 'api', fromSide: 'right', toSide: 'left', toAt: 0.5, label: 'JSON' },
        { from: 'gmail', to: 'api', fromSide: 'right', toSide: 'left', toAt: 0.8, label: 'replies' },
        { from: 'api', to: 'pg', fromSide: 'right', toSide: 'left', fromAt: 0.25, label: 'SQL' },
        { from: 'api', to: 'claude', fromSide: 'right', toSide: 'left', fromAt: 0.8, dashed: true },
      ],
    },
  ],
  'finance-tracker': [
    {
      title: 'Finance Tracker architecture',
      description:
        'The JavaScript app on Vercel uses Supabase for authentication and a PostgreSQL database protected by Row Level Security. Pull requests run the Jest suite in GitHub Actions before merging and deploying.',
      width: 780,
      height: 260,
      nodes: [
        { id: 'app', x: 20, y: 20, w: 210, h: 90, title: 'Web app', lines: ['JavaScript + Chart.js', 'Hosted on Vercel'], kind: 'input' },
        { id: 'auth', x: 285, y: 20, w: 210, h: 90, title: 'Supabase Auth', lines: ['Sign in, sessions'], kind: 'core' },
        { id: 'pg', x: 550, y: 20, w: 210, h: 90, title: 'PostgreSQL', lines: ['Row Level Security', 'Users see only their rows'], kind: 'store' },
        { id: 'pr', x: 20, y: 160, w: 210, h: 80, title: 'Pull request', lines: ['GitHub'], kind: 'external' },
        { id: 'ci', x: 285, y: 160, w: 210, h: 80, title: 'GitHub Actions', lines: ['25+ Jest tests, 90% coverage'], kind: 'core' },
        { id: 'deploy', x: 550, y: 160, w: 210, h: 80, title: 'Vercel deploy', lines: ['On merge to main'], kind: 'output' },
      ],
      edges: [
        { from: 'app', to: 'auth', fromSide: 'right', toSide: 'left', label: 'JWT' },
        { from: 'auth', to: 'pg', fromSide: 'right', toSide: 'left', label: 'RLS' },
        { from: 'pr', to: 'ci', fromSide: 'right', toSide: 'left', label: 'on push' },
        { from: 'ci', to: 'deploy', fromSide: 'right', toSide: 'left', label: 'tests pass' },
      ],
    },
  ],
  taskly: [
    {
      title: 'Taskly architecture',
      description: 'The browser loads views with AJAX from a PHP backend that handles sessions, bcrypt authentication and CRUD, backed by MySQL.',
      ...threeTier(
        { id: 'browser', title: 'Browser', lines: ['HTML, CSS, JavaScript', 'AJAX view switching'], kind: 'input' },
        { id: 'php', title: 'PHP backend', lines: ['Sessions + bcrypt', 'CRUD endpoints'], kind: 'core' },
        { id: 'mysql', title: 'MySQL', lines: ['Tasks scoped per user'], kind: 'store' },
        ['AJAX', 'SQL']
      ),
    },
  ],
}
