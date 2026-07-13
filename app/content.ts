export type Confidence = "confirmed" | "consensus" | "situational";

export type BuildLine = {
  name: string;
  label: string;
  confidence: Confidence;
  pitch: string;
  enter: string;
  engine: string;
  mustHave: string[];
  flex: string[];
  pivot: string;
};

export type MerchantPick = {
  name: string;
  why: string;
  reroll: string;
  leave: string;
};

export type CoreGuide = {
  id: string;
  name: string;
  shortName: string;
  signal: string;
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tempo: string;
  accent: string;
  mechanic: string;
  summary: string;
  plan: string;
  pickWhen: string[];
  avoidWhen: string[];
  board: { label: string; kind: "trigger" | "core" | "payoff" | "flex"; size: 1 | 2 | 3 }[];
  builds: BuildLine[];
  buy: string[];
  hold: string[];
  skip: string[];
  merchants: MerchantPick[];
  timeline: { phase: string; title: string; text: string }[];
  pivots: string[];
  traps: string[];
  patchChange: string;
  sources: string[];
};

export type ItemTier = "S" | "A" | "B";

export type RankedItem = {
  name: string;
  tier: ItemTier;
  why: string;
};

export type SynergyPackage = {
  name: string;
  grade: ItemTier;
  items: string[];
  plan: string;
  online: string;
  breaks: string;
};

export type CoreDepth = {
  northStar: string;
  bottleneck: string;
  firstBreakpoint: string;
  exitRule: string;
  itemRanks: RankedItem[];
  synergies: SynergyPackage[];
  matchup: {
    favored: string;
    respect: string;
    adapt: string;
  };
};

export type GlobalRankedItem = RankedItem & {
  role: string;
  bestIn: string;
};

export const patchInfo = {
  major: "16",
  revision: "16.1",
  name: "The Invasion Begins",
  reviewedAt: "July 13, 2026",
  status: "Current",
};

export const sources = {
  official: {
    label: "Official Patch 16 / 16.1 notes",
    href: "https://www.playthebazaar.com/patch-notes",
    type: "Official",
  },
  expert: {
    label: "Community Dooley guide by top-ranked players",
    href: "https://docs.google.com/document/d/1UKzxLZasOGVN35ZNVOhOkwlF7srABux7fLDjM5vs3gU/edit?usp=drivesdk",
    type: "Expert guide",
  },
  launcherExpert: {
    label: "Launcher Core specialist guide",
    href: "https://docs.google.com/document/d/1K7TbxFkJLBZv0Ljn2f7a7vrKUIu8wus-dLCF22FqpwI/edit?usp=sharing",
    type: "Expert guide",
  },
  meta: {
    label: "Season 16 meta build roundup",
    href: "https://mobalytics.gg/the-bazaar/guides/meta-builds",
    type: "Meta reference",
  },
  overview: {
    label: "Dooley overview",
    href: "https://mobalytics.gg/the-bazaar/dooley-guide",
    type: "Guide reference",
  },
  bazaarDb: {
    label: "BazaarDB current card data",
    href: "https://bazaardb.gg/",
    type: "Card database",
  },
  itemTier: {
    label: "Season 16 expert Dooley item tier list",
    href: "https://unduel.com/u/bazaardb/dooley-items-the-bazaar-2sREbzTKaJdlKLskUoeiMW/tier-list/experts",
    type: "Expert tier list",
  },
  patchDb: {
    label: "BazaarDB Patch 16.1 hotfix tracker",
    href: "https://sin.bazaardb.gg/patchnotes/16.1-jul8",
    type: "Patch database",
  },
} as const;

export const cores: CoreGuide[] = [
  {
    id: "the-core",
    name: "The Core",
    shortName: "Charge",
    signal: "CHG",
    role: "Flexible charge engine",
    difficulty: "Medium",
    tempo: "Smooth curve",
    accent: "cyan",
    mechanic:
      "6 / 5 / 4 sec · Deal 40 / 80 / 160. On use, Charge every item to the right 1 sec. Any item used on the left Charges The Core 1 sec.",
    summary:
      "The generalist. It converts fast left-side triggers into more casts from one premium right-side carry. The Core is an engine, not a reason to keep five mediocre items.",
    plan:
      "Stabilize with efficient items, then compress the board into fast triggers → Core → one real payoff. Upgrade the payoff before polishing utility slots.",
    pickWhen: [
      "You already have a real carry or high-base-stat item worth charging.",
      "Your opener has fast Haste, Remote, or naturally short cooldowns.",
      "You want a flexible pick while the final damage type is still unknown.",
    ],
    avoidWhen: [
      "Your board has no payoff—charging weak items only loses more efficiently.",
      "Your best items need awkward positioning on the left of the Core.",
    ],
    board: [
      { label: "FAST", kind: "trigger", size: 1 },
      { label: "HASTE", kind: "trigger", size: 1 },
      { label: "THE CORE", kind: "core", size: 2 },
      { label: "CARRY", kind: "payoff", size: 2 },
      { label: "FLEX", kind: "flex", size: 1 },
    ],
    builds: [
      {
        name: "Power Drill / RAMPage",
        label: "Reliable",
        confidence: "consensus",
        pitch: "Fast charge shell that turns one scalable weapon into repeated pressure.",
        enter: "Power Drill or RAMPage arrives with at least two cheap, fast left-side triggers.",
        engine: "Fast items feed The Core; The Core accelerates the carry and its support.",
        mustHave: ["Power Drill or RAMPage", "2+ fast triggers", "Haste or cooldown reduction"],
        flex: ["Remote", "defense", "Slow / Freeze", "a second premium payoff"],
        pivot: "If the carry is still Bronze or under-scaled by Day 7, keep the shell and replace the payoff.",
      },
      {
        name: "Single-carry charger",
        label: "Flexible",
        confidence: "confirmed",
        pitch: "The default shape: fewer items, better casts, clean positioning.",
        enter: "Any strong Medium or Large carry plus two reliable activators.",
        engine: "Left-side activations cycle Core; Core and Haste cycle the right-side carry.",
        mustHave: ["one upgraded carry", "clean trigger chain", "survivability"],
        flex: ["Weakpoint Detector", "Metronome", "utility Friend", "anti-heal"],
        pivot: "Bench The Core if a late legendary package is already self-sustaining without it.",
      },
      {
        name: "Dooltron handoff",
        label: "High ceiling",
        confidence: "situational",
        pitch: "Use The Core to reach the late game, then let Dooltron become the real board.",
        enter: "You have economy, mixed useful tags, and enough tempo to shop Large-item merchants.",
        engine: "Compact support package amplifies Dooltron instead of preserving early filler.",
        mustHave: ["Dooltron", "relevant tag density", "one defensive answer"],
        flex: ["Burn", "Shield", "Friend", "Crit support"],
        pivot: "Do not hold dead pieces for a Dooltron that has not appeared by late Day 8.",
      },
    ],
    buy: ["Remote or premium Haste", "Power Drill / RAMPage", "one upgraded carry", "clean disruption"],
    hold: ["short-cooldown triggers", "Weakpoint Detector", "a defensive piece for poison or burst"],
    skip: ["slow filler with no scaling", "multiple competing carries", "upgrades that do not improve the engine"],
    merchants: [
      {
        name: "Tok’s Clocks",
        why: "Best way to tighten the whole loop: Haste, Slow, and cooldown reduction all improve your trigger economy.",
        reroll: "Reroll with 3g when you have the carry and need speed, especially before a key fight.",
        leave: "Leave if your actual problem is damage scaling, not cast frequency.",
      },
      {
        name: "Mittel",
        why: "Medium items contain many of Dooley’s clean engines and payoffs; the narrow size pool makes the shop readable.",
        reroll: "Reroll at 2g when two or more Medium hits materially improve the board.",
        leave: "Leave once you are only fishing for one exact item.",
      },
      {
        name: "Aila",
        why: "Weapon-only stock is the fastest route to a real right-side carry when the shell is ready but harmless.",
        reroll: "Reroll if several weapons are upgrades or scaling outlets.",
        leave: "Skip when your carry is already solved or your line is non-weapon.",
      },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Find output first", text: "Take efficient tempo and one item worth accelerating. Do not draft a board of only chargers." },
      { phase: "Days 4–6", title: "Set activation order", text: "Place fast triggers left, The Core centrally, and the primary payoff right. Remove items that delay this sequence." },
      { phase: "Days 7+", title: "Compress", text: "Upgrade one win condition, add disruption, and judge the Core by casts created—not sentiment." },
    ],
    pivots: ["A self-looping legendary can replace the Core.", "A stronger Large carry can inherit the entire charger shell."],
    traps: ["Treating Core damage as the win condition.", "Keeping too many small triggers after a better compact engine appears.", "Spending all gold before Day 6’s stronger shops."],
    patchChange: "Patch 16 changed its Damage from 50 / 100 / 200 to 40 / 80 / 160; its charge identity is unchanged.",
    sources: ["official", "expert", "bazaarDb"],
  },
  {
    id: "launcher-core",
    name: "Launcher Core",
    shortName: "Launcher",
    signal: "FLY",
    role: "Flying loop engine",
    difficulty: "Hard",
    tempo: "Late ceiling",
    accent: "violet",
    mechanic:
      "6 sec at every tier · At fight start, 2 / 3 / 4 other items start Flying. On use, Charge other Flying items 1 sec. Another Friend or Flying item use Charges Launcher Core 1 sec.",
    summary:
      "Launcher requires multiple Flying or Friend activations. Its output increases substantially when Launcher and its payoffs charge one another repeatedly; isolated Flying items are insufficient.",
    plan:
      "Survive the weak assembly phase, reduce the number of items that need Flying, then close a loop where Launcher and its payoffs repeatedly charge each other.",
    pickWhen: [
      "Your non-Core opener already wins fights or contains a premium multicast item.",
      "You have Levitation Pad, a strong Friend, or another reliable Flying enabler.",
      "You can afford a slower setup and understand which casts feed the loop.",
    ],
    avoidWhen: [
      "Your board is already behind and needs immediate damage from the Core choice.",
      "You need five separate low-impact items to become Flying before anything works.",
    ],
    board: [
      { label: "FRIEND", kind: "trigger", size: 1 },
      { label: "FLY", kind: "trigger", size: 2 },
      { label: "LAUNCHER", kind: "core", size: 2 },
      { label: "PAYOFF", kind: "payoff", size: 2 },
    ],
    builds: [
      {
        name: "Ice 9000 loop",
        label: "Meta line",
        confidence: "consensus",
        pitch: "Flight charging turns repeated Ice 9000 casts into damage plus fight control.",
        enter: "Ice 9000 plus enough Flying coverage to make every important cooldown participate.",
        engine: "Flying item casts → Launcher charge → all Flying items charge → repeat.",
        mustHave: ["Ice 9000", "broad Flying coverage", "Launcher cooldown help"],
        flex: ["Levitation Pad", "Friend trigger", "Shield", "additional Freeze"],
        pivot: "If Ice 9000 is late or unupgraded, transfer the loop to the best multicast payoff you own.",
      },
      {
        name: "Nitrogen Hammer / Terry-dactyl",
        label: "Flexible",
        confidence: "consensus",
        pitch: "A compact bonk package needs fewer flight targets and rewards repeated large hits.",
        enter: "A strong Hammer or Terry-dactyl appears while your flight engine is mostly online.",
        engine: "Launcher compresses the cooldown; one large payoff carries the damage burden.",
        mustHave: ["Hammer or Terry-dactyl", "Flying access", "defense to reach repeat casts"],
        flex: ["Crit", "Slow", "Shield", "a second Friend"],
        pivot: "If you cannot survive until cast two, drop greed for Shield or Freeze immediately.",
      },
      {
        name: "Harmadillo flight loop",
        label: "High-roll",
        confidence: "situational",
        pitch: "A defensive loop that turns frequent Shield events into damage and more charging.",
        enter: "Harmadillo and a credible Shield package arrive before you have committed to pure damage.",
        engine: "Flying Shield casts feed Launcher; Shield triggers Harmadillo; the loop snowballs.",
        mustHave: ["Harmadillo", "repeatable Shield", "Flying coverage"],
        flex: ["Duct Tape", "Freeze", "Kevlar", "cooldown reduction"],
        pivot: "Abandon if poison-heavy matchups bypass your defense or Harmadillo damage never catches up.",
      },
    ],
    buy: ["Levitation Pad", "Ice 9000", "strong multicast items", "Launcher cooldown reduction"],
    hold: ["compact Friends", "Harmadillo package", "one survival item while the loop assembles"],
    skip: ["five-piece flight tax", "slow single-cast filler", "payoffs that do not feed Launcher back"],
    merchants: [
      {
        name: "Pinfeather",
        why: "The only shop whose pool directly solves the line’s gating keyword: Flying.",
        reroll: "Reroll when two or more Flying hits expand the loop or you need a clean enabler.",
        leave: "Leave when flight coverage is complete; more Flying text is not automatically more power.",
      },
      {
        name: "Tok’s Clocks",
        why: "Cooldown reduction makes Launcher reach the self-sustaining part of the loop sooner; Haste and Slow buy time too.",
        reroll: "Reroll with an assembled engine that is one speed upgrade short.",
        leave: "Skip if you lack a payoff—the loop needs something worth looping.",
      },
      {
        name: "Tinker",
        why: "Friends naturally charge Launcher and can provide compact utility, economy, or an additional payoff.",
        reroll: "Reroll when several Friends fit and your Flying count is already healthy.",
        leave: "Leave if adding a Friend breaks flight coverage or board compression.",
      },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Stabilize without Launcher", text: "Prioritize an independently functional opener. Launcher requires additional setup, so early losses reduce the gold and health available for the transition." },
      { phase: "Days 4–6", title: "Close the circuit", text: "Count exactly which items fly and which casts feed back. Aim to carry roughly 30g into Day 6 when tempo allows." },
      { phase: "Days 7+", title: "Test the loop", text: "Watch the first fight cycle. Fix the one stalled edge with speed, flight, or defense—do not replace everything." },
    ],
    pivots: ["Any premium multicast payoff can inherit the flight engine.", "A failed loop can become a compact Friend or Shield board."],
    traps: ["Assuming ‘starts Flying’ covers the whole board at low tier.", "Buying low-quality Flying items after coverage is solved.", "No defense against an opponent who wins before the loop starts."],
    patchChange: "No direct Core change in 16.0 or 16.1. It remains a current specialist route and appears in Season 16 meta lines.",
    sources: ["launcherExpert", "expert", "meta", "bazaarDb"],
  },
  {
    id: "armored-core",
    name: "Armored Core",
    shortName: "Armored",
    signal: "SHD",
    role: "Shield stall + payoff",
    difficulty: "Medium",
    tempo: "Safe early",
    accent: "blue",
    mechanic:
      "7 / 6 / 5 sec · Shield 40 / 80 / 160. On use, it and Shield items to the right gain 15 / 30 / 60 Shield for the fight. Left-side item uses Charge it 1 sec.",
    summary:
      "A defensive engine that needs a conversion plan. It buys time extremely well; Harmadillo, Force Field, or another payoff must turn that time and Shield into a win.",
    plan:
      "Build enough repeatable Shield to survive, then add a payoff that converts Shield into damage. Against poison, race or pivot—more Shield is not the answer.",
    pickWhen: [
      "Duct Tape, Harmadillo, Force Field, or a credible Shield payoff is already visible.",
      "Your opener has damage but needs time to scale or repeat casts.",
      "You have fast left-side triggers that can cycle the Core.",
    ],
    avoidWhen: ["You are drafting pure Shield with no way to end fights.", "The lobby’s threats mostly bypass Shield or scale faster than you."],
    board: [
      { label: "FAST", kind: "trigger", size: 1 },
      { label: "ARMORED", kind: "core", size: 2 },
      { label: "DUCT TAPE", kind: "payoff", size: 1 },
      { label: "SHIELD PAYOFF", kind: "payoff", size: 3 },
    ],
    builds: [
      {
        name: "Harmadillo cycle",
        label: "Reliable",
        confidence: "consensus",
        pitch: "Every repeatable Shield event contributes to offense.",
        enter: "Harmadillo plus at least two repeatable Shield sources or a Duct Tape chain.",
        engine: "Triggers cycle Core; Core scales Shield; Shield events fire Harmadillo.",
        mustHave: ["Harmadillo", "repeatable Shield", "fast Core activators"],
        flex: ["Duct Tape", "Freeze", "Health", "anti-poison race damage"],
        pivot: "If Harmadillo remains your only damage and cannot scale, replace it with a larger conversion payoff.",
      },
      {
        name: "Force Field burst",
        label: "Flexible",
        confidence: "consensus",
        pitch: "Bank a large Shield total, then cash it into a decisive hit.",
        enter: "Force Field arrives with enough Shield generation to threaten a kill on cast.",
        engine: "Core scales and accelerates Shield; Force Field converts the stored total.",
        mustHave: ["Force Field", "large repeatable Shield", "time to cast"],
        flex: ["cooldown reduction", "Crit", "Slow", "Duct Tape"],
        pivot: "If poison invalidates the banked Shield, shorten the fight with a faster weapon line.",
      },
      {
        name: "Angry Balloon Bot",
        label: "High-roll",
        confidence: "situational",
        pitch: "Turns a defensive shell into escalating pressure when the right support appears.",
        enter: "Balloon Bot is upgraded and the board can trigger Shield frequently without dead slots.",
        engine: "Dense Shield triggers both sustain and offensive scaling.",
        mustHave: ["Angry Balloon Bot", "fast Shield engine", "board-space discipline"],
        flex: ["Friend support", "Haste", "Harmadillo", "Freeze"],
        pivot: "Sell the package if it consumes slots but still cannot threaten late boards.",
      },
    ],
    buy: ["Duct Tape", "Harmadillo", "Force Field", "fast Shield sources"],
    hold: ["Health scaling", "one damage converter", "Freeze / Slow for extra cycles"],
    skip: ["Shield-only upgrades with no matchup value", "slow redundant Shield", "greedy defense into poison"],
    merchants: [
      { name: "Ande", why: "Small-item filtering gives the best early access to Duct Tape and fast triggers—the pieces that make Shield repeat.", reroll: "Reroll at 2g when Tape plus several compact triggers are still live hits.", leave: "Leave when the board needs a damage converter rather than more small support." },
      { name: "Mittel", why: "Mech Moles, Harmadillo-style bridges, and many clean Shield engines sit in the Medium pool.", reroll: "Reroll if at least two Medium outcomes improve the board.", leave: "Do not chase one exact Medium after the useful pool has narrowed." },
      { name: "Kev’s Armory", why: "Focused Health and Shield stock improves the late defensive layer and exposes premium conversion pieces.", reroll: "Reroll when several Shield upgrades or payoffs remain live.", leave: "Leave once defense is adequate and damage is the real bottleneck." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Pair defense with teeth", text: "Take efficient Shield, but identify your damage conversion before over-investing." },
      { phase: "Days 4–6", title: "Scale the right side", text: "Position repeatable Shield right of Core and fast activators left. Upgrade the conversion payoff." },
      { phase: "Days 7+", title: "Matchup check", text: "Add disruption versus burst; race poison. Bench Armored Core if the late package no longer needs it." },
    ],
    pivots: ["Coreless Force Field can preserve Shield investment.", "Launcher can inherit a Harmadillo shell if Flying appears."],
    traps: ["Calling survival a win condition.", "Placing the best Shield item left of Core.", "Responding to poison by buying even more Shield."],
    patchChange: "Patch 16 raised base Shield from a flat 20 to 40 / 80 / 160, making Core upgrades much more meaningful.",
    sources: ["official", "expert", "bazaarDb"],
  },
  {
    id: "companion-core",
    name: "Companion Core",
    shortName: "Companion",
    signal: "FRN",
    role: "Friend tempo + economy",
    difficulty: "Medium",
    tempo: "Early / mid",
    accent: "green",
    mechanic:
      "6 / 5 / 4 sec · Haste adjacent items for 2 / 3 / 4 sec. Using another Friend Charges Companion Core 1 sec.",
    summary:
      "A Friend engine with excellent tempo and economy. Its adjacency is precious: put the Core between the two items that most deserve repeated Haste, not simply between two Friends.",
    plan:
      "Use Friend synergies to win and save early, then upgrade the best carry Friend or transition into a premium Friend board. Companion Core is allowed to be replaced.",
    pickWhen: ["Brick Buddy or another real Friend carry is already present.", "You have multiple useful Friends, not merely Friend tags.", "Your opener can turn early tempo into a strong Day 6 economy."],
    avoidWhen: ["The available Friends are all support with no payoff.", "Your two best items cannot both benefit from adjacent Haste."],
    board: [
      { label: "CARRY FRIEND", kind: "payoff", size: 2 },
      { label: "COMPANION", kind: "core", size: 2 },
      { label: "BEST TARGET", kind: "payoff", size: 2 },
      { label: "FLEX", kind: "flex", size: 1 },
    ],
    builds: [
      { name: "DJ friend tempo", label: "Reliable", confidence: "consensus", pitch: "A compact Haste loop that carries the middle game and funds the late board.", enter: "DJ Circuit Breaker or Brick Buddy plus two useful Friend activations.", engine: "Friends charge Companion; Companion hastes the two best adjacent outputs.", mustHave: ["DJ Circuit Breaker or carry Friend", "2+ useful Friends", "adjacency discipline"], flex: ["Sat-Comm", "Brick Buddy", "Shield Friend", "Slow"], pivot: "DJ Circuit Breaker can replace the Core when its own loop becomes stronger." },
      { name: "Dooltron / Robotic Factory", label: "Late handoff", confidence: "consensus", pitch: "Early Friend economy becomes a premium wide late-game board.", enter: "You are healthy, rich, and can shop for Large Friend payoffs.", engine: "Friend density and Haste amplify a Large payoff rather than early filler.", mustHave: ["Dooltron or Robotic Factory", "economy", "useful tag density"], flex: ["Wallace", "Miss Isles", "utility Friends", "defense"], pivot: "Do not hold a weak board waiting for a legendary; buy the strongest live upgrade." },
      { name: "Miss Isles burst", label: "High-roll", confidence: "situational", pitch: "Friend triggers support a compact high-damage, often crit-enabled finisher.", enter: "Miss Isles is upgraded and your support pieces accelerate its first two casts.", engine: "Friends cycle Core; Core Haste and support compress the carry cooldown.", mustHave: ["Miss Isles", "Haste", "Crit or damage scaling"], flex: ["DJ Circuit Breaker", "Sat-Comm", "Freeze", "Shield"], pivot: "If the burst misses lethal, add control or move to a broader Factory board." },
    ],
    buy: ["DJ Circuit Breaker", "Brick Buddy", "Sat-Comm", "premium carry Friends"],
    hold: ["compact utility Friends", "Haste for both adjacent slots", "economy pieces while they pay"],
    skip: ["Friends with no current role", "keeping economy pieces after they cost fights", "forcing five Friends over a better board"],
    merchants: [
      { name: "Tinker", why: "Friend-only stock is the most direct way to improve both the Core’s charge rate and its payoffs.", reroll: "Reroll when at least three Friends or upgrades help, especially before the board is locked.", leave: "Leave when only one legendary Friend would matter." },
      { name: "Tok’s Clocks", why: "Haste and cooldown reduction sharpen DJ Circuit Breaker and other Friend loops; Slow buys repeat casts.", reroll: "Reroll when your Friend quality is solved but the engine is slow.", leave: "Skip if you still lack a carry Friend." },
      { name: "Kina", why: "Non-weapon filtering finds support Friends and utility while avoiding irrelevant weapon stock.", reroll: "Reroll at 2g while multiple non-weapon Friend or support hits remain.", leave: "Leave when the missing payoff is specifically a weapon." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Tempo and save", text: "Use strong Friends, keep Sat-Comm only while it earns its slot, and preserve health." },
      { phase: "Days 4–6", title: "Choose the carry", text: "Decide whether DJ/Brick remains the plan or whether your gold should shop a premium Friend. Strong runs can carry 35–40g into Day 6." },
      { phase: "Days 7+", title: "Replace early components", text: "Replace economy pieces and even Companion Core when Dooltron, Factory, or a self-contained loop produces more value." },
    ],
    pivots: ["DJ Circuit Breaker can become the engine without Companion Core.", "Friend economy can fund any strong Large-item pivot."],
    traps: ["Buying every Friend.", "Wasting one adjacency on a low-impact item.", "Keeping Sat-Comm after its economy no longer repays lost combat power."],
    patchChange: "No direct Core change in Patch 16. Its strength still depends heavily on the current Friend pool and your adjacency.",
    sources: ["expert", "overview", "bazaarDb"],
  },
  {
    id: "critical-core",
    name: "Critical Core",
    shortName: "Critical",
    signal: "CRT",
    role: "Burst + crit loop",
    difficulty: "Hard",
    tempo: "Fast fights",
    accent: "pink",
    mechanic:
      "7 / 6 / 5 sec · Deal 40 / 80 / 160. It and items to the right gain +30 / 45 / 60% Crit. Any Crit or left-side item use Charges it 1 sec.",
    summary:
      "A burst engine with a feedback loop: crits charge the Core, which grants more crit to the right side. It supplies consistency, not enough damage scaling by itself.",
    plan:
      "Put real damage to the right, reach reliable crit, and end the fight before slower scaling boards take over. Every slot should improve the first kill cycle.",
    pickWhen: ["You already have Uzi, SMG, Pulse Rifle, or another credible burst weapon.", "A weapon skill or early damage scaling gives the crits something meaningful to multiply.", "You can place your main damage to the right without breaking its engine."],
    avoidWhen: ["Your weapons have low base damage and no scaling.", "You are hoping Crit Chance alone will become a win condition."],
    board: [
      { label: "FAST / CRIT", kind: "trigger", size: 1 },
      { label: "CRITICAL", kind: "core", size: 2 },
      { label: "WEAPON", kind: "payoff", size: 2 },
      { label: "WEAPON", kind: "payoff", size: 2 },
    ],
    builds: [
      { name: "Pulse burst", label: "Reliable", confidence: "consensus", pitch: "High-quality weapons immediately benefit from the Core’s right-side Crit increase.", enter: "Pulse Rifle plus Uzi/SMG or another fast weapon with real damage.", engine: "Fast left casts and early crits charge Core; Core boosts the right-side volley.", mustHave: ["Pulse Rifle or premium weapon", "damage scaling", "reliable crit"], flex: ["Uzi", "SMG", "Memory Card", "Freeze"], pivot: "If damage remains low, transfer the crit shell to a stronger carry instead of adding another weak gun." },
      { name: "Mech Moles / Metronome", label: "Flexible", confidence: "consensus", pitch: "Dense activations feed the crit-charge loop while utility buys a second volley.", enter: "Mech Moles or Metronome arrives with two upgraded weapons.", engine: "Frequent uses and crits cycle Core; Core makes the next sequence more reliable.", mustHave: ["activation engine", "2 meaningful weapons", "crit payoff"], flex: ["Slow", "Haste", "Shield", "Memory Card"], pivot: "Drop the activation package if it occupies more slots than the casts it creates." },
      { name: "Alpha Ray scaling", label: "High-roll", confidence: "situational", pitch: "External damage scaling compensates for the Core’s low base damage and increases output across repeated Crit cycles.", enter: "Alpha Ray or Improvised Weaponry appears early enough to scale real weapons.", engine: "Damage scaling increases base output; the Crit multiplier and charge loop increase subsequent-cycle output.", mustHave: ["damage scaler", "fast weapon", "Crit Core positioning"], flex: ["Memory Card", "Super Syrup", "Slow", "additional burst"], pivot: "If the scaler is late, favor a naturally high-base-damage carry instead." },
    ],
    buy: ["high-base-damage weapons", "Uzi / SMG", "damage scaling", "Crit up to reliability"],
    hold: ["Memory Card", "Metronome", "one control piece that guarantees volley two"],
    skip: ["crit beyond what the board needs", "low-damage multihit filler", "slow defense that does not preserve burst timing"],
    merchants: [
      { name: "Aila", why: "Weapons are both the trigger and payoff; weapon-only stock gives the best chance to upgrade burst quality.", reroll: "Reroll at 2g while several weapons, not one exact gun, improve the line.", leave: "Leave if the board already has enough weapons and needs scaling or control." },
      { name: "Aimbot", why: "Crit stock closes consistency gaps and can free item slots once the board reaches reliable crit.", reroll: "Reroll when one Crit upgrade unlocks 100% on the important items.", leave: "Do not buy decorative overcap crit while damage is low." },
      { name: "Tok’s Clocks", why: "Haste compresses the first kill cycle; Slow or Freeze-like timing can guarantee a second volley.", reroll: "Reroll when damage is adequate but the opponent acts first.", leave: "Skip if you still need a real weapon or damage scaler." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Find base damage", text: "Draft weapons that already win fights. Crit multiplies a number; it does not create one." },
      { phase: "Days 4–6", title: "Reach consistency", text: "Arrange the right side, upgrade damage, then add only enough Crit to make the burst dependable." },
      { phase: "Days 7+", title: "Race the lobby", text: "Add control for the second volley or pivot to a larger carry before scaling boards outgrow you." },
    ],
    pivots: ["The crit package can support nearly any premium weapon carry.", "A self-scaling Coreless weapon board may outperform the feedback loop."],
    traps: ["Stacking Crit Chance while base damage stays tiny.", "Putting a utility item in the Core’s premium right-side slot.", "Building for long fights without long-fight scaling."],
    patchChange: "Patch 16 changed base Damage from a flat 50 to 40 / 80 / 160. Core upgrades now add much more direct burst.",
    sources: ["official", "expert", "bazaarDb"],
  },
  {
    id: "ignition-core",
    name: "Ignition Core",
    shortName: "Ignition",
    signal: "BRN",
    role: "Burn tempo",
    difficulty: "Easy",
    tempo: "Early spike",
    accent: "orange",
    mechanic:
      "8 / 6 / 5 sec · Burn 4 / 8 / 12. On use, it and Burn items to the right gain 2 / 4 / 8 Burn for the fight. Left-side item uses Charge it 1 sec.",
    summary:
      "The clearest tempo Core: frequent early Burn wins fights while its right-side scaling keeps later casts relevant. You still need speed—an eight-second Silver Core cannot be your opener.",
    plan:
      "Win early with cheap Burn and Blast Doors, save aggressively, then spend on Day 6 for a premium Burn carry or clean one-shot pivot before enemy sustain catches up.",
    pickWhen: ["Soldering Gun, Rocket Launcher, Flint Stones, or Blast Doors is already doing work.", "You have Haste or fast left-side triggers.", "You can convert early wins into a large Day 6 shopping budget."],
    avoidWhen: ["Your Burn items are all slow and you have no Haste.", "You are already losing to sustain and lack a faster late payoff."],
    board: [
      { label: "FAST", kind: "trigger", size: 1 },
      { label: "HASTE", kind: "trigger", size: 1 },
      { label: "IGNITION", kind: "core", size: 2 },
      { label: "MULTI BURN", kind: "payoff", size: 2 },
      { label: "DEF", kind: "flex", size: 1 },
    ],
    builds: [
      { name: "Rocket + Soldering", label: "Reliable", confidence: "consensus", pitch: "Multicast Burn turns every Core cycle into a larger stack and strong early tempo.", enter: "Rocket Launcher or Soldering Gun plus a fast trigger or Haste item.", engine: "Left triggers cycle Ignition; Core scales the right-side multicast Burn carry.", mustHave: ["Rocket Launcher or Soldering Gun", "Haste", "fast Core activators"], flex: ["Blast Doors", "Flint Stones", "Levitation Pad", "control"], pivot: "If the carry is not upgraded by Day 7, shop a larger Burn payoff or one-shot pivot." },
      { name: "Flamethrower carry", label: "Flexible", confidence: "consensus", pitch: "A premium Burn outlet preserves the early scaling shell while improving late damage density.", enter: "Flamethrower appears and the board can accelerate its first cast.", engine: "Ignition and support stack Burn value; Haste compresses Flamethrower’s kill timer.", mustHave: ["Flamethrower", "Haste / CDR", "one survival tool"], flex: ["Thermal Lance", "Metronome", "Freeze", "Shield"], pivot: "Do not keep every early Burn item—condense around the upgraded carry." },
      { name: "Burn into Boulder", label: "Exit line", confidence: "situational", pitch: "Use Burn tempo and economy to fund a faster late one-shot when sustain invalidates damage-over-time.", enter: "The lobby is out-healing Burn and a Boulder or Soul of the District package becomes available.", engine: "Early wins preserve health and gold; late payoff replaces the damage plan, not the whole support shell.", mustHave: ["premium one-shot payoff", "enough scaling", "clean transition timing"], flex: ["Haste", "Crit", "control", "one Burn utility item"], pivot: "Stay Burn if the pivot is under-scaled; a higher-rarity item is not an upgrade unless it improves expected damage or activation timing." },
    ],
    buy: ["Soldering Gun / Rocket Launcher", "Blast Doors", "Haste", "premium Burn skill or carry"],
    hold: ["Flint Stones", "Power Sander / Levitation Pad", "one defensive answer"],
    skip: ["slow Burn with no acceleration", "too many redundant burners", "tiny Burn upgrades after a late pivot is required"],
    merchants: [
      { name: "Orion", why: "Tool-only stock concentrates Soldering Gun, Power Sander, Flint Stones, and Thermal-style hits that support Burn tempo.", reroll: "Reroll when multiple Tools improve the live board—not merely because one Tool says Burn.", leave: "Leave when the board needs a focused Burn payoff, speed, or defense instead." },
      { name: "Tok’s Clocks", why: "Haste and cooldown reduction solve Ignition’s slow baseline; Slow buys time for damage-over-time to matter.", reroll: "Reroll when Burn output is sufficient but starts too late.", leave: "Skip when you still lack a meaningful Burn payoff." },
      { name: "Hef", why: "The focused Burn pool is the cleanest way to upgrade Ignition’s payoff after the early Tool shell is assembled.", reroll: "Reroll when multiple Burn upgrades or finishers are live—not when speed is the missing piece.", leave: "Leave when the stack is large enough and cooldown or survival is the bottleneck." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Preserve tempo and economy", text: "Cheap Burn plus Blast Doors can stabilize the opener. Use Small-item shops selectively and continue saving for Day 6." },
      { phase: "Days 4–6", title: "Use a target list", text: "Enter Day 6 with reserves, then buy only Burn, Haste, or carry upgrades that improve the selected build." },
      { phase: "Days 7+", title: "Measure kill time", text: "If sustain outruns your stack, compress into Flamethrower or pivot to a one-shot package." },
    ],
    pivots: ["Flamethrower inherits Burn scaling.", "Boulder or Soul of the District can convert early economy into late burst."],
    traps: ["Buying more Burn when the actual problem is cooldown.", "Keeping weak early burners around a premium carry.", "Failing to bank gold after an easy early board."],
    patchChange: "Patch 16 changed the Core’s Burn from a flat 4 to 4 / 8 / 12, sharply increasing the value of upgrades.",
    sources: ["official", "expert", "bazaarDb"],
  },
  {
    id: "primal-core",
    name: "Primal Core",
    shortName: "Primal",
    signal: "RLC",
    role: "Relic / Dinosaur tempo",
    difficulty: "Hard",
    tempo: "Early economy",
    accent: "lime",
    mechanic:
      "7 / 6 / 5 sec · Deal 40 / 80 / 160. On use, Dinosaur and Relic Weapons gain 10 / 20 / 40 Damage for the fight. Adjacent items count as Relics; other Dinosaur or Relic uses Charge it 1 sec.",
    summary:
      "An adjacency puzzle with a strong small-item opening. It makes two neighboring items into Relics, so you can loop premium non-Relics—but late boards often keep the scaled carry and bench the Core.",
    plan:
      "Exploit Flint Stones and efficient Tools for early wins and economy, upgrade the best payoff, then transition to Dooltron, Flamethrower, Press, or another premium carry.",
    pickWhen: ["Flint Stones plus Power Drill, Power Sander, Soldering Gun, Plasma Grenade, or SMG is already strong.", "Two important adjacent items can exploit the Relic tag.", "You are comfortable planning an intentional late pivot."],
    avoidWhen: ["Your best items cannot sit adjacent to the Core.", "You are treating the Core’s own hit as enough late-game damage."],
    board: [
      { label: "RELIC", kind: "trigger", size: 1 },
      { label: "PAYOFF + RELIC", kind: "payoff", size: 2 },
      { label: "PRIMAL", kind: "core", size: 2 },
      { label: "PAYOFF + RELIC", kind: "payoff", size: 2 },
    ],
    builds: [
      { name: "Flint tool tempo", label: "Reliable", confidence: "consensus", pitch: "Cheap Tools and Flint Stones produce early combat power without expensive shopping.", enter: "Flint Stones plus two useful Tools or small weapons.", engine: "Relic-tagged activations charge Primal; Primal scales the weapon package.", mustHave: ["Flint Stones", "Power Drill / Sander / Soldering", "good adjacency"], flex: ["Plasma Grenade", "SMG", "utility Tool", "Shield"], pivot: "Sell weak Tools after they stop winning fights; preserve only real support for the late carry." },
      { name: "Dooltron handoff", label: "Flexible", confidence: "consensus", pitch: "Early item efficiency and free nodes fund a tag-dense late finisher.", enter: "You are ahead on gold and can visit Large-item merchants without sacrificing immediate survival.", engine: "The Primal shell supplies useful tags and triggers until Dooltron becomes the board.", mustHave: ["Dooltron", "economy", "several relevant item tags"], flex: ["Flint Stones", "Friend", "Burn", "Shield"], pivot: "Do not sacrifice Day 7 tempo to hold dead tags for an unseen Dooltron." },
      { name: "Press / Flamethrower", label: "Late carry", confidence: "situational", pitch: "A premium carry replaces the early weapon pile while keeping the best speed and scaling tools.", enter: "Press or Flamethrower is upgraded and the current board has stopped converting Core scaling into wins.", engine: "Compact support and saved economy accelerate a denser late payoff.", mustHave: ["premium carry", "Haste / CDR", "clean damage scaling"], flex: ["Crit", "Freeze", "one surviving Tool", "defense"], pivot: "If the premium item is not upgraded, retain the winning early shell one fight longer." },
    ],
    buy: ["Flint Stones", "Power Drill", "Soldering Gun / Power Sander", "premium late carry"],
    hold: ["Plasma Grenade", "SMG / Uzi", "utility Tools that keep earning a slot"],
    skip: ["Relics that are only tags", "low-impact adjacent items", "upgrades to filler after the late carry appears"],
    merchants: [
      { name: "Ande", why: "Small-item filtering cheaply finds Flint Stones, compact Tools, and early activators.", reroll: "Reroll at 2g while multiple small pieces or upgrades keep the tempo line alive.", leave: "Leave when your late board needs density, not another small card." },
      { name: "Orion", why: "Tool-only filtering is the strongest focused shop for Flint, Sander, Soldering, and Press-style routes.", reroll: "Reroll for 3g when several Tools upgrade the actual shell.", leave: "Skip if you have already transitioned to a non-Tool Large carry." },
      { name: "Pol", why: "Large-item stock is where a successful Primal opener converts its saved economy into a real late carry.", reroll: "Reroll when healthy, rich, and several Large finishers improve the board.", leave: "Do not enter poor or desperate; Large misses are costly." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Build early tempo efficiently", text: "Prioritize Flint and Tools; use free nodes and Curio-style value to build economy." },
      { phase: "Days 4–6", title: "Upgrade the real pieces", text: "A practical upgrade order is Flint, Drill, Grenade, Sander, then Uzi—adjust to your actual damage." },
      { phase: "Days 7+", title: "Late-game transition", text: "Condense into Dooltron, Flamethrower, Press, or another premium carry. Replace Primal Core when the premium carry produces more value without it." },
    ],
    pivots: ["Dooltron converts broad tags into late power.", "Flamethrower or Press can keep the best acceleration while replacing early filler."],
    traps: ["Keeping every Tool because it was good on Day 3.", "Ignoring the two adjacency-granted Relic slots.", "Missing the late transition window while rich."],
    patchChange: "Patch 16 changed base Damage from a flat 30 to 40 / 80 / 160. Upgrade value improved, but the late handoff remains important.",
    sources: ["official", "expert", "bazaarDb"],
  },
  {
    id: "weaponized-core",
    name: "Weaponized Core",
    shortName: "Weaponized",
    signal: "WPN",
    role: "Reliable weapon scaling",
    difficulty: "Easy",
    tempo: "Early / mid",
    accent: "red",
    mechanic:
      "7 / 6 / 5 sec · Deal 40 / 80 / 160. On use, it and Weapons to the right gain 15 / 30 / 60 Damage for the fight. Left-side item uses Charge it 1 sec.",
    summary:
      "The most direct weapon Core: cycle it quickly, scale the weapons on its right, and let repeated casts compound. It is reliable, but late boards still need crit or a premium carry to keep pace.",
    plan:
      "Use SMG or other fast triggers so Weaponized fires before the main carry. Scale one or two efficient weapons, then add crit and disruption instead of a fifth gun.",
    pickWhen: ["Pulse Rifle, Arc Blaster, or another efficient weapon is already online.", "SMG or fast activators can make the Core cast before the carry.", "Your opener needs predictable damage scaling, not a specialized combo."],
    avoidWhen: ["Your weapons fire before the Core and gain scaling too late.", "You have many weapons but no Haste, crit, or survivability."],
    board: [
      { label: "SMG / FAST", kind: "trigger", size: 1 },
      { label: "WEAPONIZED", kind: "core", size: 2 },
      { label: "PULSE", kind: "payoff", size: 2 },
      { label: "ARC / CARRY", kind: "payoff", size: 2 },
    ],
    builds: [
      { name: "Pulse + Arc tech", label: "Reliable", confidence: "consensus", pitch: "Efficient weapons and dense Tech synergy turn every Core cast into real board-wide pressure.", enter: "Pulse Rifle or Arc Blaster plus SMG or another fast left trigger.", engine: "Fast activator cycles Core before right-side weapons fire; subsequent volleys inherit scaling.", mustHave: ["Pulse Rifle / Arc Blaster", "fast pre-Core trigger", "Haste or CDR"], flex: ["Motherboard", "Crit", "Freeze", "Shield"], pivot: "If the weapons are under-upgraded, keep the engine but buy one premium carry." },
      { name: "Flamethrower / Kinetic", label: "Flexible", confidence: "consensus", pitch: "A high-density weapon absorbs Core scaling better than a board of small filler guns.", enter: "Flamethrower, Kinetic Cannon, or a similar premium weapon appears with speed support.", engine: "Core stacks weapon damage while compact triggers and Haste deliver repeat casts.", mustHave: ["premium weapon", "Core-before-carry timing", "Crit for late scaling"], flex: ["SMG", "Remote", "Slow", "defense"], pivot: "Drop low-tier sidearms once the premium weapon can carry alone." },
      { name: "Core carry / Cybersecurity", label: "High-roll", confidence: "situational", pitch: "Extreme Core upgrades or special Tech payoffs make the engine itself a credible damage source.", enter: "Weaponized is upgraded early or Cybersecurity / Combat Core support creates a denser Tech line.", engine: "Repeated Core uses scale both itself and the right-side package.", mustHave: ["upgraded Core", "fast charging", "external crit or damage multiplier"], flex: ["Cybersecurity", "Combat Core", "Motherboard", "control"], pivot: "If Core damage stops threatening kills, return to a premium right-side carry." },
    ],
    buy: ["SMG", "Pulse Rifle / Arc Blaster", "Haste", "Crit for the late game"],
    hold: ["Motherboard", "Remote", "Scrap Metal for a meaningful Core upgrade"],
    skip: ["slow weapons that fire before scaling", "a third weak carry", "pure damage upgrades when control is missing"],
    merchants: [
      { name: "Aila", why: "Weapon-only stock improves both the Core’s scaling targets and the chance of upgrading your actual carry.", reroll: "Reroll at 2g while several weapons or upgrades are live.", leave: "Leave once weapon quality is solved and the board needs speed, crit, or defense." },
      { name: "The Tester", why: "Tech filtering exposes Motherboard, Rays, charge support, and premium Tech payoffs that preserve the weapon engine.", reroll: "Reroll for 3g when several Tech pieces improve timing or carry density.", leave: "Leave when the missing answer is Crit, defense, or one exact non-Tech weapon." },
      { name: "Tok’s Clocks", why: "Haste and cooldown reduction help Weaponized cast before the carry; Slow lets scaling compound.", reroll: "Reroll when weapon quality is high but first-cycle timing is wrong.", leave: "Leave if the board is fast enough and lacks crit or base damage." },
    ],
    timeline: [
      { phase: "Days 1–3", title: "Ensure the Core activates first", text: "Buy efficient weapons, but prioritize a fast activator that makes Core cast first." },
      { phase: "Days 4–6", title: "Scale fewer weapons", text: "Upgrade Pulse/Arc or the best carry, fix Haste, and start adding crit." },
      { phase: "Days 7+", title: "Consolidate the late-game board", text: "Condense around a premium weapon, add control, and use Scrap Metal only when the Core upgrade is material." },
    ],
    pivots: ["Any premium weapon can inherit the scaling shell.", "Combat Core or Cybersecurity can create a more specialized late Tech board."],
    traps: ["Core casting after the carry’s first shot.", "Buying too many weapons instead of upgrading two.", "Entering late fights with no crit or control."],
    patchChange: "Patch 16 changed base Damage from a flat 20 to 40 / 80 / 160, greatly improving upgraded Core damage.",
    sources: ["official", "expert", "bazaarDb"],
  },
];

export const coreDepthById: Record<string, CoreDepth> = {
  "the-core": {
    northStar: "Convert many cheap activations into repeated casts from one premium right-side carry.",
    bottleneck: "The Core supplies actions, not a win condition. A board with no scalable payoff only cycles low-impact items faster.",
    firstBreakpoint: "An upgraded carry plus a Silver 4–5 second Haste source, or a fast left-side trigger that makes the Core act before the carry.",
    exitRule: "Remove The Core when a self-contained legendary package creates more useful actions without paying the support-slot tax.",
    itemRanks: [
      { name: "Power Drill", tier: "S", why: "Patch-defining carry when the board already produces frequent Haste, Slow, Freeze, Poison, or Burn triggers." },
      { name: "RAMPage Module", tier: "S", why: "Turns repeated status applications into adjacent Damage and Burn scaling; the current Drill shell is built around it." },
      { name: "Fiber Optics", tier: "S", why: "Lets the fastest leftmost activation charge the rightmost carry and closes several late charge loops." },
      { name: "Metronome", tier: "S", why: "Links a fast activator to the Core or carry and often solves both first-cast timing and sustained Haste." },
      { name: "SMG", tier: "A", why: "Accessible fast trigger that helps the Core activate before a slower payoff." },
      { name: "Remote Control", tier: "A", why: "Compact acceleration for charge-focused boards; strongest when it improves an already real carry." },
      { name: "Plasma Grenade", tier: "A", why: "Front-loads disruption, supplies status triggers for Drill, and fits several early Core openers." },
      { name: "Dooley's Scarf", tier: "A", why: "Current Drill support that converts Freeze activity into adjacent Haste while protecting key pieces from Freeze." },
      { name: "GPU", tier: "B", why: "Useful on the right at Silver+ when repeated Core charges can maintain Haste; otherwise it costs too much space." },
      { name: "Weakpoint Detector", tier: "B", why: "A midgame weapon scaler when Slow is already frequent; rarely the reason to force a route by itself." },
    ],
    synergies: [
      { name: "RAMPage Drill", grade: "S", items: ["Power Drill", "RAMPage Module", "Fiber Optics", "status engine"], plan: "Place RAMPage between the pieces that most benefit from scaling, then use status density to charge Drill and grow both sides of the module.", online: "Drill receives several status triggers before its first natural cooldown and RAMPage is scaling two relevant items.", breaks: "Unsupported Drill is slow. If statuses are sparse or RAMPage only buffs filler, use a conventional carry instead." },
      { name: "Core timing bridge", grade: "S", items: ["SMG", "Metronome", "The Core", "premium carry"], plan: "Use the fast left side to cycle Core, and tune placement so the right-side carry receives acceleration before its first important cast.", online: "The Core acts before the carry and both repeat at least once inside the expected fight window.", breaks: "Do not add another trigger if it delays the carry or consumes the slot needed for defense or control." },
      { name: "Freeze-control charger", grade: "A", items: ["Dooley's Scarf", "Isochoric Freezer", "Fiber Optics", "carry"], plan: "Freeze buys time, Scarf converts Freeze into Haste, and Fiber turns the fastest edge activation into more carry casts.", online: "Freeze happens early enough to change the opponent's first cycle and the carry remains the rightmost active target.", breaks: "If the control package does not alter startup or the carry is under-upgraded, the board has utility without lethal output." },
      { name: "Dooltron handoff", grade: "A", items: ["Dooltron", "Plasma Grenade", "Power Sander", "compact triggers"], plan: "Use The Core shell to reach Gold items, then replace early filler with status and Friend triggers that activate Dooltron repeatedly.", online: "Dooltron is upgraded and its internal triggers fire often enough that speed or Multicast—not more tags—is the bottleneck.", breaks: "Do not hold dead tags for an unseen Dooltron or preserve The Core after it reduces trigger density." },
    ],
    matchup: { favored: "Slower boards that allow multiple Core-to-carry cycles.", respect: "Immediate burst, heavy Freeze on the carry, and disruption that separates the trigger chain.", adapt: "Use one defensive or control slot, then re-test whether the Core still acts before the primary payoff." },
  },
  "launcher-core": {
    northStar: "Make Launcher and a small number of high-impact Flying items charge one another until the board loops.",
    bottleneck: "Startup. Too many low-impact active items dilute the first Flying targets and delay the loop.",
    firstBreakpoint: "A stable coreless opener, or defense plus a strong Multicast item and Levitation Pad; later, a Flying Launcher with meaningful cooldown reduction.",
    exitRule: "Keep Launcher when it materially closes the loop. Drop it only when a complete carry package already Multicasts and cycles faster without it.",
    itemRanks: [
      { name: "Nitrogen Hammer", tier: "S", why: "The specialist guide's top endpoint: it stabilizes quickly, scales, and caps extremely high with even modest Freeze support." },
      { name: "Ice 9000", tier: "S", why: "Shares most Hammer support, adds control, and is a strong first-hit pivot when it appears before Hammer." },
      { name: "Launch Pad", tier: "S", why: "A win condition available earlier than other endpoints; Flying and Friend activations create dense Burn output." },
      { name: "Fiber Optics", tier: "S", why: "Accelerates the carry at the opposite edge and helps reach the loop breakpoint with fewer low-value triggers." },
      { name: "Party Float", tier: "A", why: "Provides Flying-based Shield and cooldown reduction while supporting nearly every midgame Launcher line." },
      { name: "Cooling Fan", tier: "A", why: "Critical Hammer startup tool and a premium Freeze enabler for the two best control endpoints." },
      { name: "Thrusters", tier: "A", why: "Starts the chosen adjacent item Flying, supplies cooldown reduction, and unlocks the Saddle Multicast package." },
      { name: "Dino Saddle", tier: "A", why: "One of the highest ceilings because it Multicasts a selected Vehicle, but Diamond rarity means it is a cap—not a plan." },
      { name: "Terry-Dactyl", tier: "B", why: "Strong early stabilizer and viable endpoint with Mainframe/Fiber support, but needs Diamond quality to stay late." },
      { name: "Propeller Hat", tier: "B", why: "Efficient midgame coverage and double-Core support; replace it when the board loops without the slot." },
    ],
    synergies: [
      { name: "Nitrogen Hammer freeze loop", grade: "S", items: ["Nitrogen Hammer", "Cooling Fan", "Fiber Optics", "Party Float"], plan: "Use Cooling Fan and one or two Freeze sources to start Hammer scaling, then let Fiber and Launcher compress every later cast.", online: "Hammer is upgraded, receives repeatable Freeze triggers, and survives long enough to reach its second major hit.", breaks: "If no Freeze arrives or the first Hammer cast is too late, use the shell with Ice 9000 or another immediate stabilizer." },
      { name: "Ice 9000 control loop", grade: "S", items: ["Ice 9000", "Beta Ray", "Fiber Optics", "Party Float"], plan: "Repeated Freeze buys the time the Flying loop needs while Ice 9000 supplies the damage endpoint.", online: "Important pieces are Flying, Freeze interrupts the opponent's first cycle, and Ice 9000 is at least Gold quality.", breaks: "A low-tier, unenchanted Ice 9000 is weaker than Hammer when both appear together." },
      { name: "Launch Pad flight Burn", grade: "S", items: ["Launch Pad", "Omega Ray", "YLW-M4NT1S", "BLK-SP1D3R"], plan: "Every relevant Friend or Flying activation adds Burn; use Party Float or a defensive enchant to survive while it compounds.", online: "Launch Pad has meaningful base Burn and the board produces frequent Friend/Flying uses without excess filler.", breaks: "Without Burn scaling, treat this as tempo and be ready to transfer the flight engine to Hammer, Ice 9000, or Plasma Rifle." },
      { name: "Terry/Mainframe", grade: "A", items: ["Terry-Dactyl", "Dooltron Mainframe", "Fiber Optics", "Thrusters"], plan: "A compact Friend/Flying package makes Terry activate repeatedly while Mainframe improves the whole loop.", online: "Terry is upgraded and the board needs only a few active pieces to become fully Flying.", breaks: "If Terry cannot reach Diamond or requires too many small Friends, pivot to the first S-tier endpoint found." },
    ],
    matchup: { favored: "Long fights and control boards once the loop is online.", respect: "Early aggression, first-cycle burst, and anything that kills before Flying coverage resolves.", adapt: "Spend early gold only for real tempo, enter Day 6 with reserves, then buy the first credible endpoint instead of holding out for a perfect one." },
  },
  "armored-core": {
    northStar: "Generate enough repeatable Shield to buy time, then convert that Shield into Burn, damage, or one decisive Force Field hit.",
    bottleneck: "Pure Shield does not end combat, and Poison can invalidate the resource you are investing in.",
    firstBreakpoint: "Duct Tape plus a real damage source; the current premium breakpoint is Welding Torch with Lightbulb/Wallace support.",
    exitRule: "Drop Armored when a self-contained carry supplies its own survival or the lobby's damage bypasses Shield faster than you can convert it.",
    itemRanks: [
      { name: "Duct Tape", tier: "S", why: "Foundational proc engine that multiplies Core Shield and supplies the repeated Shield events most Armored payoffs require." },
      { name: "Welding Torch", tier: "S", why: "Current Season 16 endpoint that converts Shield into Burn and gives the defensive shell inevitability." },
      { name: "Lightbulb", tier: "S", why: "Compact Tech accelerator in the featured Torch package; use it to charge the relevant adjacent Tech target." },
      { name: "Bunker", tier: "S", why: "Multicasts Shield items and reduces incoming damage, enabling Torch, Force Field, Harmadillo, and loop finishes." },
      { name: "Wallace", tier: "A", why: "Fast Shield scaler in the current Torch shell; Patch 16.1 removed cooldown-based scaling, so CDR is no longer the reason to buy it." },
      { name: "Force Field", tier: "A", why: "Converts a large Shield bank into burst and can reverse otherwise poor Shield-bypass matchups when properly accelerated." },
      { name: "Harmadillo", tier: "A", why: "Reliable damage conversion from repeatable Shield events and an excellent bridge from early Duct Tape." },
      { name: "Fiber Optics", tier: "A", why: "Charges Force Field or a right-edge payoff before opponents remove the Shield it needs." },
      { name: "Mech-Moles", tier: "B", why: "Excellent early tempo because both Haste and Shield matter, but it needs a scaling plan to remain the carry." },
      { name: "Metronome", tier: "B", why: "Strong when it connects a fast item to Core or Force Field; less important once Bunker/Fiber already closes the cycle." },
    ],
    synergies: [
      { name: "Welding Torch conversion", grade: "S", items: ["Welding Torch", "Duct Tape", "Wallace", "Bunker"], plan: "Tape and Wallace create repeated Shield, Torch converts a share into Burn, and Bunker multiplies the Shield-tagged actions.", online: "Torch is applying enough Burn to outpace decay and the board still has room for startup or control.", breaks: "Do not describe Wallace as scaling from cooldown after 16.1; if Poison dominates, shorten the fight instead of buying more Shield." },
      { name: "Harmadillo cycle", grade: "A", items: ["Duct Tape", "Harmadillo", "Fiber Optics", "Bunker"], plan: "Fast adjacent activations proc Tape, Shield events fire Harmadillo, and Fiber/Bunker push the package toward a repeatable loop.", online: "Harmadillo is upgraded and every Core cycle generates several distinct Shield events.", breaks: "If Harmadillo is the only damage and has no scaling, transition to Torch, Force Field, or a premium carry." },
      { name: "Force Field cash-out", grade: "A", items: ["Force Field", "Fiber Optics", "Metronome", "Bunker"], plan: "Bank Shield, then charge and Multicast Force Field before the opponent can remove the resource it converts.", online: "Force Field is Hasted or charged, has meaningful Crit, and threatens a kill on its first or second cast.", breaks: "Do not hedge it from a weak position without Defense Grid or enough Shield generation." },
      { name: "Mech-Moles tempo", grade: "B", items: ["Mech-Moles", "two small hasters", "Armored Core", "fast weapons"], plan: "Use Moles as an early scaler while Armored buys time, then shop a Gold carry before Moles falls behind.", online: "Both sides of Moles receive useful Haste and the rest of the board contributes immediate damage.", breaks: "Treat it as a bridge unless scaling or a late loop appears." },
    ],
    matchup: { favored: "Weapon burst and slower damage plans that must chew through repeated Shield.", respect: "Poison, Shield removal, and opponents whose scaling overtakes your conversion rate.", adapt: "Against bypass damage, add a faster payoff or Force Field line; generic extra Shield is not a correction." },
  },
  "companion-core": {
    northStar: "Use cheap Friend tempo and economy to reach a real Gold-tier endpoint before the generic Friend board falls off.",
    bottleneck: "Friend density is not power. Weak Friends consume slots and Companion's early advantage declines every day.",
    firstBreakpoint: "Brick Buddy or a credible Friend carry early; DJ Circuit Breaker or Miss Isles in the midgame; a real endpoint by Days 6–9.",
    exitRule: "Remove weak Friends and even bench Companion when DJ or a complete Dooltron/Factory engine gives more useful Haste and triggers.",
    itemRanks: [
      { name: "Robotic Factory", tier: "S", why: "Universal late Friend engine that enables multiple endpoints and becomes exceptional with a useful enchant." },
      { name: "Miss Isles", tier: "S", why: "Multicast Friend that charges Companion twice, supplies immediate pressure, and can become the win condition when upgraded." },
      { name: "Dooltron", tier: "S", why: "Natural late handoff because the Friend shell already provides tags and repeated triggers; upgrade quality is critical." },
      { name: "DJ Circuit Breaker", tier: "S", why: "The strongest early-to-mid global Haste engine for Friends, though mature boards may return to Companion for faster startup." },
      { name: "Monitor Lizard", tier: "A", why: "At Gold/Diamond it can be startup, Fiber fuel, or a real scaler rather than a filler Friend." },
      { name: "Launch Pad", tier: "A", why: "Converts Friend/Flying frequency into Burn and pairs extremely well with Blazehowl or Toxic Flames." },
      { name: "Pierre Conditioner", tier: "A", why: "High-tier multi-target Freeze turns small bug engines into late control boards." },
      { name: "Temporal Navigator", tier: "A", why: "Economic bridge and alternate-item access that supports Companion's save-then-spike game plan." },
      { name: "Brick Buddy", tier: "B", why: "Excellent early protection and upgrade target, but usually leaves the final board." },
      { name: "Sat-Comm", tier: "B", why: "Strong economy while the cheap Friend board is winning; not a final-board slot." },
    ],
    synergies: [
      { name: "Dooltron Friend handoff", grade: "S", items: ["Dooltron", "Companion Core", "2–3 useful Friends", "support item"], plan: "Use the early Friend board to bank gold, then keep only Friends whose triggers materially accelerate Dooltron.", online: "Dooltron is upgraded before Day 10 and status/Friend triggers make it fire without preserving dead tags.", breaks: "DJ can be too slow in mature boards; compare its startup against Companion rather than keeping both automatically." },
      { name: "Factory control swarm", grade: "S", items: ["Robotic Factory", "Pierre Conditioner", "small bugs", "Haste engine"], plan: "Factory and a compact bug package repeatedly trigger Pierre so the board wins through control while any one Friend supplies damage.", online: "Pierre freezes multiple targets and the engine starts before the opponent's first major cycle.", breaks: "Do not add bugs whose only contribution is the Friend tag; every slot must add triggers, control, or scaling." },
      { name: "Launch Pad Burn", grade: "A", items: ["Launch Pad", "Blazehowl", "Toxic Flames", "defensive enchant"], plan: "Friend activations stack Burn while the defensive layer buys enough time for damage-over-time to resolve.", online: "Launch Pad has meaningful base Burn and the board already generates frequent Friend uses.", breaks: "Without scaling, this is midgame tempo; move into Dooltron, Factory, or another endpoint before late sustain wins." },
      { name: "Crane vehicle package", grade: "A", items: ["Crane", "medium Friend Vehicle", "Dino Saddle", "Temporal Navigator"], plan: "Use Saddle/Vehicle support or Race Carl plus Navigator to turn Crane into the focused carry.", online: "Crane is upgraded and the supporting Vehicle package improves both its timing and damage.", breaks: "Dino Saddle is Diamond-only; do not hold a weak Crane board while waiting for one exact cap piece." },
    ],
    matchup: { favored: "Early aggression when Brick Buddy and efficient Friends win while preserving gold.", respect: "Late scaling, mass disruption, and any lobby that forces the generic Friend board beyond Day 12.", adapt: "Set a Day 6–9 endpoint deadline. If no win condition appears, pivot through Launcher or Armored hedges rather than buying more Friends." },
  },
  "critical-core": {
    northStar: "Burst before opposing scaling begins, then convert reliable Crit into a loop or a self-scaling Gold carry.",
    bottleneck: "Crit multiplies base output but does not create it. Low-damage items with 100% Crit are still low-damage items.",
    firstBreakpoint: "A real weapon opener plus Memory Card/Super Syrup; the actual carry should approach 100% Crit by the late game.",
    exitRule: "If no scalable damage source appears by Day 6, move the Crit support onto Combat Core, Cybersecurity, Hammer, or another Gold endpoint.",
    itemRanks: [
      { name: "Memory Card", tier: "S", why: "Farmable Crit source that solves the Core's most important late consistency requirement when planned before PvE fights." },
      { name: "SMG", tier: "S", why: "Fast activator that helps cycle Critical before the larger right-side weapons fire." },
      { name: "Pulse Rifle", tier: "S", why: "Efficient early buff target and the cleanest default weapon for the Core's right side." },
      { name: "Fiber Optics", tier: "S", why: "Closes Core/carry loops and enables double-Core or Hammer finishes." },
      { name: "Metronome", tier: "A", why: "Exceptional with Mech-Moles and useful whenever a fast item must accelerate Core or the chosen carry." },
      { name: "Combat Core", tier: "A", why: "Reliable self-scaling fallback that uses GPU, Fiber, and Core skills better than an underpowered weapon pile." },
      { name: "Nitrogen Hammer", tier: "A", why: "Stabilizes with minimal Freeze and caps with Cooling Fan plus Fiber." },
      { name: "Cybersecurity", tier: "A", why: "Straightforward high-base-damage alternative when Crit is solved but the original carry is not." },
      { name: "Mech-Moles", tier: "B", why: "Real scaling with Metronome/Haste, but not enough alone without late loop support." },
      { name: "Weakpoint Detector", tier: "B", why: "Useful early-mid scaler for slow weapon boards; rarely survives the final compression." },
    ],
    synergies: [
      { name: "Two-rotation weapon burst", grade: "S", items: ["SMG", "Critical Core", "Pulse Rifle", "Crit source"], plan: "Put fast, low-output activators left and meaningful damage right so the first two rotations happen before opposing scaling.", online: "The primary weapon receives the Core effect before firing and has reliable Crit rather than overcap on filler." , breaks: "If the line needs a third or fourth cycle without scaling, transition to a Gold carry." },
      { name: "Mech-Moles Metronome", grade: "A", items: ["Mech-Moles", "Metronome", "SMG", "Critical Core"], plan: "Place Metronome between the fastest trigger and the current scaling target; later move it toward Core as Core activations become more frequent.", online: "Moles scales every important damage source and the board remains fast enough to capitalize before disruption lands.", breaks: "Without Metronome or another dense Haste source, Moles is a hedge—not a late plan." },
      { name: "Double-Core Fiber loop", grade: "A", items: ["Critical Core", "Combat Core", "GPU", "Fiber Optics"], plan: "Critical sits far left and Combat Core far right so edge charging, GPU Haste, and Core skills reinforce both engines.", online: "Both Cores are upgraded and at least one reliable Multicast source lets the loop repeat inside the fight window.", breaks: "Do not assemble this from low tiers while behind; a conventional single carry is cheaper and faster." },
      { name: "Nitrogen Hammer freeze", grade: "A", items: ["Nitrogen Hammer", "Cooling Fan", "Fiber Optics", "Freeze source"], plan: "Use Critical's multiplier for immediate Hammer threat while Freeze and Fiber create repeat casts.", online: "Hammer is upgraded, receives at least one early Freeze, and threatens a kill by cast two.", breaks: "If Hammer is late or unupgraded, Cybersecurity or Combat Core may stabilize sooner." },
    ],
    matchup: { favored: "Slow engines and fragile boards that die inside two rotations.", respect: "Heavy Shield, damage reduction, and Freeze that interrupts the carry before the burst lands.", adapt: "Add scaling or a self-scaling endpoint; buying more Crit after consistency is solved does not fix low base damage." },
  },
  "ignition-core": {
    northStar: "Front-load enough Burn to overcome decay, then maintain it while defense and control buy the required fight time.",
    bottleneck: "Burn loses one stack every half-second and deals half damage to Shield, so slow application and no survival both fail.",
    firstBreakpoint: "Roughly 2 Burn per second only offsets decay; real boards need a higher initial burst plus Blast Doors or another survival layer.",
    exitRule: "Replace early Burn filler on Day 6, and abandon Burn late when sustain or immediate-kill boards outpace even your controlled stack.",
    itemRanks: [
      { name: "Blast Doors", tier: "S", why: "The premier early survival piece; it often buys enough effective health for Burn to matter through Day 5." },
      { name: "Soldering Gun", tier: "S", why: "Multicast applies Core buffs efficiently and supplies repeated status triggers for Drill variants." },
      { name: "Plasma Grenade", tier: "S", why: "Applied immediately before Rocket Launcher, it minimizes decay and creates the opening Burn burst." },
      { name: "Rocket Launcher", tier: "S", why: "Primary early Burn carry that converts skill and flat-Burn bonuses into reliable Days 1–5 pressure." },
      { name: "Metronome", tier: "A", why: "Solves Ignition's slow baseline and increases both initial application speed and later maintenance." },
      { name: "Launch Pad", tier: "A", why: "Premium Day 6 upgrade when Friends/Flying items can turn every engine activation into Burn." },
      { name: "Solar Farm", tier: "A", why: "Strong Haste/Burn package that bridges into looping late boards." },
      { name: "Fiber Optics", tier: "A", why: "Charges the chosen endpoint and is essential to several deep late control or one-shot pivots." },
      { name: "Chronobarrier", tier: "B", why: "Hold for the premium Atomic Clock control finish; too slow and expensive as an unsupported midgame purchase." },
      { name: "Cool LEDs", tier: "B", why: "Cheap control and status density that buys Burn ticks and supports Drill/RAMPage variants." },
    ],
    synergies: [
      { name: "Plasma-to-Rocket cycle", grade: "S", items: ["Plasma Grenade", "Rocket Launcher", "Ignition Core", "Haste"], plan: "Sequence Plasma immediately before Rocket so a large Burn packet lands with minimal decay, then use Haste to reach the maintenance cycle.", online: "The first cycle applies enough Burn to keep stacking through Shield and the board survives until the second cycle.", breaks: "If output is sufficient but late, buy speed; if it starts fast but dies, buy survival—not another redundant burner." },
      { name: "Soldering Drill", grade: "A", items: ["Soldering Gun", "Power Drill", "Ignition Core", "status support"], plan: "Soldering's Multicast and other status procs charge Drill while Ignition supplies repeated Burn triggers.", online: "Drill has real base damage or RAMPage scaling and Soldering contributes more than its own Burn." , breaks: "Only use Drill on a high-damage board; unsupported Drill consumes a large slot without fixing Burn's kill time." },
      { name: "Solar Launch Pad", grade: "A", items: ["Solar Farm", "Launch Pad", "YLW-M4NT1S", "Firefly"], plan: "Farm/Haste support accelerates a dense Friend/Flying Burn engine and provides a clean Day 6 replacement for early filler.", online: "Launch Pad has usable base Burn and multiple fast Friend/Flying activations are already present.", breaks: "If no scaling or defensive enchant appears, use it for tempo and prepare the Chronobarrier or one-shot pivot." },
      { name: "Chronobarrier control finish", grade: "S", items: ["Chronobarrier", "Atomic Clock", "Fiber Optics", "Tech density"], plan: "Build a high-ammo Atomic Clock and Diamond Chronobarrier package so extreme control gives Ignition or another payoff time to finish.", online: "Atomic Clock has enough Ammo, Fiber targets the correct edge, and the control begins before the opponent's lethal cycle.", breaks: "This is a held late package, not an early force. If pieces miss, use Boulder or Soul of the District for a faster kill." },
    ],
    matchup: { favored: "Boards that cannot remove the first Burn stack and need multiple cycles to become lethal.", respect: "Shield-heavy opponents, strong healing, and one-shot lines that deny Burn time.", adapt: "Against Shield, front-load harder or add Drill; against sustain, transition to control or a one-shot rather than stacking more slow Burn." },
  },
  "primal-core": {
    northStar: "Exploit Flint/Tool tempo and Core adjacency to win cheaply, bank gold, then purchase a denser late carry.",
    bottleneck: "Early Tools age poorly and the Core's own hit is not a late win condition.",
    firstBreakpoint: "Silver Flint with several Tools; practical early upgrade order is Flint, Drill, Plasma Grenade, Sander, then SMG.",
    exitRule: "Drop Primal when Dooltron, Press, Flamethrower, or another premium carry produces more value from the saved economy and remaining support.",
    itemRanks: [
      { name: "Flint Stones", tier: "S", why: "The reason to take Primal: one Small item converts Tool density into dominant early Burn and cheap wins." },
      { name: "Power Drill", tier: "S", why: "Adds burst, breaks Shield, and preserves a strong coreless/status pivot if Primal is missed or later removed." },
      { name: "Power Sander", tier: "S", why: "Accelerates Flint and generates multiple Drill triggers while remaining useful through the transition." },
      { name: "Soldering Gun", tier: "S", why: "Provides Drill triggers, benefits from Burn bonuses, and offers a separate Ignition/coreless route." },
      { name: "Plasma Grenade", tier: "A", why: "Adds disruption, improves the second Flint rotation, and supplies status density for Drill." },
      { name: "Temporal Navigator", tier: "A", why: "Pays for itself quickly and exposes alternate premium outs while the early board preserves economy." },
      { name: "Dooltron", tier: "A", why: "Natural handoff because Grenade and Sander already enable its status engine; usually replaces the Core." },
      { name: "Flamethrower", tier: "A", why: "Premium dense carry that inherits Burn and Haste support after the small Tool pile stops winning." },
      { name: "SMG", tier: "B", why: "Fast adjacent weapon and useful early trigger, but typically leaves once the board condenses." },
      { name: "Hydraulic Press", tier: "B", why: "An early Press is a real transition signal only when it will soon one-shot; keep the Flint plan until then." },
    ],
    synergies: [
      { name: "Flint Tool tempo", grade: "S", items: ["Flint Stones", "Power Drill", "Power Sander", "Soldering Gun"], plan: "Use cheap Tool density to accelerate Flint and trigger Drill while Primal's adjacency turns the two best neighboring items into Relics.", online: "Flint is Silver, several Tools are active, and the board is winning without repeated shop spending.", breaks: "Do not keep every Bronze Tool after Day 6; retain only pieces that accelerate the selected late carry." },
      { name: "Grenade Drill burst", grade: "A", items: ["Plasma Grenade", "Power Drill", "Flint Stones", "Power Sander"], plan: "Grenade front-loads disruption and status, Sander speeds the cycle, and Drill supplies direct Shield-breaking damage.", online: "Grenade fires early, Drill receives several status charges, and Flint still supplies meaningful Burn.", breaks: "If Drill lacks scaling or Grenade is late, the board is spending four slots on disconnected medium output." },
      { name: "Dooltron conversion", grade: "A", items: ["Dooltron", "Plasma Grenade", "Power Sander", "compact triggers"], plan: "Transfer the status/tempo shell into Dooltron, then solve speed, Crit, and Multicast instead of preserving Primal tags.", online: "Dooltron is upgraded and the support items trigger several of its internal effects.", breaks: "Dooltron normally drops Primal quickly; keeping the Core for sentiment reduces the trigger count." },
      { name: "Press or Flamethrower handoff", grade: "A", items: ["Hydraulic Press or Flamethrower", "Haste", "damage scaling", "control"], plan: "Use the strong economy to buy one premium payoff, then retain only Sander, Crit, or control that improves that carry's first two casts.", online: "The new carry is upgraded and objectively outperforms the full Flint/Tool board.", breaks: "A Gold premium item is not automatically an upgrade if it cannot yet kill; keep the tempo shell one fight longer." },
    ],
    matchup: { favored: "Early boards that cannot answer fast Flint Burn and Tool-trigger density.", respect: "Late control, high sustain, and any opponent that survives while the Tool pile runs out of scaling.", adapt: "Use the health/gold lead to take premium-item nodes. The correct defense is a timely transition, not upgrading filler." },
  },
  "weaponized-core": {
    northStar: "Make Weaponized activate before one or two efficient right-side weapons, then compound flat scaling across repeat volleys.",
    bottleneck: "Wide weapon piles dilute upgrades and still lose late without Crit, Haste, or control.",
    firstBreakpoint: "SMG left of Core plus Pulse Rifle or Arc Blaster right; Core must apply its first buff before the carry fires.",
    exitRule: "Late, keep only weapons efficient enough to justify receiving Core buffs; remove sidearms for Crit, CDR, defense, or control.",
    itemRanks: [
      { name: "SMG", tier: "S", why: "The key early timing item: it synchronizes Weaponized so the Core can buff a 5-second carry before its first cast." },
      { name: "Pulse Rifle", tier: "S", why: "The most efficient early recipient of Weaponized scaling and an automatic right-side consideration." },
      { name: "Scrap Metal", tier: "S", why: "Permanent targeted cooldown reduction and a later upgrade; Diamond Core is a major Weaponized breakpoint." },
      { name: "Metronome", tier: "S", why: "Fixes first-cycle timing and keeps the Core or premium weapon Hasted in condensed late boards." },
      { name: "Arc Blaster", tier: "A", why: "Excellent Tech weapon in the Pulse/Motherboard package and efficient enough to retain through midgame." },
      { name: "Motherboard", tier: "A", why: "Pulse/Core/Arc triggers charge it frequently so two important Tech pieces remain Hasted." },
      { name: "Flamethrower", tier: "A", why: "Dense midgame weapon that absorbs scaling well, provided Cog or Levitation Pad keeps it Hasted." },
      { name: "Cool LEDs", tier: "A", why: "Compact Slow and Core-linked utility that adds status pressure without another weak gun." },
      { name: "Combat Core", tier: "B", why: "A powerful extra scaler for the midgame hump, but requires Haste and competes for premium board space." },
      { name: "Cybersecurity", tier: "B", why: "High upfront damage and a useful multiplier when the original weapon pile lacks a true carry." },
    ],
    synergies: [
      { name: "SMG Core Pulse", grade: "S", items: ["SMG", "Weaponized Core", "Pulse Rifle", "Crit source"], plan: "SMG charges Core before Pulse fires; every later cycle compounds Weaponized scaling onto the efficient right-side weapon.", online: "Core's first activation precedes Pulse and the carry has enough Haste/Crit to exploit later buffs.", breaks: "A third weak weapon is usually worse than control or defense once Pulse is upgraded." },
      { name: "Pulse Motherboard Arc", grade: "S", items: ["Pulse Rifle", "Motherboard", "Arc Blaster", "Weaponized Core"], plan: "A dense Tech package repeatedly charges Motherboard so the two most important Tech pieces stay Hasted while Core scales the weapons.", online: "Motherboard receives frequent Tech activations and both weapons are meaningful upgrade targets.", breaks: "If Arc or Pulse is low tier, keep the Tech engine and replace the weaker weapon with a premium carry." },
      { name: "Hasted Flamethrower", grade: "A", items: ["Flamethrower", "Cog or Levitation Pad", "Weaponized Core", "Crit"], plan: "Condense the wide weapon pile into Flamethrower, then make sure it reaches a second cast while Core scaling and Crit multiply the damage.", online: "Flamethrower is permanently or nearly permanently Hasted and Core acts first.", breaks: "An unhasted Flamethrower often casts only once; fix timing before buying more damage." },
      { name: "Gold scaler bridge", grade: "A", items: ["Combat Core or Cybersecurity", "Haste", "Fiber Optics", "utility"], plan: "Use a self-scaling Gold item to cross Weaponized's midgame gap, then replace early sidearms with speed and disruption.", online: "The Gold carry is upgraded and can threaten lethal within two cycles.", breaks: "Do not run multiple large scalers without enough acceleration; pick the one with the best current quality." },
    ],
    matchup: { favored: "Predictable early and midgame boards that allow the first Core-then-weapon sequence.", respect: "Freeze on the primary weapon, damage reduction, and late engines that outscale flat weapon buffs.", adapt: "Add Crit and control, then condense to one premium weapon. If the first shot still precedes Core, change timing before shopping damage." },
  },
};

export const topDooleyItems: GlobalRankedItem[] = [
  { name: "Fiber Optics", tier: "S", role: "Targeted Charge", bestIn: "Almost every carry route", why: "The fastest left-edge activation can charge the right-edge carry. It appears in Drill, Launcher, Force Field, Harmadillo, and Dooltron finishes." },
  { name: "Metronome", tier: "S", role: "Haste bridge", bestIn: "All Cores", why: "Place it between a fast active and the Core or carry. It fixes first-cycle timing and remains useful until a tighter loop replaces it." },
  { name: "Scrap Metal", tier: "S", role: "Permanent CDR + upgrade", bestIn: "Late Core routes", why: "Premium long-run investment when immediate tempo is already solved. Targeting and timing matter more than buying it on sight." },
  { name: "RAMPage Module", tier: "S", role: "Status scaler", bestIn: "Power Drill / status", why: "Slow, Poison, or Freeze turns adjacent items into scaling threats. It is the defining support for the current Drill shell." },
  { name: "Power Drill", tier: "S", role: "Status payoff", bestIn: "RAMPage, Ignition, coreless", why: "Haste, Slow, Freeze, Poison, and Burn all accelerate it. Unsupported Drill is slow; supported Drill is a featured Season 16 win condition." },
  { name: "Duct Tape", tier: "S", role: "Shield engine", bestIn: "Armored, Harmadillo, Torch", why: "Cheap defense that becomes a repeated Shield-proc engine beside fast items and effectively multiplies Armored's output." },
  { name: "Cool LEDs", tier: "A", role: "Slow + status trigger", bestIn: "Core, Drill, RAMPage", why: "Compact, fast disruption that also feeds status payoffs. Excellent engine piece; never mistake it for the win condition." },
  { name: "Bunker", tier: "A", role: "Multicast + defense", bestIn: "Shield and Dooltron finishes", why: "Multicasts Shield items and reduces incoming damage. High ceiling, but its Large slot demands real Shield density or an enchant target." },
  { name: "Party Float", tier: "A", role: "Flying defense + CDR", bestIn: "Launcher", why: "Starts Flying, Shields on Flying activations, and reduces Flying cooldowns. Premium once a Launcher endpoint is already live." },
  { name: "Lightbulb", tier: "A", role: "Adjacent Tech charge", bestIn: "Welding Torch / Tech", why: "Compact accelerator in the current Shield/Burn package. Its target must be Tech, so map the adjacency before buying." },
  { name: "Dooltron", tier: "A", role: "Late status finisher", bestIn: "Companion, Primal, coreless", why: "Converts a mature status/Friend shell into a dense late payoff. Once triggers are saturated, buy CDR or Multicast instead of more tags." },
  { name: "Dino Saddle", tier: "A", role: "Vehicle Multicast", bestIn: "Launcher, Dooltron, Force Field", why: "One of Dooley's best caps when Thrusters makes the chosen carry a Vehicle. Diamond rarity makes it an opportunity, not a force." },
  { name: "Thrusters", tier: "A", role: "Vehicle + Flying + CDR", bestIn: "Saddle and Launcher", why: "Selects the item that Saddle will Multicast while improving startup. Hold only when the package is realistically reachable." },
  { name: "Chemsnail", tier: "B", role: "Slow/Poison engine", bestIn: "RAMPage / Drill", why: "Two statuses in one compact Friend and a natural RAMPage trigger source. Needs repeatable Slow before it becomes exceptional." },
  { name: "BLK-SP1D3R", tier: "B", role: "Multi-target Slow", bestIn: "Drill, Ignition, Dooltron", why: "Dense Slow that charges from adjacent Poison or Burn. Upgrade and adjacency dependent, but excellent in the correct status package." },
  { name: "Launch Pad", tier: "B", role: "Friend/Flying Burn", bestIn: "Launcher, Companion, Ignition", why: "Every relevant Friend or Flying use produces Burn. S-tier inside its route; a dead speculative buy outside it." },
  { name: "Dooley's Scarf", tier: "B", role: "Freeze protection + Haste", bestIn: "Drill and Freeze", why: "Protects adjacent pieces from Freeze and converts your Freeze events into Haste. Premium only when Freeze is frequent." },
  { name: "Beta Ray", tier: "B", role: "Repeatable Freeze", bestIn: "Launcher and fast Cores", why: "Patch 16 cooldown improvement made it a better generic support piece, but it still needs a real loop or Freeze payoff." },
  { name: "Wallace", tier: "B", role: "Shield scaler", bestIn: "Welding Torch", why: "A current Shield/Burn winner at a flat 3-second cooldown. Patch 16.1 removed cooldown-based scaling, so do not overbuy CDR for it." },
  { name: "Welding Torch", tier: "B", role: "Shield-to-Burn conversion", bestIn: "Armored Core", why: "Gives Shield boards inevitability by converting Shield into Burn. Build-defining in its exact shell, low priority without Shield." },
];

export const merchantDirectory = [
  { name: "Ande", stock: "Small items", reroll: "2g · 1 reroll", bestFor: "Flint/Tool starts, compact triggers, filling an exact Small slot", rule: "Enter when several Small hits help; never pay to chase one needle." },
  { name: "Mittel", stock: "Medium items", reroll: "2g · 1 reroll", bestFor: "Core engines, Dooley payoffs, midgame board density", rule: "The default best size shop when two or more Medium upgrades are live." },
  { name: "Aila", stock: "Weapons", reroll: "2g · 1 reroll", bestFor: "Critical and Weaponized carries; finding real damage", rule: "Visit for weapon quality, then leave once output is solved." },
  { name: "Kina", stock: "Non-Weapons", reroll: "2g · 1 reroll", bestFor: "Armored, Companion, utility, Haste and defensive glue", rule: "Great when weapon clutter is the misses you want removed." },
  { name: "Tinker", stock: "Friends", reroll: "3g", bestFor: "Companion and Launcher engines", rule: "Reroll while Friend density itself improves the engine—not for one legendary." },
  { name: "Tok’s Clocks", stock: "Haste · Slow · cooldown", reroll: "3g", bestFor: "Almost every Core once its payoff is solved", rule: "Speed fixes engines; it cannot rescue a board with no win condition." },
  { name: "Orion", stock: "Tools", reroll: "3g · 1 reroll", bestFor: "Soldering, Flint, Sander, Thermal and Tool shells", rule: "Excellent when multiple Tools advance the line; it is not a Burn-only shop." },
  { name: "Hef", stock: "Burn items", reroll: "3g · 1 reroll", bestFor: "Focused Ignition scaling and Burn finishers", rule: "The narrow Burn shop; leave when cooldown or survival is the bottleneck." },
  { name: "Aimbot", stock: "Crit items", reroll: "Specialist", bestFor: "Critical consistency and late Weaponized scaling", rule: "Buy enough reliability, not decorative overcap crit." },
  { name: "Kev’s Armory", stock: "Health · Shield", reroll: "Specialist", bestFor: "Armored engines and survival checks", rule: "Defense is useful only if your board can eventually win." },
  { name: "Pinfeather", stock: "Flying items", reroll: "4g · 1 reroll", bestFor: "Launcher coverage and enablers", rule: "Stop once the important pieces fly; keyword density is not power." },
  { name: "The Tester", stock: "Tech from several Heroes", reroll: "3g · 1 reroll", bestFor: "Cross-Core Tech, unusual support, Launcher and Weaponized lines", rule: "High ceiling, broad pool. Enter with several valid Tech outcomes." },
  { name: "Pol / Quixel", stock: "Large / size economy", reroll: "Premium", bestFor: "Turning a rich tempo run into a late carry", rule: "Shop premium sizes from strength; desperate rerolls multiply misses." },
];

export const universalRules = [
  { kicker: "01 · Position", title: "Use trigger → Core → payoff order", text: "Use this default activation order: fast triggers → Core → primary payoff. Each item should accelerate the Core, receive its effect, provide defense, or supply control." },
  { kicker: "02 · Density", title: "Concentrate scaling on one carry", text: "A compact engine creates more useful casts and leaves room for control. Upgrade the primary win condition before adding another synergy tag." },
  { kicker: "03 · Economy", title: "Keep a Day 6 reserve", text: "Patch 16 starts income at 5. Strong early boards should bank gold, then enter targeted shops with a target list instead of spending incrementally on untargeted rerolls." },
  { kicker: "04 · Pivots", title: "Replace the Core when slot value falls", text: "Cores are starting engines. Bench one when a self-contained legendary or cleaner late package produces more useful actions." },
  { kicker: "05 · Shops", title: "Reroll with multiple acceptable outcomes", text: "Pay for a reroll when multiple results improve the board. If only one exact card hits, preserve the gold and continue with the strongest currently supported build." },
  { kicker: "06 · Fights", title: "Diagnose the first combat cycle", text: "The first ten seconds reveal the bottleneck: Core too late, carry too early, insufficient survival, or insufficient damage. Buy the specific correction rather than generic power." },
];
