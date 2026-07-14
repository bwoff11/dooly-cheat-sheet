"use client";

/* eslint-disable @next/next/no-img-element -- Generated local art is shipped unchanged by both static and Worker builds. */

import { useEffect, useMemo, useState } from "react";
import {
  coreDepthById,
  cores,
  merchantDirectory,
  patchInfo,
  sources,
  topDooleyItems,
  universalRules,
  type BuildLine,
  type Confidence,
  type CoreGuide,
  type GlobalItemTier,
  type GlobalRankedItem,
  type ItemSpotlight,
  type ItemTier,
  type RankedItem,
  type SynergyPackage,
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

const tierMeta: Record<ItemTier, { label: string; description: string }> = {
  S: { label: "Build-defining", description: "Buy when the listed route is supported" },
  A: { label: "High-value support", description: "Strong after the engine or payoff exists" },
  B: { label: "Package-dependent", description: "Useful only when its condition is already live" },
};

function ItemTierBoard({ items }: { items: RankedItem[] }) {
  return (
    <div className="item-tier-board">
      {(["S", "A", "B"] as ItemTier[]).map((tier) => {
        const tierItems = items.filter((item) => item.tier === tier);
        return (
          <article className={`item-tier-lane item-tier-${tier.toLowerCase()}`} key={tier}>
            <header>
              <span className="tier-letter">{tier}</span>
              <div><h3>{tierMeta[tier].label}</h3><p>{tierMeta[tier].description}</p></div>
              <b>{tierItems.length.toString().padStart(2, "0")}</b>
            </header>
            <div className="tier-item-list">
              {tierItems.map((item, index) => (
                <div className="tier-item" key={item.name}>
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <div><h4>{item.name}</h4><p>{item.why}</p></div>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ItemSpotlightPanel({ spotlight }: { spotlight: ItemSpotlight }) {
  return (
    <article className="item-spotlight" aria-labelledby="item-spotlight-title">
      <header className="spotlight-header">
        <span className="spotlight-code" aria-hidden="true">PR</span>
        <div className="spotlight-title-block">
          <p>TECHNICAL ITEM SPOTLIGHT</p>
          <h3 id="item-spotlight-title">{spotlight.item}</h3>
          <span>{spotlight.title}</span>
        </div>
        <p className="spotlight-spec">{spotlight.spec}</p>
      </header>

      <p className="spotlight-summary">{spotlight.summary}</p>

      <div className="spotlight-data-grid">
        <section className="spotlight-data spotlight-data-mechanic">
          <span>CURRENT EFFECT</span>
          <p>{spotlight.mechanic}</p>
        </section>
        <section className="spotlight-data spotlight-data-rule">
          <span>EVENT RULE</span>
          <p>{spotlight.rule}</p>
        </section>
        <section className="spotlight-data spotlight-data-threshold">
          <span>PURCHASE HEURISTIC</span>
          <p>{spotlight.threshold}</p>
        </section>
      </div>

      <section className="spotlight-sequence" aria-labelledby="spotlight-sequence-title">
        <div className="spotlight-section-heading">
          <p>FIRST-CYCLE ORDER</p>
          <h4 id="spotlight-sequence-title">Create events before the Rifle resolves</h4>
        </div>
        <ol>
          {spotlight.sequence.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="spotlight-detail-grid">
        <section className="spotlight-detail spotlight-partners" aria-labelledby="spotlight-partners-title">
          <div className="spotlight-section-heading">
            <p>PACKAGE MATRIX</p>
            <h4 id="spotlight-partners-title">Best partners</h4>
          </div>
          <ul>
            {spotlight.partners.map((partner, index) => (
              <li key={partner.name}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <div><b>{partner.name}</b><p>{partner.why}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <section className="spotlight-detail spotlight-upgrades" aria-labelledby="spotlight-upgrades-title">
          <div className="spotlight-section-heading">
            <p>SCALING MATRIX</p>
            <h4 id="spotlight-upgrades-title">Upgrade priority</h4>
          </div>
          <ul>
            {spotlight.upgrades.map((upgrade, index) => (
              <li key={upgrade.name}>
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                <div><b>{upgrade.name}</b><p>{upgrade.why}</p></div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="spotlight-decision-grid">
        <section className="spotlight-decision spotlight-buy">
          <p>BUY / CONVERT WHEN</p>
          <BulletList items={spotlight.buyWhen} tone="good" />
        </section>
        <section className="spotlight-decision spotlight-avoid">
          <p>PASS / REPLACE WHEN</p>
          <BulletList items={spotlight.avoidWhen} tone="warn" />
        </section>
      </div>

      <footer className="spotlight-source">
        <span>LIVE DATA REFERENCE</span>
        <a href={spotlight.source.href} target="_blank" rel="noreferrer">{spotlight.source.label} ↗</a>
      </footer>
    </article>
  );
}

const globalTierOrder: GlobalItemTier[] = ["S", "A", "B", "C"];

const globalTierMeta: Record<GlobalItemTier, { label: string; description: string }> = {
  S: { label: "Route defining", description: "Can establish or complete a top-level plan when its target or trigger is live." },
  A: { label: "Broadly strong", description: "High-value pieces with several supported routes and a low opportunity cost." },
  B: { label: "Package dependent", description: "Powerful after a specific engine, target, or breakpoint has been proven." },
  C: { label: "Conditional", description: "Narrow pivots, bridges, or premium finishers that need exact evidence before purchase." },
};

function GlobalItemCard({ item }: { item: GlobalRankedItem }) {
  return (
    <li className="global-tier-item" value={item.rank}>
      <div className="global-tier-rank" aria-label={`Global rank ${item.rank}`}>{item.rank.toString().padStart(2, "0")}</div>
      <div className="global-tier-copy">
        <header><h4>{item.name}</h4><span className="global-role-chip">{item.role}</span></header>
        <p className="global-item-summary">{item.summary}</p>
        <div className="global-best-in" aria-label="Recommended routes">
          <b>BEST IN</b>
          {item.bestIn.map((route) => <span key={route}>{route}</span>)}
        </div>
        <details className="global-item-analysis">
          <summary>Why it ranks here</summary>
          <p>{item.why}</p>
          <p className="global-item-condition"><b>TAKE WHEN</b><span>{item.condition}</span></p>
        </details>
      </div>
    </li>
  );
}

function GlobalItemTierBoard({ items }: { items: GlobalRankedItem[] }) {
  const groups = globalTierOrder.map((tier) => ({
    tier,
    meta: globalTierMeta[tier],
    items: items.filter((item) => item.tier === tier).sort((a, b) => a.rank - b.rank),
  }));

  return (
    <>
      <nav className="global-tier-jump" aria-label="Jump to item tier">
        {groups.map(({ tier, meta, items: tierItems }) => (
          <a href={`#global-tier-${tier.toLowerCase()}`} key={tier}>
            <b>{tier}</b><span>{meta.label}</span><i>{tierItems.length}</i>
          </a>
        ))}
      </nav>
      <div className="global-tier-board">
        {groups.map(({ tier, meta, items: tierItems }) => (
          <section className={`global-tier-group global-tier-${tier.toLowerCase()}`} id={`global-tier-${tier.toLowerCase()}`} aria-labelledby={`global-tier-${tier.toLowerCase()}-title`} key={tier}>
            <header className="global-tier-header">
              <span aria-hidden="true">{tier}</span>
              <div><h3 id={`global-tier-${tier.toLowerCase()}-title`}>{tier} tier · {meta.label}</h3><p>{meta.description}</p></div>
              <b>{tierItems.length.toString().padStart(2, "0")} ITEMS</b>
            </header>
            <ol className="global-tier-items" aria-label={`${tier} tier items`}>
              {tierItems.map((item) => <GlobalItemCard item={item} key={item.name} />)}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}

function SynergyCard({ synergy, index }: { synergy: SynergyPackage; index: number }) {
  return (
    <article className={`synergy-card synergy-grade-${synergy.grade.toLowerCase()}`}>
      <div className="synergy-topline"><span>PACKAGE {(index + 1).toString().padStart(2, "0")}</span><b>{synergy.grade}</b></div>
      <h3>{synergy.name}</h3>
      <div className="synergy-chain" aria-label={`${synergy.name} item package`}>
        {synergy.items.map((item, itemIndex) => (
          <span key={item}>{itemIndex > 0 ? <i aria-hidden="true">+</i> : null}<b>{item}</b></span>
        ))}
      </div>
      <p className="synergy-plan">{synergy.plan}</p>
      <dl className="synergy-checks">
        <div><dt>Online when</dt><dd>{synergy.online}</dd></div>
        <div><dt>Abandon / adjust</dt><dd>{synergy.breaks}</dd></div>
      </dl>
    </article>
  );
}

function rerollTone(reroll: string) {
  if (reroll.startsWith("2g")) return "reroll-low";
  if (reroll.startsWith("3g")) return "reroll-mid";
  if (reroll.startsWith("4g") || reroll === "Premium") return "reroll-high";
  return "reroll-special";
}

function merchantCategory(name: string) {
  if (["Ande", "Mittel", "Pol / Quixel"].includes(name)) return "size";
  if (["Aila", "Hef", "Aimbot"].includes(name)) return "damage";
  if (["Kina", "Kev’s Armory"].includes(name)) return "defense";
  return "engine";
}

function BoardMap({ core }: { core: CoreGuide }) {
  const labels = core.boardLabels ?? {
    left: "LEFT · FEEDS CORE",
    right: "RIGHT · RECEIVES CORE EFFECT",
  };

  return (
    <div className="board-wrap" aria-label={`Suggested board logic for ${core.name}`}>
      <div className="board-labels" aria-hidden="true">
        <span>{labels.left}</span>
        <span>{labels.right}</span>
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
      <p className="board-caption">{core.boardCaption ?? "General activation order. Exact slots depend on item sizes and the selected build."}</p>
    </div>
  );
}

function BuildCard({ build, index }: { build: BuildLine; index: number }) {
  return (
    <article className="build-card">
      <div className="build-topline">
        <span className="build-index">BUILD 0{index + 1}</span>
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
      <div className="chip-group chip-group-required">
        <p>Non-negotiables</p>
        <div>{build.mustHave.map((item) => <span className="item-chip item-chip-must" key={item}>{item}</span>)}</div>
      </div>
      <div className="chip-group chip-group-flex">
        <p>Flex slots</p>
        <div>{build.flex.map((item) => <span className="item-chip" key={item}>{item}</span>)}</div>
      </div>
      <div className="pivot-callout"><span>PIVOT CONDITION</span>{build.pivot}</div>
    </article>
  );
}

function MerchantCard({ merchant, index }: { merchant: CoreGuide["merchants"][number]; index: number }) {
  return (
    <article className="merchant-card">
      <div className="merchant-rank"><span>0{index + 1}</span><i /></div>
      <div>
        <p className="mini-label">CORE PRIORITY</p>
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
        <a href="#item-tiers">Item tiers</a>
        <a href="#synergies">Synergies</a>
        <a href="#merchants">Merchants</a>
        <a href="#patch-notes">Patch notes</a>
        <a href="#sources">Sources</a>
      </nav>
      <div className="header-status">
        <span className="live-dot" />
        <span><small>SELECTED CORE</small><b>{core.shortName}</b></span>
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
  const depth = coreDepthById[selected.id] ?? coreDepthById["the-core"];
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
              <p className="eyebrow">PATCH 16.1 STRATEGY REFERENCE</p>
              <h1>Dooley Core<br /><em>Strategy Reference</em></h1>
              <p className="hero-lede">
                Select a Core for a professional Patch 16.1 guide: ranked items, proven synergy packages, build archetypes, activation order, matchup context, merchant targets, and pivot conditions.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#core-picker">Select Core <span>↓</span></a>
                <a className="button button-secondary" href="#merchants">Merchant reference</a>
              </div>
              <p className="hero-footnote"><b>Selection criterion:</b> commit to a build only when its required items and activation order are already supported.</p>
            </div>
            <div className="hero-visual" aria-label="Core strategy analysis">
              <img className="hero-art" src="./core-analysis-lab.png" alt="Original illustration of a modular robot analyzing eight colored power cores in a galactic workshop" width="1672" height="941" fetchPriority="high" />
              <div className="visual-status"><span>PATCH DATASET</span><b>16.1</b></div>
              <div className="visual-readout">
                <p><span>CORE ROUTES</span><b>{cores.length.toString().padStart(2, "0")}</b></p>
                <p><span>SYNERGY PACKAGES</span><b>{Object.values(coreDepthById).reduce((sum, core) => sum + core.synergies.length, 0)}</b></p>
                <p><span>RANKED ITEMS</span><b>{topDooleyItems.length}</b></p>
              </div>
              <div className="visual-rule"><span>SELECTION RULE</span><p>Choose a build only when your current items satisfy its entry criteria.</p></div>
            </div>
          </div>
        </section>

        <section className="run-strip">
          <div className="shell run-strip-inner">
            <p><b>IN-RUN ORDER</b></p>
            <ol>
              <li><span>1</span> Select the supported Core</li>
              <li><span>2</span> Check its item tiers</li>
              <li><span>3</span> Confirm a synergy package</li>
              <li><span>4</span> Route shops and pivots</li>
            </ol>
          </div>
        </section>

        <section className="section shell core-picker" id="core-picker">
          <SectionHeading
            eyebrow="01 // CORE INDEX"
            title="Select a Core"
            note="Seven starting Core choices are listed with Launcher as a separate specialist route. Patch snapshots remain archived by major version."
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
                <div className="core-card-top"><CoreSignal core={core} /><span>{selected.id === core.id ? "SELECTED" : "VIEW"}</span></div>
                <h3>{core.name}</h3>
                <p>{core.role}</p>
                <div className="core-tags"><span className="scan-chip" data-value={core.difficulty.toLowerCase()}>{core.difficulty}</span><span className="scan-chip" data-value={core.tempo.toLowerCase()}>{core.tempo}</span></div>
                <div className="core-card-arrow">View strategy <b>↗</b></div>
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
                <p className="eyebrow">02 // SELECTED CORE</p>
                <h2>{selected.name}</h2>
                <p>{selected.role}</p>
              </div>
              <div className="guide-metrics">
                <p><span>DIFFICULTY</span><b>{selected.difficulty}</b></p>
                <p><span>TEMPO</span><b>{selected.tempo}</b></p>
                <button type="button" onClick={shareRoute}>{copied ? "LINK COPIED" : "COPY CORE LINK"}</button>
              </div>
            </div>
            <nav className="guide-nav" aria-label={`${selected.name} sections`}>
              <a href="#briefing">Overview</a><a href="#item-tiers">Item tiers</a><a href="#synergies">Synergies</a><a href="#builds">Builds</a><a href="#route-merchants">Merchants</a><a href="#timeline">Run phases</a>
            </nav>

            <div className="briefing-grid" id="briefing">
              <article className="panel briefing-main">
                <p className="panel-kicker">STRATEGY SUMMARY</p>
                <h3>{selected.summary}</h3>
                <div className="plan-callout"><span>RECOMMENDED APPROACH</span><p>{selected.plan}</p></div>
                <div className="mechanic-line"><span>CORE MECHANICS · PATCH 16.1</span><p>{selected.mechanic}</p></div>
              </article>
              <article className="panel signal-panel">
                <div className="signal-column"><p className="panel-kicker good-kicker">PICK THIS WHEN</p><BulletList items={selected.pickWhen} tone="good" /></div>
                <div className="signal-column"><p className="panel-kicker warn-kicker">AVOID / DELAY WHEN</p><BulletList items={selected.avoidWhen} tone="warn" /></div>
              </article>
            </div>

            <div className="core-context-grid" aria-label={`${selected.name} decision summary`}>
              <article><span>WIN CONDITION</span><p>{depth.northStar}</p></article>
              <article><span>LIMITING FACTOR</span><p>{depth.bottleneck}</p></article>
              <article><span>FIRST BREAKPOINT</span><p>{depth.firstBreakpoint}</p></article>
              <article><span>CORE EXIT RULE</span><p>{depth.exitRule}</p></article>
            </div>

            <BoardMap core={selected} />

            <div className="subsection item-tier-section" id="item-tiers">
              <SectionHeading eyebrow="03 // CORE ITEM TIERS" title={`Top items for ${selected.shortName}`} note="Tiers are relative to this Core, not raw card power. S means route-defining; B means the item needs a specific package or breakpoint." />
              <ItemTierBoard items={depth.itemRanks} />
              {depth.spotlight ? <ItemSpotlightPanel spotlight={depth.spotlight} /> : null}
            </div>

            <div className="subsection synergy-section" id="synergies">
              <SectionHeading eyebrow="04 // SYNERGY PACKAGES" title="What actually works together" note="Each package states why the interaction works, the condition that makes it operational, and the reason to abandon it." />
              <div className="synergy-grid">{depth.synergies.map((synergy, index) => <SynergyCard synergy={synergy} index={index} key={synergy.name} />)}</div>
              <div className="matchup-grid">
                <article><span>FAVORED INTO</span><p>{depth.matchup.favored}</p></article>
                <article><span>RESPECT</span><p>{depth.matchup.respect}</p></article>
                <article><span>ADAPTATION</span><p>{depth.matchup.adapt}</p></article>
              </div>
            </div>

            <div className="subsection" id="builds">
              <SectionHeading eyebrow="05 // BUILD ARCHETYPES" title="Recommended build archetypes" note="Ordered by general applicability rather than absolute power. Use the build whose entry requirements match your current items." />
              <div className="build-grid">{selected.builds.map((build, index) => <BuildCard build={build} index={index} key={build.name} />)}</div>
            </div>

            <div className="subsection" id="priorities">
              <SectionHeading eyebrow="06 // PURCHASE LOGIC" title="Buy / hold / skip" note="Names are examples; roles are the durable part. An upgrade that fixes your bottleneck beats a prettier synergy." />
              <div className="priority-grid">
                <article className="priority-card priority-buy"><span className="priority-icon">↑</span><p>AUTO-BUY / TARGET</p><h3>Highest-impact purchases</h3><BulletList items={selected.buy} tone="good" /></article>
                <article className="priority-card priority-hold"><span className="priority-icon">◆</span><p>HOLD / CONDITIONAL</p><h3>Retain while conditions apply</h3><BulletList items={selected.hold} /></article>
                <article className="priority-card priority-skip"><span className="priority-icon">×</span><p>SKIP / SELL</p><h3>Low-impact or incompatible</h3><BulletList items={selected.skip} tone="warn" /></article>
              </div>
            </div>

            <div className="subsection" id="route-merchants">
              <SectionHeading eyebrow="07 // MERCHANT ROUTING" title={`Best merchants for ${selected.shortName}`} note="Each recommendation includes the missing half of shop advice: why to enter, when to reroll, and when to leave." />
              <div className="merchant-grid">{selected.merchants.map((merchant, index) => <MerchantCard merchant={merchant} index={index} key={merchant.name} />)}</div>
            </div>

            <div className="subsection timeline-section" id="timeline">
              <SectionHeading eyebrow="08 // RUN PHASES" title="Priorities by run phase" />
              <div className="timeline">
                {selected.timeline.map((step, index) => (
                  <article key={step.phase}><div className="timeline-node"><span>0{index + 1}</span></div><p className="mini-label">{step.phase}</p><h3>{step.title}</h3><p>{step.text}</p></article>
                ))}
              </div>
              <div className="exit-grid">
                <article className="panel"><p className="panel-kicker">PIVOT OPTIONS</p><BulletList items={selected.pivots} tone="good" /></article>
                <article className="panel trap-panel"><p className="panel-kicker warn-kicker">FAILURE MODES</p><BulletList items={selected.traps} tone="warn" /></article>
              </div>
            </div>

            <div className="patch-callout"><span>PATCH 16 CHANGE</span><p>{selected.patchChange}</p><a href={sources.official.href} target="_blank" rel="noreferrer">Official notes ↗</a></div>
          </div>
        </section>

        <section className="meta-tier-section" id="meta-items">
          <div className="shell">
            <SectionHeading eyebrow={`09 // PATCH 16 ITEM BOARD · ${topDooleyItems.length} ITEMS`} title="Dooley item opportunity tiers" note="A four-tier purchase field guide synthesized from the current expert guide, Season 16 meta builds, and live card data. Rank measures general opportunity value—not isolated tooltip ceiling." />
            <GlobalItemTierBoard items={topDooleyItems} />
            <p className="tier-method"><b>How to use this:</b> immediate tempo and a supported package outrank speculative ceiling. S means route-defining, not automatic buy; C means narrow or exact-package, not unplayable. Open any card for the purchase test.</p>
          </div>
        </section>

        <section className="section shell universal-section">
          <SectionHeading eyebrow="10 // GENERAL PRINCIPLES" title="General Dooley strategy principles" note="Apply these rules when an exact item combination is not listed." />
          <div className="rule-grid">
            {universalRules.map((rule) => <article className="rule-card" key={rule.kicker}><p>{rule.kicker}</p><h3>{rule.title}</h3><span>{rule.text}</span></article>)}
          </div>
        </section>

        <section className="merchant-directory-section" id="merchants">
          <div className="shell">
            <SectionHeading eyebrow="11 // SHOP DIRECTORY" title="Merchant selection and reroll criteria" note="Prefer the narrowest pool containing multiple acceptable outcomes. Current reroll prices are included where stable." />
            <div className="merchant-visual">
              <img src="./merchant-pool-lab.png" alt="Original illustration of a galactic merchant counter organized into colored inventory pools" width="1918" height="820" loading="lazy" />
              <div className="merchant-visual-copy">
                <p className="mini-label">MERCHANT POOL ANALYSIS</p>
                <h3>Require multiple acceptable outcomes before rerolling.</h3>
                <ol><li>Define the board bottleneck</li><li>Count acceptable hits</li><li>Set the exit condition</li></ol>
              </div>
            </div>
            <div className="directory-intro">
              <p><b>Before Core selection:</b> hedge 3–4 routes with efficient items. Mittel and Ande usually expose the densest early Dooley pieces.</p>
              <p><b>After selection:</b> shop the bottleneck—payoff, speed, or defense—not merely the Core’s keyword.</p>
              <p><b>Before rerolling:</b> name at least two acceptable hits. One exact out is a reason to save.</p>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Merchant</th><th>Stock</th><th>Reroll</th><th>Best for</th><th>The rule</th></tr></thead>
                <tbody>{merchantDirectory.map((merchant) => <tr data-category={merchantCategory(merchant.name)} key={merchant.name}><th>{merchant.name}</th><td data-label="Stock">{merchant.stock}</td><td data-label="Reroll"><span className={`reroll-chip ${rerollTone(merchant.reroll)}`}>{merchant.reroll}</span></td><td data-label="Best for">{merchant.bestFor}</td><td data-label="Rule">{merchant.rule}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="directory-source">Current shop pools cross-checked against the <a href="https://bazaar-builds.net/db/merchants/" target="_blank" rel="noreferrer">Bazaar Local merchant database ↗</a>. Availability and tiers can change in hotfixes.</p>
          </div>
        </section>

        <section className="section shell patch-section" id="patch-notes">
          <SectionHeading eyebrow="12 // PATCH STATUS" title={`Patch ${patchInfo.major} · ${patchInfo.name}`} note={`Live revision ${patchInfo.revision} · reviewed ${patchInfo.reviewedAt}. Each major patch is maintained as a separate strategy snapshot.`} />
          <div className="patch-grid">
            <article className="patch-card patch-card-featured"><span>CURRENT</span><h3>16.1 hotfix state</h3><p>No direct Core balance changes after the Patch 16.0 Core pass. Wallace no longer scales on cooldown.</p><a href={sources.official.href} target="_blank" rel="noreferrer">Read official patch notes ↗</a></article>
            <article className="patch-card"><span>ECONOMY</span><h3>Starting Income is 5</h3><p>Saving through a strong early board matters more. Treat untargeted rerolls as a real cost and prepare a Day 6 target list.</p></article>
            <article className="patch-card"><span>CORE PASS</span><h3>Upgrades matter more</h3><p>Armored, Critical, The, Primal, Weaponized, and Ignition received tier-scaled base values in 16.0.</p></article>
            <article className="patch-card"><span>ARCHIVE</span><h3>Patch 16 strategy snapshot</h3><p>Patch 16 is the first archived major-patch dataset. Major version, live revision, review date, and sources remain separate.</p></article>
          </div>
        </section>

        <section className="sources-section" id="sources">
          <div className="shell sources-grid">
            <div>
              <p className="eyebrow">13 // SOURCES & METHOD</p>
              <h2>Evidence and<br />confidence labels</h2>
              <p>Recommendations combine official balance notes, current card data, and high-ranked community guides. Labels distinguish verified mechanics, expert consensus, and situational builds.</p>
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
