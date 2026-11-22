interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  id?: string
}

/** Shared header so every section has the same spacing, hierarchy and type scale. */
export default function SectionHeader({ eyebrow, title, description, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-14">
      <p className="text-primary-700 dark:text-primary-300 text-xs font-semibold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-display text-3xl sm:text-4xl font-semibold mt-3 text-zinc-900 dark:text-white tracking-tight"
      >
        {title}
      </h2>
      <div
        aria-hidden="true"
        className="w-16 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-5 rounded-full"
      />
      {description && (
        <p className="text-zinc-600 dark:text-zinc-400 mt-5 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
