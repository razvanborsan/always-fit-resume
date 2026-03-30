import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { prepareWithSegments, layout, layoutWithLines } from "@chenglou/pretext";

/* ── Page constants ────────────────────────────────────────── */
const PAGE_W = 620;
const PAGE_H = Math.round(PAGE_W * (297 / 210));
const DEFAULT_PAD = 40;
const FONT = "InterVariable, sans-serif";
const LH_MIN = 1.15;
const LH_MAX = 1.8;
const LH_DEFAULT = 1.5;
const FS_MAX_DEFAULT = 14;

/* ── Sample resumes ───────────────────────────────────────── */
const RESUMES = [
`# Milo Vex
Product Engineer
San Francisco, CA · milo@milovex.dev · github.com/milovex

---

I build tools that help people think less about tooling. Spent the last two years making an AI write better code than me, then pretending that was the plan all along. Most productive when slightly confused.

## EXPERIENCE

### Product Engineer — Anthropic (Claude Code)
2023 — Present
- Designed the slash command system that ships with every Claude Code session
- Built the permission model so the AI can edit your files without ruining your day
- Reduced first-run-to-first-commit time by 40% by removing onboarding steps nobody finished
- Wrote the hooks system that lets users run shell commands before and after tool calls

### Product Engineer — Anthropic (Claude)
2022 — 2023
- Shipped the artifact rendering pipeline — the thing that lets Claude show you code and run it
- Prototyped the conversation branching UI that became the basis for editing messages
- Spent three weeks optimizing streaming latency; users noticed in hours, which was nice

### Frontend Engineer — Replit
2020 — 2022
- Built the multiplayer cursor system that made collaborative coding feel like a Google Doc
- Migrated the editor from Monaco to CodeMirror 6 without anyone filing a bug, somehow
- Owned the mobile web experience; made a terminal usable on a phone, which shouldn't work but does

## EDUCATION

### BS in Computer Science — UC Berkeley
Focus on programming languages and developer tools
Senior project: a Git GUI that your parents could use (they couldn't, but almost)

## SKILLS

TypeScript · React · Rust · Node · Systems thinking · CLI design · Making demos that accidentally ship · Reading other people's code without flinching · Knowing when the feature is done`,

`# Nora Ashby
Data Engineer
Chicago, IL · nora@noraashby.io · github.com/nashby

---

I make data pipelines that don't wake anyone up at 3am. Previously spent two years convincing people that "it works on my laptop" is not a deployment strategy. Happiest when a dashboard loads in under a second.

## EXPERIENCE

### Senior Data Engineer — Stripe
2022 — Present
- Rebuilt the merchant analytics pipeline to process 2B events/day with 40% fewer compute costs
- Designed the schema migration system that lets teams ship breaking changes without breaking anything
- On-call rotation lead; reduced P1 incidents from 12/month to 3 by fixing the alerting, not the thresholds

### Data Engineer — Datadog
2019 — 2022
- Built the ingestion layer for custom metrics that now handles 800K data points per second
- Wrote the anomaly detection service that catches metric regressions before customers notice
- Migrated 14TB of time-series data from Cassandra to a custom storage engine with zero downtime

### Software Engineer — Capital One
2017 — 2019
- Automated the credit risk reporting pipeline that used to take a team of analysts two days
- Built a real-time fraud detection prototype that caught patterns the batch system missed entirely
- Convinced the team to adopt dbt; it stuck and they still use it

## EDUCATION

### MS in Computer Science — University of Illinois
Focus on distributed systems and databases
Thesis: optimizing query planning for heterogeneous data lakes

## SKILLS

Python · SQL · Spark · Kafka · Airflow · dbt · Terraform · PostgreSQL · Writing runbooks people actually follow · Debugging distributed systems at 2am · Saying "have you checked the logs" diplomatically`,

`# Theo Campos
Design Engineer
Brooklyn, NY · theo@theocampos.com · dribbble.com/theoc

---

I sit between design and engineering and try to make sure neither side is sad. Most of my work is making interfaces feel inevitable — like they couldn't have been any other way. Unreasonably invested in easing curves.

## EXPERIENCE

### Design Engineer — Vercel
2022 — Present
- Built the new dashboard navigation that reduced time-to-deploy by 25% through better information hierarchy
- Created the component library's motion system; every transition in the product uses it now
- Designed and shipped the collaborative deployment preview comments feature end-to-end

### Frontend Engineer — Linear
2020 — 2022
- Implemented the keyboard-first interaction model that became a core part of Linear's identity
- Built the custom text editor with real-time sync, markdown shortcuts, and inline image handling
- Reduced bundle size by 35% by rewriting the icon system from individual SVGs to a sprite sheet

### UI Engineer — Figma
2018 — 2020
- Shipped the auto-layout engine's constraint visualization — the guides you see when resizing frames
- Built the prototype interaction panel that lets designers chain animations without writing code
- Wrote the color picker that handles P3 wide-gamut colors; it's still the same one they use

## EDUCATION

### BFA in Graphic Design — Rhode Island School of Design
Concentration in interactive media
Senior show: a generative typography system that responds to ambient sound

## SKILLS

TypeScript · React · Svelte · WebGL · Framer Motion · Figma API · CSS that sparks joy · Spatial reasoning · Advocating for the 8px grid · Making engineers care about kerning`,

`# Sam Nguyen
Software Engineer
Portland, OR · sam@sambuilds.dev · github.com/sambuilds

---

I like making things that work well and feel right. Most of my job is reading code someone else wrote and quietly figuring out what they meant. The rest is trying to name variables honestly.

## EXPERIENCE

### Software Engineer — Smalldoor
2022 — Present
- Built the onboarding flow that cut drop-off by 30%, mostly by removing three unnecessary steps
- Migrated a legacy billing system without a single customer noticing, which is the best compliment
- Wrote documentation that people actually read, reportedly a first for the engineering team

### Frontend Developer — Greenhouse Studio
2019 — 2022
- Shipped a design system used across four products; resisted the urge to call it a "platform"
- Debugged a race condition that had been open for 8 months by staring at it long enough
- Paired with designers weekly, learned more about spacing than any CS class ever taught me

### Junior Developer — Tidepool Labs
2017 — 2019
- Inherited a 12,000-line file and refactored it into something a new hire could follow in a day
- Automated a reporting task that used to take the ops team half a Friday
- Asked a lot of questions in code reviews; turns out that's useful too

## EDUCATION

### BS in Computer Science — Oregon State University
Focus on human-computer interaction
Senior project: a transit app that worked offline, which felt important at the time and still does

## SKILLS

JavaScript · TypeScript · React · Node · PostgreSQL · CSS that doesn't fight you · Writing things down · Asking good questions · Knowing when to stop`,

`# Ava Lin
Junior Developer
Austin, TX · ava@avalin.dev · github.com/avalin

---

Recent grad who writes code that works the first time about 40% of the time. The other 60% I learn something.

## EXPERIENCE

### Software Engineer Intern — Netlify
2024
- Added edge function support for three new regions; mostly copy-pasted the first one correctly
- Fixed a caching bug that had been quietly serving stale assets for six months

### Teaching Assistant — UT Austin CS Department
2023 — 2024
- Held office hours for 200 students in intro to systems; answered "what is a pointer" 400 times
- Wrote autograder tests that caught 90% of common mistakes before submission

## EDUCATION

### BS in Computer Science — UT Austin
Dean's list, focus on systems programming

## SKILLS

C · Python · JavaScript · React · Linux · Asking for help early · Reading error messages carefully`,

`# Raj Patel
Staff Engineer
Seattle, WA · raj@rajpatel.dev · github.com/rajpatel

---

I've been writing software for 15 years and have mass-deleted more code than most people have written. Currently focused on making large systems simpler, which turns out to be the hardest kind of engineering.

## EXPERIENCE

### Staff Engineer — Stripe
2021 — Present
- Led the migration of the payments state machine from a monolith to event-sourced microservices
- Designed the circuit breaker system that prevented three potential cascading failures in production
- Reduced API p99 latency from 800ms to 120ms by rewriting the merchant lookup path
- Mentored eight engineers across two teams; three were promoted within a year

### Senior Engineer — Dropbox
2017 — 2021
- Built the incremental sync engine that handles 50M file change events per day
- Architected the conflict resolution system for shared folders; it handles 99.7% of cases automatically
- Wrote the internal RFC process that the engineering org still uses for technical decisions
- Led the Python 2 to 3 migration for 2M lines of code across 400 services

### Software Engineer — Google (Maps)
2013 — 2017
- Implemented offline map tile caching that reduced data usage by 60% in emerging markets
- Built the place autocomplete ranking model that increased selection accuracy by 25%
- Contributed to the rendering pipeline that handles 100B map tile requests per month
- Designed the A/B testing framework for map UI experiments

### Software Engineer — Amazon
2010 — 2013
- Built the first version of the "customers also bought" recommendation widget for Kindle
- Reduced checkout page load time by 300ms by optimizing the session store
- Wrote the deployment pipeline for the digital content team; it survived Black Friday

## EDUCATION

### MS in Computer Science — Carnegie Mellon University
Focus on distributed systems
Thesis: consensus protocols for geo-replicated databases

### BS in Computer Engineering — Georgia Tech

## SKILLS

Java · Go · Python · Rust · Kafka · DynamoDB · PostgreSQL · Terraform · System design · Writing RFCs · Deleting code · Making on-call less painful · Knowing when not to build it`,

`# Elena Moss
Creative Technologist
London, UK · elena@elenamoss.co · github.com/elenamoss

---

I make websites that people screenshot and send to their friends. Background in graphic design, learned to code because I kept asking developers for things they said were impossible.

## EXPERIENCE

### Creative Technologist — R/GA London
2022 — Present
- Built an interactive annual report for Nike that got 2M unique visitors in the first week
- Created a WebGL product configurator for a luxury brand that increased engagement time by 4x

### Freelance Developer & Designer
2019 — 2022
- Designed and built portfolio sites for 30+ creatives; every one of them still gets compliments
- Made a generative art tool that was featured on Hacker News for a full day

## EDUCATION

### BA in Graphic Design — Central Saint Martins

## SKILLS

JavaScript · Three.js · GLSL · Figma · After Effects · Making things move beautifully`,

`# Marcus Chen
Backend Engineer
Toronto, ON · marcus@mchen.dev · github.com/marcuschen

---

I write the code that nobody sees but everybody depends on. Spent the last decade making servers do things reliably at scale. My favorite bug is always the one where the fix is deleting code.

## EXPERIENCE

### Senior Backend Engineer — Shopify
2021 — Present
- Redesigned the inventory reservation system to handle flash sales without overselling
- Built the webhook delivery pipeline that processes 4B events per month with 99.99% reliability
- Migrated the order management service from Rails to a Rust core; 10x throughput improvement
- Led the incident response for the largest traffic event in company history; zero customer impact

### Backend Engineer — PagerDuty
2018 — 2021
- Built the real-time incident timeline that aggregates events from 200+ integration sources
- Designed the notification deduplication system that reduced alert fatigue by 40%
- Rewrote the on-call scheduling engine to support complex rotation patterns across time zones
- Owned the Kafka cluster that ingests 500K events per second

### Software Developer — Wealthsimple
2016 — 2018
- Built the trade execution engine for the first version of Wealthsimple Trade
- Implemented fractional share purchasing; the math was harder than expected
- Wrote the reconciliation system that catches discrepancies between our ledger and the clearing house

### Junior Developer — Freshbooks
2014 — 2016
- Added multi-currency support to the invoicing system; learned that money is surprisingly complicated
- Built the CSV import tool that customers actually liked, which is rare for import tools

## EDUCATION

### BCS in Computer Science — University of Waterloo
Co-op placements at Bloomberg and Shopify

## SKILLS

Ruby · Rust · Go · PostgreSQL · Redis · Kafka · gRPC · Kubernetes · Database internals · Making things boring in a good way · Incident response · Writing postmortems that prevent repeats`,

`# Zoe Park
UX Engineer
Denver, CO · zoe@zoepark.design · github.com/zpark

---

I prototype faster than most people can write tickets. Believe that the best way to resolve a design debate is to build both versions before lunch.

## EXPERIENCE

### UX Engineer — Notion
2023 — Present
- Built the new page transition system that makes navigation feel instant
- Prototyped 15 interaction concepts for the Notion AI sidebar; three shipped

### Frontend Developer — Craft
2021 — 2023
- Implemented the block editor's drag-and-drop system with nested container support
- Built the real-time collaboration cursors with smooth interpolation

### Design Technologist — IDEO
2019 — 2021
- Created rapid prototypes for Fortune 500 clients; average turnaround was two days
- Built a physical-digital prototype for a healthcare client that changed their product direction

## EDUCATION

### BFA in Interactive Design — Parsons School of Design
Minor in computer science

## SKILLS

TypeScript · React · Swift · Framer · Origami · Prototyping in code · Animating with purpose · Talking to designers in their language`,
];

const DEFAULT_MD = RESUMES[0];

/* ── Parse markdown into blocks ────────────────────────────── */
function parseMarkdown(md) {
  const blocks = [];
  const lines = md.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "---") {
      blocks.push({ type: "hr", mb: 16 });
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push({ text: line.slice(2), fontScale: 1.5, bold: true, mb: 4, color: "#111" });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ text: line.slice(3), fontScale: 0.85, bold: true, mt: 18, mb: 3, color: "#999" });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const prev = blocks[blocks.length - 1];
      const afterSection = prev && prev.fontScale === 0.85 && prev.bold;
      blocks.push({ text: line.slice(4), fontScale: 1, bold: true, mt: afterSection ? 0 : 10, mb: 2, color: "#111" });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      blocks.push({ text: "\u2022 " + line.slice(2), fontScale: 1, bold: false, mb: 3, color: "#555" });
      i++;
      continue;
    }

    const prevBlock = blocks[blocks.length - 1];
    const isAfterTitle = prevBlock && prevBlock.bold && prevBlock.fontScale === 1 && prevBlock.mb === 2;

    if (isAfterTitle) {
      blocks.push({ text: line, fontScale: 0.8, bold: false, mb: 6, color: "#999" });
    } else if (prevBlock && prevBlock.fontScale === 1.5) {
      blocks.push({ text: line, fontScale: 1, bold: false, mb: 6, color: "#555" });
    } else if (prevBlock && !prevBlock.bold && prevBlock.color === "#555" && prevBlock.mb === 6 && prevBlock.fontScale === 1) {
      blocks.push({ text: line, fontScale: 0.8, bold: false, mb: 16, color: "#999" });
    } else {
      blocks.push({ text: line, fontScale: 1, bold: false, mb: 6, color: "#333" });
    }
    i++;
  }

  return blocks;
}

/* ── Build font string (same for prepare + DOM) ──────────── */
function fontString(baseFontSize, block) {
  const fs = baseFontSize * block.fontScale;
  return `${block.bold ? "bold " : ""}${fs}px ${FONT}`;
}

/* ── Measure blocks (pure math, no DOM) ────────────────────── */
function measureBlocks(blocks, baseFontSize, contentW, lhMult = LH_DEFAULT, sectionSpacing = 18, itemSpacing = 10, separatorSpacing = 16) {
  let h = 0;
  for (let idx = 0; idx < blocks.length; idx++) {
    const block = blocks[idx];
    if (block.mt) {
      const isSection = block.fontScale === 0.85 && block.bold;
      const isItem = block.mt > 0 && !isSection;
      h += isSection ? sectionSpacing : isItem ? itemSpacing : block.mt;
    }
    if (block.type === "hr") {
      h += separatorSpacing + 1 + separatorSpacing;
      continue;
    }
    const fs = baseFontSize * block.fontScale;
    const lh = fs * lhMult;
    const font = fontString(baseFontSize, block);
    h += layout(prepareWithSegments(block.text, font), contentW, lh).height;
    // Skip mb if the next block has mt or is an hr (spacing is handled by them)
    const next = blocks[idx + 1];
    if (next && (next.mt || next.type === "hr")) continue;
    h += block.mb;
  }
  return h;
}

/* ── Layout blocks into positioned lines ─────────────────── */
function layoutBlocks(blocks, baseFontSize, contentW, pad, lhMult = LH_DEFAULT, sectionSpacing = 18, itemSpacing = 10, separatorSpacing = 16) {
  const positioned = [];
  let y = pad;

  for (let idx = 0; idx < blocks.length; idx++) {
    const block = blocks[idx];
    if (block.mt) {
      const isSection = block.fontScale === 0.85 && block.bold;
      const isItem = block.mt > 0 && !isSection;
      y += isSection ? sectionSpacing : isItem ? itemSpacing : block.mt;
    }
    if (block.type === "hr") {
      y += separatorSpacing;
      positioned.push({ type: "hr", y });
      y += 1 + separatorSpacing;
      continue;
    }

    const fs = baseFontSize * block.fontScale;
    const lh = fs * lhMult;
    const font = fontString(baseFontSize, block);
    const prepared = prepareWithSegments(block.text, font);
    const result = layoutWithLines(prepared, contentW, lh);

    for (const line of result.lines) {
      positioned.push({
        type: "text",
        text: line.text,
        x: pad,
        y,
        font,
        fontSize: fs,
        fontWeight: block.bold ? "bold" : "normal",
        lineHeight: lh,
        color: block.color,
      });
      y += lh;
    }

    // Skip mb if the next block has mt or is an hr (spacing is handled by them)
    const next = blocks[idx + 1];
    if (next && (next.mt || next.type === "hr")) continue;
    y += block.mb;
  }

  return positioned;
}

/* ── Binary search for optimal font size + line height ────── */
function findOptimalFit(blocks, contentW, maxH, minFs = 6, maxFs = 24, sectionSpacing = 18, itemSpacing = 10, separatorSpacing = 16) {
  // Pass 1: max font size at tightest line spacing
  let lo = minFs;
  let hi = maxFs;
  while (hi - lo > 0.01) {
    const mid = (lo + hi) / 2;
    if (measureBlocks(blocks, mid, contentW, LH_MIN, sectionSpacing, itemSpacing, separatorSpacing) <= maxH) lo = mid;
    else hi = mid;
  }
  const fontSize = Math.floor(lo * 100) / 100;

  // Pass 2: expand line-height to fill remaining space
  let lhLo = LH_MIN;
  let lhHi = LH_MAX;
  while (lhHi - lhLo > 0.001) {
    const mid = (lhLo + lhHi) / 2;
    if (measureBlocks(blocks, fontSize, contentW, mid, sectionSpacing, itemSpacing, separatorSpacing) <= maxH) lhLo = mid;
    else lhHi = mid;
  }
  const lineHeightMult = Math.floor(lhLo * 1000) / 1000;

  return { fontSize, lineHeightMult };
}

/* ── Component ─────────────────────────────────────────────── */
export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [fontSize, setFontSize] = useState(11);
  const [padding, setPadding] = useState(DEFAULT_PAD);
  const [ready, setReady] = useState(false);
  const [lineHeightMult, setLineHeightMult] = useState(LH_DEFAULT);
  const [maxFontSize, setMaxFontSize] = useState(FS_MAX_DEFAULT);
  const [sectionSpacing, setSectionSpacing] = useState(18);
  const [itemSpacing, setItemSpacing] = useState(10);
  const [separatorSpacing, setSeparatorSpacing] = useState(16);
  const [autoFit, setAutoFit] = useState(true);
  const [pageScale, setPageScale] = useState(1);
  const [activeTab, setActiveTab] = useState("preview");
  const pageRef = useRef(null);
  const previewRef = useRef(null);

  const contentW = PAGE_W - padding * 2;
  const maxH = PAGE_H - padding * 2;

  const blocks = useMemo(() => parseMarkdown(markdown), [markdown]);

  useEffect(() => {
    document.fonts.ready.then(() => setReady(true));
    if (document.fonts.status === "loaded") setReady(true);
  }, []);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const sx = width / PAGE_W;
      const sy = height / PAGE_H;
      setPageScale(Math.min(sx, sy, 1));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { measuredHeight, measureTime } = useMemo(() => {
    if (!ready) return { measuredHeight: 0, measureTime: 0 };
    const t0 = performance.now();
    const h = measureBlocks(blocks, fontSize, contentW, lineHeightMult, sectionSpacing, itemSpacing, separatorSpacing);
    return {
      measuredHeight: Math.round(h),
      measureTime: +(performance.now() - t0).toFixed(2),
    };
  }, [blocks, fontSize, contentW, lineHeightMult, sectionSpacing, itemSpacing, separatorSpacing, ready]);

  const positioned = useMemo(() => {
    if (!ready) return [];
    return layoutBlocks(blocks, fontSize, contentW, padding, lineHeightMult, sectionSpacing, itemSpacing, separatorSpacing);
  }, [blocks, fontSize, contentW, padding, lineHeightMult, sectionSpacing, itemSpacing, separatorSpacing, ready]);

  useEffect(() => {
    if (!ready || !autoFit) return;
    const { fontSize: optFs, lineHeightMult: optLh } = findOptimalFit(blocks, contentW, maxH, 6, 24, sectionSpacing, itemSpacing, separatorSpacing);
    const capped = Math.min(optFs, maxFontSize);
    setFontSize(capped);
    setLineHeightMult(optLh);
  }, [blocks, padding, autoFit, ready, contentW, maxH, maxFontSize, sectionSpacing, itemSpacing, separatorSpacing]);

  const handleSlider = (e) => {
    setAutoFit(false);
    setFontSize(parseFloat(e.target.value));
  };

  const handleLineHeightSlider = (e) => {
    setAutoFit(false);
    setLineHeightMult(parseFloat(e.target.value));
  };

  const handleExportPdf = useCallback(() => {
    const page = pageRef.current;
    if (!page) return;

    const hiddenEls = [];
    const ancestorSaved = [];
    let current = page;
    while (current.parentElement) {
      const parent = current.parentElement;
      Array.from(parent.children).forEach((sibling) => {
        if (sibling !== current) {
          hiddenEls.push({ el: sibling, prev: sibling.style.display });
          sibling.style.display = "none";
        }
      });
      if (parent !== document.body) {
        ancestorSaved.push({
          el: parent,
          overflow: parent.style.overflow,
          transform: parent.style.transform,
          position: parent.style.position,
          visibility: parent.style.visibility,
          background: parent.style.background,
        });
        parent.style.overflow = "visible";
        parent.style.transform = "none";
        parent.style.visibility = "visible";
        parent.style.background = "none";
      }
      current = parent;
    }

    const pageSaved = {
      position: page.style.position,
      top: page.style.top,
      left: page.style.left,
      transform: page.style.transform,
      transformOrigin: page.style.transformOrigin,
      boxShadow: page.style.boxShadow,
      background: page.style.background,
    };
    const printScale = 794 / PAGE_W;
    page.style.position = "fixed";
    page.style.top = "0";
    page.style.left = "0";
    page.style.transform = `scale(${printScale})`;
    page.style.transformOrigin = "top left";
    page.style.boxShadow = "none";
    page.style.background = "white";

    const guides = page.querySelectorAll("[data-margin-guide],[data-overflow]");
    guides.forEach((g) => (g.style.display = "none"));

    const style = document.createElement("style");
    style.textContent = `
      @page { size: A4; margin: 0; }
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body::before { display: none !important; }
    `;
    document.head.appendChild(style);

    const restore = () => {
      style.remove();
      guides.forEach((g) => (g.style.display = ""));
      Object.assign(page.style, pageSaved);
      ancestorSaved.forEach((s) => {
        s.el.style.overflow = s.overflow;
        s.el.style.transform = s.transform;
        s.el.style.position = s.position;
        s.el.style.visibility = s.visibility;
        s.el.style.background = s.background;
        s.el.style.display = s.display;
      });
      hiddenEls.forEach((h) => (h.el.style.display = h.prev));
      window.onafterprint = null;
    };

    const savedTitle = document.title;
    const nameMatch = markdown.match(/^# (.+)/m);
    document.title = nameMatch ? `${nameMatch[1]} Resume` : "Resume";

    const origRestore = restore;
    const restoreWithTitle = () => {
      origRestore();
      document.title = savedTitle;
    };
    window.onafterprint = restoreWithTitle;
    window.print();
  }, []);

  const handleShuffle = useCallback(() => {
    const others = RESUMES.filter((r) => r !== markdown);
    setMarkdown(others[Math.floor(Math.random() * others.length)]);
  }, [markdown]);

  const fits = measuredHeight <= maxH;
  const pct = Math.min((measuredHeight / maxH) * 100, 100);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <main className="flex-1 flex flex-col sm:flex-row bg-neutral-900 text-white min-h-0 overflow-hidden">
        {/* ── Mobile tab bar ─────────────────────────── */}
        <div className="sm:hidden flex border-b border-neutral-800 shrink-0">
          {[["editor", "Editor"], ["preview", "Preview"], ["settings", "Settings"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2.5 text-xs uppercase tracking-widest transition-colors ${
                activeTab === key
                  ? "text-white border-b-2 border-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Markdown editor ─────────────────────────── */}
        <div className={`flex-1 min-w-0 self-stretch border-r border-neutral-800 flex-col ${activeTab === "editor" ? "flex" : "hidden"} sm:flex`}>
          <div className="px-4 py-3 border-b border-neutral-800">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              Markdown
            </p>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent text-neutral-300 text-sm font-mono leading-relaxed p-4 resize-none outline-none ring-0 focus:outline-none focus:ring-0 border-none placeholder-neutral-600 pagefit-scrollbar"
            style={{ caretColor: "#fff" }}
          />
        </div>

        {/* ── A4 Page ─────────────────────────────────── */}
        <div ref={previewRef} className={`flex-1 min-w-0 items-center justify-center overflow-hidden p-4 sm:p-8 ${activeTab === "preview" ? "flex" : "hidden"} sm:flex`}>
          <div
            ref={pageRef}
            data-pagefit-page
            className="relative bg-white shadow-2xl shadow-black/50 shrink-0"
            style={{
              width: PAGE_W,
              height: PAGE_H,
              overflow: "hidden",
              transform: `scale(${pageScale})`,
              transformOrigin: "center center",
            }}
          >
            {positioned.map((item, i) => {
              if (item.type === "hr") {
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: padding,
                      right: padding,
                      top: item.y,
                      height: 1,
                      backgroundColor: "#ddd",
                    }}
                  />
                );
              }
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: item.x,
                    top: item.y,
                    fontSize: item.fontSize,
                    fontWeight: item.fontWeight,
                    fontFamily: FONT,
                    lineHeight: `${item.lineHeight}px`,
                    color: item.color,
                    whiteSpace: "pre",
                  }}
                >
                  {item.text}
                </div>
              );
            })}

            <div
              data-margin-guide
              className="absolute pointer-events-none"
              style={{
                top: padding,
                left: padding,
                right: padding,
                bottom: padding,
                border: "1px dashed rgba(0,0,0,0.12)",
              }}
            />

            {!fits && (
              <div
                data-overflow
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: 48,
                  background: "linear-gradient(transparent, rgba(248,113,113,0.18))",
                  borderBottom: "2px solid rgb(248,113,113)",
                }}
              />
            )}
          </div>
        </div>

        {/* ── Right panel ─────────────────────────────── */}
        <div className={`w-full sm:w-72 sm:shrink-0 self-stretch sm:border-l border-neutral-800 px-5 py-4 flex-col gap-4 overflow-y-auto ${activeTab === "settings" ? "flex" : "hidden"} sm:flex`}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Always Fit Resume
              </h1>
              <a
                href="https://github.com/vladartym/always-fit-resume"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            </div>
            <div className="text-neutral-400 text-sm leading-relaxed space-y-2">
              <p>
                A resume builder using{" "}
                <a
                  href="https://github.com/chenglou/pretext"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 underline underline-offset-2 hover:text-white transition-colors"
                >
                  pretext
                </a>
                {" "}for instant, DOM-free text measurement.
              </p>
              <p>
                Write markdown on the left. The preview auto-scales <span className="font-semibold text-neutral-300">font size</span> and <span className="font-semibold text-neutral-300">line spacing</span> to fit everything on one A4 page.
              </p>
            </div>
            <button
              onClick={handleShuffle}
              className="mt-3 w-full px-3 py-2 text-sm font-medium border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
            >
              Shuffle Resume
            </button>
          </div>

          {/* Auto-fit toggle */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              Auto-fit
            </p>
            <button
              onClick={() => setAutoFit(!autoFit)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                autoFit ? "bg-emerald-500" : "bg-neutral-700"
              }`}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ left: 2, transform: autoFit ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
          </div>

          {/* Max Font Size */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              Max Font Size
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={8}
                max={24}
                step={0.5}
                value={maxFontSize}
                onChange={(e) => setMaxFontSize(parseFloat(e.target.value))}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-16 text-right">
                {maxFontSize}px
              </span>
            </div>
          </div>

          {/* Font scale */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              Font Scale
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={6}
                max={24}
                step={0.01}
                value={fontSize}
                onChange={handleSlider}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-16 text-right">
                {((fontSize / 16) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Line Spacing */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              Line Spacing
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={LH_MIN}
                max={LH_MAX}
                step={0.001}
                value={lineHeightMult}
                onChange={handleLineHeightSlider}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-14 text-right">
                {lineHeightMult.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* Margin */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              Page Margin
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={16}
                max={80}
                step={1}
                value={padding}
                onChange={(e) => setPadding(parseInt(e.target.value))}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-14 text-right">
                {padding}px
              </span>
            </div>
          </div>

          {/* Section Spacing */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Section Spacing
              </p>
              <span className="relative group/tip">
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-600 text-neutral-500 text-[9px] font-medium flex items-center justify-center cursor-default">i</span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 text-xs text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-md w-48 opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">Gap before section headers like Experience, Education, and Skills.</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={48}
                step={1}
                value={sectionSpacing}
                onChange={(e) => setSectionSpacing(parseInt(e.target.value))}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-14 text-right">
                {sectionSpacing}px
              </span>
            </div>
          </div>

          {/* Item Spacing */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Item Spacing
              </p>
              <span className="relative group/tip">
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-600 text-neutral-500 text-[9px] font-medium flex items-center justify-center cursor-default">i</span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 text-xs text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-md w-48 opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">Gap between entries within a section, like between different jobs or degrees.</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={itemSpacing}
                onChange={(e) => setItemSpacing(parseFloat(e.target.value))}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-14 text-right">
                {itemSpacing}px
              </span>
            </div>
          </div>

          {/* Separator Spacing */}
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <p className="text-xs text-neutral-500 uppercase tracking-widest">
                Separator Spacing
              </p>
              <span className="relative group/tip">
                <span className="w-3.5 h-3.5 rounded-full border border-neutral-600 text-neutral-500 text-[9px] font-medium flex items-center justify-center cursor-default">i</span>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2.5 py-1.5 text-xs text-neutral-300 bg-neutral-800 border border-neutral-700 rounded-md w-48 opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity">Padding above and below the horizontal rule divider.</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={30}
                step={1}
                value={separatorSpacing}
                onChange={(e) => setSeparatorSpacing(parseInt(e.target.value))}
                className="flex-1 h-1 accent-white"
              />
              <span className="text-sm font-mono tabular-nums w-14 text-right">
                {separatorSpacing}px
              </span>
            </div>
          </div>

          {/* Page fit */}
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1.5">
              Page Fit
            </p>
            <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${pct}%`,
                  backgroundColor: fits ? "rgb(52, 211, 153)" : "rgb(248, 113, 113)",
                }}
              />
            </div>
            <div className="flex items-baseline justify-between text-xs">
              <span className={`font-medium ${fits ? "text-emerald-400" : "text-red-400"}`}>
                {fits ? "Fits on 1 page" : `Overflow +${measuredHeight - maxH}px`}
              </span>
              <span className="text-neutral-600 font-mono tabular-nums">
                {measuredHeight}/{maxH}px · {measureTime}ms
              </span>
            </div>
          </div>

          {/* Export */}
          <button
            onClick={handleExportPdf}
            className="mt-auto w-full px-3 py-2 text-sm font-medium bg-white text-neutral-900 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Export as PDF
          </button>
        </div>
      </main>
    </div>
  );
}
