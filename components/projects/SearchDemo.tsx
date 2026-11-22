'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Play, RotateCcw } from 'lucide-react'

// A tiny, self-contained search demo. It really runs A* and UCS on the grid below, so the
// nodes-expanded counts are computed live, not hardcoded.

const W = 25
const H = 13
const START = 6 * W + 1
const GOAL = 6 * W + 23
const CROWDED_COST = 4

type Algo = 'astar' | 'ucs'
interface RunResult {
  order: number[]
  path: number[]
  cost: number
}

const LABEL: Record<Algo, string> = { astar: 'A*', ucs: 'UCS' }

function buildGrid() {
  const walls = new Set<number>()
  const crowded = new Set<number>()
  const wall = (x: number, y: number) => walls.add(y * W + x)
  for (let y = 0; y <= 9; y++) wall(6, y)
  for (let y = 3; y <= 12; y++) wall(12, y)
  for (let y = 0; y <= 8; y++) wall(18, y)
  for (let y = 11; y <= 12; y++) wall(18, y)
  for (let x = 13; x <= 17; x++) for (let y = 0; y <= 2; y++) crowded.add(y * W + x)
  for (let x = 7; x <= 11; x++) for (let y = 10; y <= 12; y++) crowded.add(y * W + x)
  return { walls, crowded }
}

const manhattan = (a: number, b: number) =>
  Math.abs((a % W) - (b % W)) + Math.abs(Math.floor(a / W) - Math.floor(b / W))

/** Best-first search. weight 1 = A* (f = g + h), weight 0 = UCS (f = g). */
function search(algo: Algo, walls: Set<number>, crowded: Set<number>): RunResult {
  const hw = algo === 'astar' ? 1 : 0
  const g = new Map<number, number>([[START, 0]])
  const parent = new Map<number, number>()
  const closed = new Set<number>()
  const order: number[] = []
  // Min-heap of [f, h, seq, node]; ties prefer smaller h, then first inserted.
  const heap: [number, number, number, number][] = []
  let seq = 0
  const less = (a: (typeof heap)[0], b: (typeof heap)[0]) =>
    a[0] !== b[0] ? a[0] < b[0] : a[1] !== b[1] ? a[1] < b[1] : a[2] < b[2]
  const push = (item: (typeof heap)[0]) => {
    heap.push(item)
    let i = heap.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (!less(heap[i], heap[p])) break
      ;[heap[i], heap[p]] = [heap[p], heap[i]]
      i = p
    }
  }
  const pop = () => {
    const top = heap[0]
    const last = heap.pop()!
    if (heap.length) {
      heap[0] = last
      let i = 0
      for (;;) {
        const l = 2 * i + 1
        const r = l + 1
        let m = i
        if (l < heap.length && less(heap[l], heap[m])) m = l
        if (r < heap.length && less(heap[r], heap[m])) m = r
        if (m === i) break
        ;[heap[i], heap[m]] = [heap[m], heap[i]]
        i = m
      }
    }
    return top
  }

  const h0 = hw * manhattan(START, GOAL)
  push([h0, h0, seq++, START])
  while (heap.length) {
    const [, , , node] = pop()
    if (closed.has(node)) continue
    closed.add(node)
    order.push(node)
    if (node === GOAL) break
    const x = node % W
    const y = Math.floor(node / W)
    const neighbours = [
      x > 0 ? node - 1 : -1,
      x < W - 1 ? node + 1 : -1,
      y > 0 ? node - W : -1,
      y < H - 1 ? node + W : -1,
    ]
    for (const n of neighbours) {
      if (n < 0 || walls.has(n) || closed.has(n)) continue
      const ng = g.get(node)! + (crowded.has(n) ? CROWDED_COST : 1)
      if (ng < (g.get(n) ?? Infinity)) {
        g.set(n, ng)
        parent.set(n, node)
        const h = hw * manhattan(n, GOAL)
        push([ng + h, h, seq++, n])
      }
    }
  }

  const path: number[] = []
  for (let n: number | undefined = GOAL; n !== undefined; n = parent.get(n)) path.unshift(n)
  return { order, path, cost: g.get(GOAL) ?? Infinity }
}

export default function SearchDemo() {
  const { walls, crowded } = useMemo(buildGrid, [])
  const results = useMemo(
    () => ({ astar: search('astar', walls, crowded), ucs: search('ucs', walls, crowded) }),
    [walls, crowded]
  )
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState<Algo | null>(null)
  const [step, setStep] = useState(0)
  const [finished, setFinished] = useState<Partial<Record<Algo, true>>>({})
  const frame = useRef<number>()

  const run = (algo: Algo) => {
    if (frame.current) cancelAnimationFrame(frame.current)
    const total = results[algo].order.length
    setActive(algo)
    if (reduceMotion) {
      setStep(total)
      setFinished((f) => ({ ...f, [algo]: true }))
      return
    }
    setStep(0)
    const perFrame = Math.max(1, Math.ceil(total / 70))
    let s = 0
    const tick = () => {
      s = Math.min(total, s + perFrame)
      setStep(s)
      if (s < total) frame.current = requestAnimationFrame(tick)
      else setFinished((f) => ({ ...f, [algo]: true }))
    }
    frame.current = requestAnimationFrame(tick)
  }

  const reset = () => {
    if (frame.current) cancelAnimationFrame(frame.current)
    setActive(null)
    setStep(0)
    setFinished({})
  }

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current)
  }, [])

  const current = active ? results[active] : null
  const done = current ? step >= current.order.length : false
  const explored = useMemo(() => new Set(current ? current.order.slice(0, step) : []), [current, step])
  const onPath = useMemo(() => new Set(done && current ? current.path : []), [done, current])

  const cellClass = (i: number) => {
    if (i === START) return 'bg-emerald-500'
    if (i === GOAL) return 'bg-fuchsia-500'
    if (walls.has(i)) return 'bg-zinc-700 dark:bg-zinc-500'
    if (onPath.has(i)) return 'bg-sky-500'
    if (explored.has(i)) return crowded.has(i) ? 'bg-sky-300 dark:bg-sky-700' : 'bg-sky-200 dark:bg-sky-900'
    if (crowded.has(i)) return 'bg-amber-100 dark:bg-amber-900/50'
    return 'bg-zinc-50 dark:bg-zinc-800/60'
  }

  const btn =
    'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50'

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <button
          onClick={() => run('astar')}
          className={`${btn} bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200`}
        >
          <Play className="w-4 h-4" aria-hidden="true" /> Run A*
        </button>
        <button
          onClick={() => run('ucs')}
          className={`${btn} border border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800`}
        >
          <Play className="w-4 h-4" aria-hidden="true" /> Run UCS
        </button>
        <button
          onClick={reset}
          disabled={!active}
          className={`${btn} text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white`}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" /> Reset
        </button>
      </div>

      <div
        aria-hidden="true"
        className="grid gap-[2px] rounded-lg overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${W}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: W * H }, (_, i) => (
          <div key={i} className={`aspect-square rounded-[2px] ${cellClass(i)}`} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-600 dark:text-zinc-400">
        {[
          ['bg-emerald-500', 'Start'],
          ['bg-fuchsia-500', 'Goal'],
          ['bg-zinc-700 dark:bg-zinc-500', 'Wall'],
          ['bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700', `Crowded hallway (cost ${CROWDED_COST})`],
          ['bg-sky-200 dark:bg-sky-900', 'Expanded'],
          ['bg-sky-500', 'Route'],
        ].map(([c, l]) => (
          <span key={l} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={`w-3 h-3 rounded-sm ${c}`} />
            {l}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3" aria-live="polite">
        {(['astar', 'ucs'] as Algo[]).map((algo) => {
          const r = results[algo]
          const show = finished[algo]
          return (
            <div
              key={algo}
              className={`rounded-xl px-4 py-3 border ${
                active === algo
                  ? 'border-primary-400 bg-primary-50/60 dark:border-primary-600 dark:bg-primary-950/40'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">{LABEL[algo]}</p>
              {show ? (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="text-lg font-semibold text-primary-700 dark:text-primary-300">{r.order.length}</span>{' '}
                  nodes expanded, route cost {r.cost}
                </p>
              ) : (
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Not run yet</p>
              )}
            </div>
          )
        })}
      </div>
      {finished.astar && finished.ucs && (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Both find a route with the same cost, which is the correctness check MOTU runs on every trial. A* gets
          there after expanding{' '}
          <strong className="font-semibold text-primary-700 dark:text-primary-300">
            {Math.round((1 - results.astar.order.length / results.ucs.order.length) * 100)}% fewer nodes
          </strong>{' '}
          on this grid.
        </p>
      )}
    </div>
  )
}
