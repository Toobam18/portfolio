export default function TechTags({ tags, label = 'Technologies' }: { tags: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
