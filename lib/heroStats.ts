import { experiences } from './experienceData'
import { projects } from './projectsData'

// The hero proof stats. The text lives in the `heroStat` field of each experience or project,
// so every number is written once. This list only picks which ones show, and in what order.
const HERO_STAT_SOURCES = ['coop-tracker', 'nuclearops', 'motu']

const sources = [...experiences, ...projects]

export const heroStats: string[] = HERO_STAT_SOURCES.map(
  (id) => sources.find((s) => s.id === id)?.heroStat
).filter((s): s is string => Boolean(s))
