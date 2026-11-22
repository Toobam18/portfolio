import type { Diagram, DiagramEdge, DiagramNode, DiagramNodeKind, Side } from '@/lib/architectureDiagrams'

const kindStyles: Record<DiagramNodeKind, { box: string; swatch: string }> = {
  input: {
    box: 'fill-violet-50 stroke-violet-300 dark:fill-violet-950/60 dark:stroke-violet-700',
    swatch: 'bg-violet-100 border-violet-300 dark:bg-violet-950 dark:border-violet-700',
  },
  core: {
    box: 'fill-sky-50 stroke-sky-400 dark:fill-sky-950/60 dark:stroke-sky-600',
    swatch: 'bg-sky-100 border-sky-400 dark:bg-sky-950 dark:border-sky-600',
  },
  store: {
    box: 'fill-emerald-50 stroke-emerald-400 dark:fill-emerald-950/60 dark:stroke-emerald-700',
    swatch: 'bg-emerald-100 border-emerald-400 dark:bg-emerald-950 dark:border-emerald-700',
  },
  output: {
    box: 'fill-amber-50 stroke-amber-400 dark:fill-amber-950/50 dark:stroke-amber-700',
    swatch: 'bg-amber-100 border-amber-400 dark:bg-amber-950 dark:border-amber-700',
  },
  external: {
    box: 'fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-500',
    swatch: 'bg-white border-zinc-400 border-dashed dark:bg-zinc-900 dark:border-zinc-500',
  },
}

type Point = [number, number]

function anchor(n: DiagramNode, side: Side, at = 0.5): Point {
  switch (side) {
    case 'top':
      return [n.x + n.w * at, n.y]
    case 'bottom':
      return [n.x + n.w * at, n.y + n.h]
    case 'left':
      return [n.x, n.y + n.h * at]
    case 'right':
      return [n.x + n.w, n.y + n.h * at]
  }
}

const isVertical = (s: Side) => s === 'top' || s === 'bottom'

/** Orthogonal route between two anchors */
function route(e: DiagramEdge, a: Point, b: Point): Point[] {
  const [ax, ay] = a
  const [bx, by] = b
  if (isVertical(e.fromSide) && isVertical(e.toSide)) {
    if (ax === bx) return [a, b]
    const my = (ay + by) / 2
    return [a, [ax, my], [bx, my], b]
  }
  if (!isVertical(e.fromSide) && !isVertical(e.toSide)) {
    if (ay === by) return [a, b]
    const mx = (ax + bx) / 2
    return [a, [mx, ay], [mx, by], b]
  }
  // Mixed: leave along the first axis, then turn
  return isVertical(e.fromSide) ? [a, [ax, by], b] : [a, [bx, ay], b]
}

function longestSegmentMid(points: Point[]): Point {
  let best: Point = points[0]
  let bestLen = -1
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[i + 1]
    const len = Math.abs(x2 - x1) + Math.abs(y2 - y1)
    if (len > bestLen) {
      bestLen = len
      best = [(x1 + x2) / 2, (y1 + y2) / 2]
    }
  }
  return best
}

function NodeBox({ node }: { node: DiagramNode }) {
  const lines = node.lines ?? []
  const cx = node.x + node.w / 2
  const blockHeight = 16 + lines.length * 17
  const titleY = node.y + (node.h - blockHeight) / 2 + 13
  return (
    <g>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={10}
        strokeWidth={1.25}
        strokeDasharray={node.kind === 'external' ? '5 4' : undefined}
        className={kindStyles[node.kind].box}
      />
      <text
        x={cx}
        y={titleY}
        textAnchor="middle"
        className={`fill-zinc-900 dark:fill-zinc-100 font-semibold ${node.mono ? 'font-mono' : ''}`}
        style={{ fontSize: node.mono ? 11.5 : 14 }}
      >
        {node.title}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x={cx}
          y={titleY + 19 + i * 17}
          textAnchor="middle"
          className="fill-zinc-600 dark:fill-zinc-400"
          style={{ fontSize: 12 }}
        >
          {line}
        </text>
      ))}
    </g>
  )
}

export default function ArchitectureDiagram({ diagram, id }: { diagram: Diagram; id: string }) {
  const byId = new Map(diagram.nodes.map((n) => [n.id, n]))
  const markerId = `arrow-${id}`
  const titleId = `${id}-title`
  const descId = `${id}-desc`

  return (
    <figure className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          className="block w-full h-auto min-w-[640px] p-4 sm:p-6"
        >
          <title id={titleId}>{diagram.title}</title>
          <desc id={descId}>{diagram.description}</desc>
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" className="fill-zinc-400 dark:fill-zinc-500" />
            </marker>
          </defs>

          {diagram.edges.map((e, i) => {
            const from = byId.get(e.from)
            const to = byId.get(e.to)
            if (!from || !to) return null
            const pts = route(e, anchor(from, e.fromSide, e.fromAt), anchor(to, e.toSide, e.toAt))
            const d = pts.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
            const [lx, ly] = longestSegmentMid(pts)
            const labelW = e.label ? e.label.length * 6.4 + 12 : 0
            return (
              <g key={i}>
                <path
                  d={d}
                  fill="none"
                  strokeWidth={1.5}
                  strokeDasharray={e.dashed ? '5 4' : undefined}
                  markerEnd={`url(#${markerId})`}
                  className="stroke-zinc-400 dark:stroke-zinc-500"
                />
                {e.label && (
                  <g>
                    <rect
                      x={lx - labelW / 2}
                      y={ly - 9}
                      width={labelW}
                      height={18}
                      rx={9}
                      className="fill-white stroke-zinc-200 dark:fill-zinc-900 dark:stroke-zinc-700"
                    />
                    <text
                      x={lx}
                      y={ly + 4}
                      textAnchor="middle"
                      className="fill-zinc-600 dark:fill-zinc-300 font-mono"
                      style={{ fontSize: 10.5 }}
                    >
                      {e.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {diagram.nodes.map((n) => (
            <NodeBox key={n.id} node={n} />
          ))}
        </svg>
      </div>
      {diagram.legend && (
        <figcaption className="flex flex-wrap gap-x-5 gap-y-2 px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
          {diagram.legend.map((l) => (
            <span key={l.kind} className="inline-flex items-center gap-2">
              <span aria-hidden="true" className={`w-3 h-3 rounded-sm border ${kindStyles[l.kind].swatch}`} />
              {l.label}
            </span>
          ))}
        </figcaption>
      )}
    </figure>
  )
}
