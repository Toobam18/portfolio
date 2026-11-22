import { Fragment } from 'react'

/**
 * Renders text with **double asterisks** marking the result to emphasize.
 * Used for project and experience bullets so the outcome (the "Z") stands out.
 */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-primary-700 dark:text-primary-300">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}

/** Plain text version (asterisks removed), for meta descriptions and alt text */
export function plain(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1')
}
