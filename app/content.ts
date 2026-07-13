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
      "7 / 6 / 5 sec · At fight start, 2 / 3 / 4 other items start Flying. On use, Charge other Flying items 1 sec. Another Friend or Flying item use Charges Launcher Core 1 sec.",
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
