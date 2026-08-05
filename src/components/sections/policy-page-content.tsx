import type { PolicyPage } from "@/lib/policy-pages"

export function PolicyPageContent({ policy }: { policy: PolicyPage }) {
  return (
    <main className="bg-[color:var(--cinopse-cream)]">
      <section className="relative overflow-hidden bg-[image:var(--cinopse-gradient-reference-blue)] pt-[126px] pb-14 text-white">
        <div className="absolute -top-[220px] -right-44 size-[520px] rounded-full bg-[rgba(29,90,180,.5)] blur-[90px]" />
        <div className="relative z-10 mx-auto max-w-[960px] px-7">
          <div className="mb-3 flex items-center gap-[13px]">
            <span className="h-0.5 w-[42px] bg-[color:var(--cinopse-accent)]" />
            <b className="text-[11px] leading-none font-medium tracking-[0.22em] text-[color:var(--cinopse-accent)] uppercase">
              {policy.eyebrow}
            </b>
          </div>
          <h1 className="font-display m-0 mb-4 text-[clamp(30px,4.6vw,48px)] leading-[1.08] font-semibold tracking-[-0.01em]">
            {policy.title}
          </h1>
          <p className="m-0 max-w-[720px] text-[15px] leading-[1.8] font-light text-white/75">
            {policy.summary}
          </p>
          <p className="mt-5 mb-0 text-[12px] leading-none font-medium text-white/55">
            Last updated: {policy.updated}
          </p>
        </div>
      </section>

      <section className="px-7 py-14">
        <div className="mx-auto grid max-w-[960px] gap-5">
          {policy.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[28px] border border-[color:var(--cinopse-border)] bg-white p-7 shadow-[0_16px_42px_rgba(6,26,58,0.06)] md:p-9"
            >
              <h2 className="font-display m-0 mb-4 text-[clamp(22px,2.4vw,30px)] leading-tight font-semibold text-[color:var(--cinopse-primary)]">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 mb-4 text-[15px] leading-8 text-[color:var(--cinopse-text-secondary)] last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="m-0 grid list-none gap-3 p-0">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-5 text-[15px] leading-8 text-[color:var(--cinopse-text-secondary)] before:absolute before:top-[13px] before:left-0 before:size-1.5 before:rounded-full before:bg-[color:var(--cinopse-accent)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
