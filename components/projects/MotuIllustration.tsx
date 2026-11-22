// Original illustration of the MOTU campus graph: four buildings drawn as stacked floor plates,
// rooms and junctions as nodes, and the A* route highlighted from a room in UA to a room on
// Shaw's second floor (via an elevator). Purely decorative geometry, no real map data.

type P = [number, number]

const FLOOR_OFFSET: P = [16, -16]
const up = ([x, y]: P): P => [x + FLOOR_OFFSET[0], y + FLOOR_OFFSET[1]]

const buildings = [
  { name: 'UA', x: 40, y: 78, w: 175, h: 112 },
  { name: 'UB', x: 40, y: 246, w: 175, h: 112 },
  { name: 'LIBRARY', x: 268, y: 160, w: 132, h: 112 },
  { name: 'SHAW', x: 452, y: 96, w: 150, h: 250 },
]

// Ground floor nodes
const N: Record<string, P> = {
  a1: [72, 120], a2: [132, 110], a3: [188, 150], a4: [108, 168],
  b1: [80, 286], b2: [152, 276], b3: [190, 326], b4: [104, 332],
  l1: [298, 192], l2: [372, 202], l3: [334, 248],
  s1: [484, 136], s2: [572, 128], s3: [528, 212], s4: [484, 292], s5: [574, 306],
}
// Upper floor nodes
const U: Record<string, P> = {
  a2: up(N.a2), a3: up(N.a3),
  s3: up(N.s3), g: [586, 158], s1: up(N.s1),
}

const groundEdges: [string, string, ('outdoor' | 'blocked')?][] = [
  ['a1', 'a2'], ['a2', 'a3'], ['a1', 'a4'], ['a4', 'a3'],
  ['b1', 'b2'], ['b2', 'b3'], ['b1', 'b4'], ['b4', 'b3'],
  ['a4', 'b1'],
  ['a3', 'l1', 'outdoor'], ['b3', 'l3', 'outdoor'],
  ['l1', 'l2'], ['l2', 'l3'], ['l1', 'l3', 'blocked'],
  ['l2', 's3'],
  ['s1', 's2'], ['s1', 's3'], ['s2', 's3'], ['s3', 's4'], ['s4', 's5'], ['s3', 's5'],
]

const routePts: P[] = [N.a1, N.a2, N.a3, N.l1, N.l2, N.s3, U.s3, U.g]

const pts = (p: P[]) => p.map((q) => q.join(',')).join(' ')

export default function MotuIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 400" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="motu-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#22324f" />
        </pattern>
        <filter id="motu-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <rect width="640" height="400" fill="#0f1a30" />
      <rect width="640" height="400" fill="url(#motu-dots)" />

      {/* Upper floor plates (behind) */}
      {buildings.map((b) => (
        <rect
          key={`${b.name}-f2`}
          x={b.x + FLOOR_OFFSET[0]}
          y={b.y + FLOOR_OFFSET[1]}
          width={b.w}
          height={b.h}
          rx={10}
          fill="#16233f"
          stroke="#2a3c61"
          strokeWidth={1}
        />
      ))}
      {/* Upper floor edges and nodes */}
      <g stroke="#30466f" strokeWidth={1.25}>
        <line x1={U.a2[0]} y1={U.a2[1]} x2={U.a3[0]} y2={U.a3[1]} />
        <line x1={U.s1[0]} y1={U.s1[1]} x2={U.s3[0]} y2={U.s3[1]} />
      </g>
      {Object.values(U).map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="#30466f" />
      ))}

      {/* Ground floor plates */}
      {buildings.map((b) => (
        <g key={b.name}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill="#1a2a4a" stroke="#355081" strokeWidth={1.25} />
          <text
            x={b.x + 12}
            y={b.y + b.h - 12}
            fill="#8ea3c7"
            style={{ fontSize: 11, letterSpacing: '0.14em', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
          >
            {b.name}
          </text>
        </g>
      ))}

      {/* Elevator shafts (vertical links between floors) */}
      <g stroke="#4d6694" strokeWidth={1.25} strokeDasharray="3 3">
        <line x1={N.a2[0]} y1={N.a2[1]} x2={U.a2[0]} y2={U.a2[1]} />
        <line x1={N.s1[0]} y1={N.s1[1]} x2={U.s1[0]} y2={U.s1[1]} />
      </g>

      {/* Ground floor edges */}
      {groundEdges.map(([a, b, kind], i) => (
        <line
          key={i}
          x1={N[a][0]}
          y1={N[a][1]}
          x2={N[b][0]}
          y2={N[b][1]}
          stroke={kind === 'blocked' ? '#f87171' : '#46618f'}
          strokeWidth={1.5}
          strokeDasharray={kind === 'outdoor' ? '6 5' : kind === 'blocked' ? '2 4' : undefined}
        />
      ))}
      {/* Blocked hallway marker */}
      {(() => {
        const [x, y] = [(N.l1[0] + N.l3[0]) / 2, (N.l1[1] + N.l3[1]) / 2]
        return (
          <g stroke="#f87171" strokeWidth={2} strokeLinecap="round">
            <line x1={x - 5} y1={y - 5} x2={x + 5} y2={y + 5} />
            <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y - 5} />
          </g>
        )
      })()}

      {/* Highlighted route */}
      <polyline points={pts(routePts)} fill="none" stroke="#38bdf8" strokeWidth={7} opacity={0.45} filter="url(#motu-glow)" />
      <polyline points={pts(routePts)} fill="none" stroke="#7dd3fc" strokeWidth={2.75} strokeLinejoin="round" strokeLinecap="round" />

      {/* Ground nodes */}
      {Object.entries(N).map(([k, p]) => {
        const onRoute = routePts.some((r) => r === p)
        return <circle key={k} cx={p[0]} cy={p[1]} r={onRoute ? 5 : 4} fill={onRoute ? '#e0f2fe' : '#5b78aa'} />
      })}
      <circle cx={U.s3[0]} cy={U.s3[1]} r={5} fill="#e0f2fe" />

      {/* Start and goal */}
      <circle cx={N.a1[0]} cy={N.a1[1]} r={10} fill="none" stroke="#34d399" strokeWidth={2.5} />
      <circle cx={N.a1[0]} cy={N.a1[1]} r={5} fill="#34d399" />
      <circle cx={U.g[0]} cy={U.g[1]} r={10} fill="none" stroke="#e879f9" strokeWidth={2.5} />
      <circle cx={U.g[0]} cy={U.g[1]} r={5} fill="#e879f9" />

      {/* Formula chip */}
      <g transform="translate(268 312)">
        <rect width="150" height="30" rx="15" fill="#0b1222" stroke="#2a3c61" />
        <text
          x="75"
          y="19.5"
          textAnchor="middle"
          fill="#bae6fd"
          style={{ fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
        >
          f(n) = g(n) + h(n)
        </text>
      </g>
    </svg>
  )
}
