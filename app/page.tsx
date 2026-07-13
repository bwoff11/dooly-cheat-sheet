"use client";

import { useEffect, useMemo, useState } from "react";
import {
  cores,
  merchantDirectory,
  patchInfo,
  sources,
  universalRules,
  type BuildLine,
  type Confidence,
  type CoreGuide,
} from "./content";

const repoUrl = "https://github.com/bwoff11/dooly-cheat-sheet";
const issueUrl = `${repoUrl}/issues/new?labels=strategy-review&title=Patch+16+strategy+correction`;

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note ? <p className="section-note">{note}</p> : null}
    </div>
  );
}

function ConfidenceBadge({ level }: { level: Confidence }) {
  const labels: Record<Confidence, string> = {
    confirmed: "Mechanic-backed",
    consensus: "Expert consensus",
    situational: "Situational",
  };
  return <span className={`confidence confidence-${level}`}>{labels[level]}</span>;
}

function CoreSignal({ core, compact = false }: { core: CoreGuide; compact?: boolean }) {
  return (
    <span className={`core-signal accent-${core.accent} ${compact ? "core-signal-compact" : ""}`} aria-hidden="true">
      <i />
      <b>{core.signal}</b>
      <i />
    </span>
  );
}

function BulletList({ items, tone = "plain" }: { items: string[]; tone?: "plain" | "good" | "warn" }) {
  return (
    <ul className={`bullet-list bullet-${tone}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function BoardMap({ core }: { core: CoreGuide }) {
  return (
    <div className="board-wrap" aria-label={`Suggested board logic for ${core.name}`}>
      <div className="board-labels" aria-hidden="true">
        <span>LEFT · FEEDS CORE</span>
        <span>RIGHT · GETS PAID</span>
      </div>
      <div className="board-map">
        {core.board.map((slot, index) => (
          <div
            className={`board-slot board-${slot.kind}`}
            style={{ flexGrow: slot.size }}
            key={`${slot.label}-${index}`}
          >
            <span className="slot-index">0{index + 1}</span>
            <b>{slot.label}</b>
            {index < core.board.length - 1 ? <span className="board-arrow" aria-hidden="true">›</span> : null}
          </div>
        ))}
      </div>
      <p className="board-caption">A logic map, not a locked board. Item size and exact slots change with the line.</p>
    </div>
  );
}

function BuildCard({ build, index }: { build: BuildLine; index: number }) {
  return (
    <article className="build-card">
      <div className="build-topline">
        <span className="build-index">LINE 0{index + 1}</span>
        <ConfidenceBadge level={build.confidence} />
      </div>
      <h3>{build.name}</h3>
      <p className="build-label">{build.label}</p>
      <p className="build-pitch">{build.pitch}</p>
      <dl className="build-facts">
        <div>
          <dt>Enter when</dt>
          <dd>{build.enter}</dd>
        </div>
        <div>
          <dt>Engine</dt>
          <dd>{build.engine}</dd>
        </div>
      </dl>
      <div className="chip-group">
        <p>Non-negotiables</p>
        <div>{build.mustHave.map((item) => <span className="item-chip item-chip-must" key={item}>{item}</span>)}</div>
      </div>
      <div className="chip-group">
        <p>Flex slots</p>
        <div>{build.flex.map((item) => <span className="item-chip" key={item}>{item}</span>)}</div>
      </div>
      <div className="pivot-callout"><span>PIVOT CHECK</span>{build.pivot}</div>
    </article>
  );
}

function MerchantCard({ merchant, index }: { merchant: CoreGuide["merchants"][number]; index: number }) {
  return (
    <article className="merchant-card">
      <div className="merchant-rank"><span>0{index + 1}</span><i /></div>
      <div>
        <p className="mini-label">ROUTE PRIORITY</p>
        <h3>{merchant.name}</h3>
        <p className="merchant-why">{merchant.why}</p>
        <div className="merchant-decisions">
          <p><b>Reroll</b>{merchant.reroll}</p>
          <p><b>Leave</b>{merchant.leave}</p>
        </div>
      </div>
    </article>
  );
}

function Header({ core }: { core: CoreGuide }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Dooley Runbook home">
        <span className="brand-mark" aria-hidden="true"><i /><b>D</b><i /></span>
        <span><b>DOOLEY</b><small>RUNBOOK</small></span>
      </a>
      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation" onClick={() => setMenuOpen(false)}>
        <a href="#core-picker">Cores</a>
        <a href="#builds">Build lines</a>
        <a href="#merchants">Merchants</a>
        <a href="#patch-notes">Patch notes</a>
        <a href="#sources">Sources</a>
      </nav>
      <div className="header-status">
        <span className="live-dot" />
        <span><small>ACTIVE ROUTE</small><b>{core.shortName}</b></span>
      </div>
    </header>
  );
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(cores[0].id);
  const [filter, setFilter] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("core");
    if (fromUrl && cores.some((core) => core.id === fromUrl)) {
      const frame = window.requestAnimationFrame(() => setSelectedId(fromUrl));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  const selected = cores.find((core) => core.id === selectedId) ?? cores[0];
  const filteredCores = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return cores;
    return cores.filter((core) =>
      [core.name, core.role, core.tempo, core.difficulty, core.summary].join(" ").toLowerCase().includes(query),
    );
  }, [filter]);

  function chooseCore(id: string) {
    setSelectedId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("core", id);
    window.history.replaceState({}, "", url);
    document.getElementById("guide")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function shareRoute() {
    const url = new URL(window.location.href);
    url.searchParams.set("core", selected.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this route link", url.toString());
    }
  }

  return (
    <>
      <Header core={selected} />
      <main id="top">
        <section className="hero shell">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="status-row">
                <span className="status-chip"><i /> {patchInfo.status}</span>
                <span>Patch {patchInfo.major} · rev {patchInfo.revision}</span>
                <span>Reviewed {patchInfo.reviewedAt}</span>
              </div>
              <p className="eyebrow">A PATCH-LOCKED FIELD GUIDE</p>
              <h1>Choose a Core.<br /><em>Find the line.</em></h1>
              <p className="hero-lede">
                A fast Dooley cheat sheet for players who know strategy games but do not want a wiki open mid-run. Pick what you were offered; get the plan, purchases, merchants, pivots, and traps.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#core-picker">Choose your Core <span>↓</span></a>
                <a className="button button-secondary" href="#merchants">Merchant cheat sheet</a>
              </div>
              <p className="hero-footnote"><b>Rule zero:</b> build a line, not a screenshot. The best board is the strongest route your run actually offered.</p>
            </div>
            <div className="hero-console" aria-label="Run briefing">
              <div className="console-top"><span>RUN // 16.1</span><span className="console-lights"><i /><i /><i /></span></div>
              <div className="bot-display">
                <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                <div className="bot-head"><span className="bot-ear" /><div className="bot-face"><i /><i /><b>ᴗ</b></div><span className="bot-ear" /></div>
                <div className="core-orb"><span>{selected.signal}</span></div>
              </div>
              <div className="console-readout">
                <p><span>CORE ROUTES</span><b>{cores.length.toString().padStart(2, "0")}</b></p>
                <p><span>BUILD LINES</span><b>{cores.reduce((sum, core) => sum + core.builds.length, 0)}</b></p>
                <p><span>MERCHANT CALLS</span><b>{cores.reduce((sum, core) => sum + core.merchants.length, 0)}</b></p>
              </div>
              <div className="console-tip"><span>START HERE</span><p>Pick a route only when its entry signals match your board.</p></div>
            </div>
          </div>
        </section>

        <section className="run-strip">
          <div className="shell run-strip-inner">
            <p><b>NEW RUN?</b> Use this order</p>
            <ol>
              <li><span>1</span> Read pick signals</li>
              <li><span>2</span> Choose one live line</li>
              <li><span>3</span> Shop its merchants</li>
              <li><span>4</span> Re-check pivot on Day 7</li>
            </ol>
          </div>
        </section>

        <section className="section shell core-picker" id="core-picker">
          <SectionHeading
            eyebrow="01 // SELECT ROUTE"
            title="What Core did you pick?"
            note="Launcher is included as a current specialist route. The archive will grow by major patch without overwriting this one."
          />
          <div className="picker-toolbar">
            <label className="patch-select"><span>Major patch</span><select aria-label="Select major patch" defaultValue="16"><option value="16">16 · The Invasion Begins</option></select></label>
            <label className="search-box"><span aria-hidden="true">⌕</span><input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Filter by Core, role, or tempo…" aria-label="Filter Core routes" /></label>
          </div>
          <div className="core-grid">
            {filteredCores.map((core) => (
              <button
                type="button"
                className={`core-card accent-${core.accent} ${selected.id === core.id ? "core-card-active" : ""}`}
                onClick={() => chooseCore(core.id)}
                aria-pressed={selected.id === core.id}
                key={core.id}
              >
                <div className="core-card-top"><CoreSignal core={core} /><span>{selected.id === core.id ? "LOADED" : "SELECT"}</span></div>
                <h3>{core.name}</h3>
                <p>{core.role}</p>
                <div className="core-tags"><span>{core.difficulty}</span><span>{core.tempo}</span></div>
                <div className="core-card-arrow">Open route <b>↗</b></div>
              </button>
            ))}
          </div>
          {filteredCores.length === 0 ? <p className="empty-state">No route matches that filter. Try “weapon,” “easy,” “late,” or clear the field.</p> : null}
        </section>

        <section className={`guide-section accent-${selected.accent}`} id="guide">
          <div className="shell">
            <div className="guide-header">
              <CoreSignal core={selected} />
              <div className="guide-title">
                <p className="eyebrow">02 // ACTIVE ROUTE</p>
                <h2>{selected.name}</h2>
                <p>{selected.role}</p>
              </div>
              <div className="guide-metrics">
                <p><span>DIFFICULTY</span><b>{selected.difficulty}</b></p>
                <p><span>TEMPO</span><b>{selected.tempo}</b></p>
                <button type="button" onClick={shareRoute}>{copied ? "LINK COPIED" : "SHARE ROUTE"}</button>
              </div>
            </div>
            <nav className="guide-nav" aria-label={`${selected.name} sections`}>
              <a href="#briefing">Briefing</a><a href="#builds">Builds</a><a href="#priorities">Buy list</a><a href="#route-merchants">Merchants</a><a href="#timeline">Timeline</a>
            </nav>

            <div className="briefing-grid" id="briefing">
              <article className="panel briefing-main">
                <p className="panel-kicker">THE 20-SECOND BRIEF</p>
                <h3>{selected.summary}</h3>
                <div className="plan-callout"><span>THE PLAN</span><p>{selected.plan}</p></div>
                <div className="mechanic-line"><span>CURRENT TEXT · 16.1</span><p>{selected.mechanic}</p></div>
              </article>
              <article className="panel signal-panel">
                <div className="signal-column"><p className="panel-kicker good-kicker">PICK THIS WHEN</p><BulletList items={selected.pickWhen} tone="good" /></div>
                <div className="signal-column"><p className="panel-kicker warn-kicker">AVOID / DELAY WHEN</p><BulletList items={selected.avoidWhen} tone="warn" /></div>
              </article>
            </div>

            <BoardMap core={selected} />

            <div className="subsection" id="builds">
              <SectionHeading eyebrow="03 // BUILD LINES" title="Three ways this route wins" note="Ordered by usefulness, not presented as a rigid tier list. Expand the line your items actually support." />
              <div className="build-grid">{selected.builds.map((build, index) => <BuildCard build={build} index={index} key={build.name} />)}</div>
            </div>

            <div className="subsection" id="priorities">
              <SectionHeading eyebrow="04 // PURCHASE LOGIC" title="Buy / hold / skip" note="Names are examples; roles are the durable part. An upgrade that fixes your bottleneck beats a prettier synergy." />
              <div className="priority-grid">
                <article className="priority-card priority-buy"><span className="priority-icon">↑</span><p>AUTO-BUY / TARGET</p><h3>Moves the line forward</h3><BulletList items={selected.buy} tone="good" /></article>
                <article className="priority-card priority-hold"><span className="priority-icon">◆</span><p>HOLD / CONDITIONAL</p><h3>Useful while it earns space</h3><BulletList items={selected.hold} /></article>
                <article className="priority-card priority-skip"><span className="priority-icon">×</span><p>SKIP / SELL</p><h3>Looks right, plays wrong</h3><BulletList items={selected.skip} tone="warn" /></article>
              </div>
            </div>

            <div className="subsection" id="route-merchants">
              <SectionHeading eyebrow="05 // MERCHANT ROUTING" title={`Best merchants for ${selected.shortName}`} note="Each recommendation includes the missing half of shop advice: why to enter, when to reroll, and when to leave." />
              <div className="merchant-grid">{selected.merchants.map((merchant, index) => <MerchantCard merchant={merchant} index={index} key={merchant.name} />)}</div>
            </div>

            <div className="subsection timeline-section" id="timeline">
              <SectionHeading eyebrow="06 // RUN TIMELINE" title="What changes as the run ages" />
              <div className="timeline">
                {selected.timeline.map((step, index) => (
                  <article key={step.phase}><div className="timeline-node"><span>0{index + 1}</span></div><p className="mini-label">{step.phase}</p><h3>{step.title}</h3><p>{step.text}</p></article>
                ))}
              </div>
              <div className="exit-grid">
                <article className="panel"><p className="panel-kicker">PIVOT DOORS</p><BulletList items={selected.pivots} tone="good" /></article>
                <article className="panel trap-panel"><p className="panel-kicker warn-kicker">COMMON TRAPS</p><BulletList items={selected.traps} tone="warn" /></article>
              </div>
            </div>

            <div className="patch-callout"><span>PATCH 16 CHANGE</span><p>{selected.patchChange}</p><a href={sources.official.href} target="_blank" rel="noreferrer">Official notes ↗</a></div>
          </div>
        </section>

        <section className="section shell universal-section">
          <SectionHeading eyebrow="07 // SYSTEM RULES" title="Dooley rules that survive the patch" note="Use these when your exact item combination is not listed. They are the decision framework behind every route above." />
          <div className="rule-grid">
            {universalRules.map((rule) => <article className="rule-card" key={rule.kicker}><p>{rule.kicker}</p><h3>{rule.title}</h3><span>{rule.text}</span></article>)}
          </div>
        </section>

        <section className="merchant-directory-section" id="merchants">
          <div className="shell">
            <SectionHeading eyebrow="08 // SHOP DIRECTORY" title="Merchant routing, without the guessing" note="The best merchant is the narrowest pool with multiple live hits. Reroll prices are shown where current data is stable." />
            <div className="directory-intro">
              <p><b>Before Core selection:</b> hedge 3–4 routes with efficient items. Mittel and Ande usually expose the densest early Dooley pieces.</p>
              <p><b>After selection:</b> shop the bottleneck—payoff, speed, or defense—not merely the Core’s keyword.</p>
              <p><b>Before rerolling:</b> name at least two acceptable hits. One exact out is a reason to save.</p>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Merchant</th><th>Stock</th><th>Reroll</th><th>Best for</th><th>The rule</th></tr></thead>
                <tbody>{merchantDirectory.map((merchant) => <tr key={merchant.name}><th>{merchant.name}</th><td>{merchant.stock}</td><td><span className="reroll-chip">{merchant.reroll}</span></td><td>{merchant.bestFor}</td><td>{merchant.rule}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="directory-source">Current shop pools cross-checked against the <a href="https://bazaar-builds.net/db/merchants/" target="_blank" rel="noreferrer">Bazaar Local merchant database ↗</a>. Availability and tiers can change in hotfixes.</p>
          </div>
        </section>

        <section className="section shell patch-section" id="patch-notes">
          <SectionHeading eyebrow="09 // PATCH CONTROL" title={`Patch ${patchInfo.major} · ${patchInfo.name}`} note={`Live revision ${patchInfo.revision} · reviewed ${patchInfo.reviewedAt}. Future major patches get separate snapshots instead of silently rewriting history.`} />
          <div className="patch-grid">
            <article className="patch-card patch-card-featured"><span>CURRENT</span><h3>16.1 hotfix state</h3><p>No direct Core balance changes after the Patch 16.0 Core pass. Wallace no longer scales on cooldown.</p><a href={sources.official.href} target="_blank" rel="noreferrer">Read official patch notes ↗</a></article>
            <article className="patch-card"><span>ECONOMY</span><h3>Starting Income is 5</h3><p>Saving through a strong early board matters more. Treat random rerolls as a real cost and prepare a Day 6 hit list.</p></article>
            <article className="patch-card"><span>CORE PASS</span><h3>Upgrades matter more</h3><p>Armored, Critical, The, Primal, Weaponized, and Ignition received tier-scaled base values in 16.0.</p></article>
            <article className="patch-card"><span>ARCHIVE</span><h3>This is snapshot 001</h3><p>Patch 16 is the first preserved runbook. The data model already separates major patch, live revision, review date, and sources.</p></article>
          </div>
        </section>

        <section className="sources-section" id="sources">
          <div className="shell sources-grid">
            <div>
              <p className="eyebrow">10 // SOURCES & METHOD</p>
              <h2>Consensus first.<br />Theory labeled.</h2>
              <p>This runbook reconciles official balance notes and current card data with high-ranked community guides. It favors repeatable build lines over isolated 10-win screenshots.</p>
              <a className="button button-secondary" href={issueUrl} target="_blank" rel="noreferrer">Report stale strategy ↗</a>
            </div>
            <div className="source-list">
              {Object.entries(sources).map(([id, source]) => (
                <a href={source.href} target="_blank" rel="noreferrer" key={id}><span>{source.type}</span><b>{source.label}</b><i>↗</i></a>
              ))}
              <a href="https://bazaar-builds.net/db/merchants/" target="_blank" rel="noreferrer"><span>Merchant database</span><b>Current shop pools and reroll rules</b><i>↗</i></a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-grid">
          <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true"><i /><b>D</b><i /></span><span><b>DOOLEY</b><small>RUNBOOK</small></span></div>
          <p>Unofficial fan-made strategy reference. The Bazaar and its trademarks belong to their respective owners.</p>
          <div><a href={repoUrl} target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
