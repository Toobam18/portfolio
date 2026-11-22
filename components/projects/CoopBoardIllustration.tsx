// TODO: replace with real screenshot. This is a designed placeholder for the Co-op Application
// Tracker until the app's UI is final: an abstract kanban/status board with skeleton cards.

const columns = [
  { name: 'APPLIED', dot: '#38bdf8', cards: [3, 2, 3, 2] },
  { name: 'INTERVIEW', dot: '#a78bfa', cards: [3, 2, 2] },
  { name: 'OFFER', dot: '#34d399', cards: [3] },
]

export default function CoopBoardIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 400" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <rect width="640" height="400" className="fill-slate-100 dark:fill-slate-900" />

      {/* App window */}
      <rect x="36" y="28" width="568" height="344" rx="14" className="fill-white stroke-slate-200 dark:fill-slate-800 dark:stroke-slate-700" />
      {/* Top bar */}
      <circle cx="60" cy="52" r="5" className="fill-slate-200 dark:fill-slate-600" />
      <circle cx="76" cy="52" r="5" className="fill-slate-200 dark:fill-slate-600" />
      <circle cx="92" cy="52" r="5" className="fill-slate-200 dark:fill-slate-600" />
      <rect x="380" y="42" width="200" height="20" rx="10" className="fill-slate-100 dark:fill-slate-700" />
      <rect x="392" y="49" width="80" height="6" rx="3" className="fill-slate-300 dark:fill-slate-500" />
      <line x1="36" y1="76" x2="604" y2="76" className="stroke-slate-200 dark:stroke-slate-700" />

      {columns.map((col, ci) => {
        const x = 56 + ci * 182
        return (
          <g key={col.name}>
            <rect x={x} y="92" width="166" height="262" rx="10" className="fill-slate-50 dark:fill-slate-900/60" />
            <circle cx={x + 16} cy="111" r="4" fill={col.dot} />
            <text
              x={x + 28}
              y="115"
              className="fill-slate-500 dark:fill-slate-400"
              style={{ fontSize: 10.5, letterSpacing: '0.12em', fontWeight: 600, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}
            >
              {col.name}
            </text>
            <rect x={x + 136} y="104" width="20" height="14" rx="7" className="fill-slate-200 dark:fill-slate-700" />
            {col.cards.map((lines, i) => {
              const y = 130 + i * 56
              return (
                <g key={i}>
                  <rect x={x + 10} y={y} width="146" height="46" rx="8" className="fill-white stroke-slate-200 dark:fill-slate-800 dark:stroke-slate-700" />
                  <rect x={x + 20} y={y + 11} width={lines === 3 ? 78 : 62} height="7" rx="3.5" className="fill-slate-300 dark:fill-slate-500" />
                  <rect x={x + 20} y={y + 26} width={lines === 3 ? 52 : 70} height="6" rx="3" className="fill-slate-200 dark:fill-slate-600" />
                  <rect x={x + 116} y={y + 10} width="30" height="12" rx="6" fill={col.dot} opacity="0.25" />
                </g>
              )
            })}
          </g>
        )
      })}

      {/* A card being dragged between columns */}
      <g transform="rotate(-4 300 300)">
        <rect x="236" y="276" width="146" height="46" rx="8" className="fill-white stroke-sky-300 dark:fill-slate-700 dark:stroke-sky-500" strokeWidth="1.5" />
        <rect x="246" y="287" width="80" height="7" rx="3.5" className="fill-slate-300 dark:fill-slate-500" />
        <rect x="246" y="302" width="54" height="6" rx="3" className="fill-slate-200 dark:fill-slate-600" />
        <rect x="342" y="286" width="30" height="12" rx="6" fill="#a78bfa" opacity="0.35" />
      </g>
    </svg>
  )
}
