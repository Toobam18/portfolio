'use client'

import { useState } from 'react'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts'
import { skillChartData } from '@/lib/skillsData'

type ChartType = 'radar' | 'bar'

export default function SkillsChart() {
  const [chartType, setChartType] = useState<ChartType>('radar')

  const colors = [
    '#0ea5e9',
    '#d946ef',
    '#10b981',
    '#f59e0b',
    '#6366f1',
    '#ec4899',
  ]

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
      {/* Chart Type Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setChartType('radar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            chartType === 'radar'
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Radar
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            chartType === 'bar'
              ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          Bar
        </button>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'radar' ? (
            <RadarChart data={skillChartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid
                stroke="#e5e7eb"
                className="dark:stroke-zinc-700"
              />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                className="dark:fill-zinc-400"
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
                className="dark:fill-zinc-500"
              />
              <Radar
                name="Proficiency"
                dataKey="level"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          ) : (
            <BarChart data={skillChartData} layout="vertical" margin={{ top: 20, right: 30, bottom: 20, left: 80 }}>
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                type="category"
                dataKey="skill"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [`${value}%`, 'Proficiency']}
              />
              <Bar dataKey="level" radius={[0, 4, 4, 0]}>
                {skillChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-4">
        Skill proficiency based on project experience and coursework
      </p>
    </div>
  )
}

