export function AgendaPageContent() {
  return (
    <main className="bg-[color:var(--cinopse-cream)] pt-[118px] pb-20">
      <div className="mx-auto max-w-[1160px] px-7">
        <div className="mb-8">
          <div className="inline-flex items-center gap-5">
            <span className="h-0.5 w-16 rounded-full bg-[color:var(--cinopse-accent)]" />
            <span className="text-[11px] leading-none font-semibold tracking-[0.35em] text-[color:var(--cinopse-accent-deep)] uppercase">
              Scientific Programme
            </span>
          </div>
          <h1 className="font-display mt-6 max-w-4xl text-[clamp(28px,4vw,48px)] leading-tight font-semibold tracking-[-0.02em] text-[color:var(--cinopse-ink)]">
            CINOPSE India 2026 Agenda
          </h1>
          <p className="mt-5 max-w-2xl text-[clamp(16px,1.4vw,18px)] leading-8 text-[color:var(--cinopse-text-secondary)]">
            The official agenda PDF is shown below. Download the file for
            offline access.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <a
            href="/agenda.pdf"
            download
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--cinopse-primary)] px-6 py-3 text-[12.5px] font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(27,75,150,0.35)]"
          >
            Download Agenda PDF
          </a>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[color:var(--cinopse-border)] bg-white shadow-[0_18px_42px_rgba(12,40,84,0.12)]">
          <iframe
            src="/agenda.pdf"
            title="CINOPSE India 2026 agenda PDF"
            className="h-[78vh] min-h-[640px] w-full"
          />
        </div>
      </div>
    </main>
  )
}
