import type { LucideIcon } from "lucide-react"

export function InfoChip({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[color:var(--cinopse-border)] bg-[color:var(--cinopse-surface)] p-3.5 transition-colors hover:border-[color:var(--cinopse-accent)]/40">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-[color:var(--cinopse-secondary)] shadow-sm">
        <Icon className="size-4" />
      </span>
      <p>{text}</p>
    </div>
  )
}
