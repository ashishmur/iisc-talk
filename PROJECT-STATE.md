# IISc Talk: AI & The New Management Playbook
## Project State (last updated: March 6, 2026 — talk day)

## Event Details
- **Date:** Friday March 6, 2026 (TODAY)
- **Time:** Originally 11:00-12:30, check if updated
- **Venue:** IISc DoMS seminar hall, 80-seat capacity, projector (16:9)
- **Audience:** Cross-departmental: M.Mgt, PhD, engineering, science students
- **Duration:** 90 min (60 min talk + 25-30 min Q&A)
- **Faculty sponsor:** Prof. Shashi Jain (shashijain@iisc.ac.in)
- **Student coordinator:** S Vaishnav Ghautham (vaishnavs@iisc.ac.in)
- **Notion page:** 30f4e3eb-1ff4-81fc-bc1f-c0df5a7df45d

## File Structure
```
~/claude_personal/iisc-talk/
  TALK-NARRATIVE.md          -- Master narrative (updated with research)
  deck-prototypes/
    index.html               -- Landing page (7 concepts)
    concept-a-editorial.html -- 34 slides, Playfair Display, gold, clip-path wipe
    concept-b-terminal.html  -- 34 slides, JetBrains Mono, particles, typewriter
    concept-c-cinematic.html -- 34 slides, DM Serif Display, iris reveal, mesh gradient
    concept-d-aurora.html    -- 34 slides, Inter, canvas aurora, glassmorphism
    concept-e-brutalist.html -- 34 slides, Space Grotesk, B&W+red, hard-cut
    concept-f-hybrid.html    -- 34 slides, Terminal+Brutalist merged, SVG visualizations
    concept-g-neon.html      -- 38 slides, PRIMARY DECK, Neon Noir (see below)
    poll/                    -- Firebase live poll system (QR + real-time results)
      poll-config.js         -- Firebase config (needs real credentials)
      vote.html              -- Mobile voting page
      poll-widget.js         -- Presenter widget with QR + bar chart
      presenter-slide.html   -- Standalone presenter poll page
      test-local.html        -- Local test harness
      SETUP.md               -- Setup guide
    screenshots/             -- Tweet screenshots + headshot photos
      sam-altman-headshot.png, daron-acemoglu-headshot.png, david-autor-headshot.png, daniel-susskind-headshot.png
      andrej-karpathy-headshot.png, boris-cherny-headshot.png, dario-amodei-headshot.png, satya-nadella-headshot.png
      karpathy-vibe-coding-tweet.png, naval-*.png, aakash-*.png, ashish-*.png
      logos/                 -- 16 company favicons (64x64 PNG) for agent examples
        anthropic.png, cursor.png, github.png, devin.png, perplexity.png, google.png,
        elicit.png, sierra.png, intercom.png, zendesk.png, julius.png, databricks.png,
        microsoft.png, jasper.png, canva.png, midjourney.png
    SLIDE-PLAN-34.md         -- Master 34-slide content plan
    DESIGN-REFERENCES.md     -- All Behance links + design principles
    RESEARCH-DATA.md         -- Economic cycle data, VUCA examples, Perez waves, GDP data
    feedback-voice-memo.md   -- Feedback 1: likes Terminal+Brutalist, hates scramble
    feedback-voice-memo-2.md -- Feedback 2: improve narrative, add frameworks, tweet screenshots
    feedback-voice-memo-3.md -- Feedback 3: font exploration, QR poll, VUCA examples, economic graphs, formula
    feedback-voice-memo-4.md -- Feedback 4: MAJOR restructure, reorder, new slides, narrative philosophy
```

## Decision: Primary Deck
- **Primary:** concept-g-neon.html (Neon Noir)
- **Backups:** concept-b-terminal.html and concept-f-hybrid.html
- Ashish said: "Let's start with the neon noir template first and then we can take it to the other templates later if required."

## Neon Noir Design Specs
- **Font:** Geist (headlines, changed from Space Grotesk per feedback) + Inter (body)
- **Palette:** Deep black #08080C, surface #111118, electric blue #3B82F6, hot magenta #EC4899
- **Animations:** Typewriter headlines (25ms/char), neon glow on key words, staggered reveals, NO text scramble
- **Visualizations:** 8 slides have SVG diagrams (neon circles, stacked blocks, glowing bars, vertical meter, diamond nodes, pipeline, hexagons, icon cards)
- **Transitions:** Smooth opacity + translateY, 600ms

## Updates Applied to Neon Noir (all voice memos 1-4 + latest session)
1. Font changed to Geist (from Space Grotesk)
2. Slide 2: Live poll with animated bar chart, dummy vote simulation (142 votes), pulsing "LIVE RESULTS" indicator
3. Slide 4 (VUCA): Real examples (NVIDIA $589B loss, Goldman zero productivity, 1.2M layoffs, HBR burnout). Ambiguity changed to McKinsey vs Goldman measurement paradox.
4. Slide 5 (Production Function): Renamed from "Economic Equation", A = Total Factor Productivity
5. **Slides 6-8 MERGED into 2 slides** (35 -> 34 total):
   - Slide 6: "Waves of Creative Destruction" with GDP graph + Lump of Labor Fallacy card + job creation examples
   - Slide 7: "Each Wave Climbed Higher" with disruption hierarchy cards + 3-step ladder + employment data
6. **NEW Slide 9: Conflicting Views** (Sam Altman, Acemoglu, Autor, Susskind + lump of labor fallacy)
7. **NEW Slide 10: AI Intelligence Progression** (GPT-1 through Agents timeline, bar exam data)
8. Slide 11 (5 Levels of AGI): Added Bloomberg source link
9. Slide 12: "What is an Agent?" slide REMOVED per feedback
10. Slide 15 (Voices): Karpathy + Naval tweet screenshots embedded as base64
11. Slide 16 (Cost = Zero): Added real data cards (YC 25% AI-generated, Pieter Levels $1M/17 days, Replit CEO quote)
12. **NEW Slide 17: Role Fusion / The Builder** (Boris Cherny quote, 3 trends: fewer engineers, merging roles, builder emerges)
13. Slide 18-19: Reordered (Real Consequences BEFORE Distribution)
14. Slide 19 (Distribution): Blue Ocean/Red Ocean definitions on slide, better intro about bottleneck shift
15. **NEW Slide 20: Diffusion Problem** (Context + Physical World barriers, robots moved here)
16. Slide 22 (Two Paths): Reframed as Augment vs Replace, added Block/Klarna/hiring news
17. Typewriter data cleaned up, all 34 slides numbered correctly
18. Closing slide 34: "Go build something." with neon glow
19. **Slide 4 (VUCA):** Added Trudeau Davos punchline + S&P 500 company lifespan stat (67yr -> 15yr)
20. **Slide 6 (Carousel):** Removed auto-advance, manual arrows only
21. **Slide 9 (Ceiling Quote):** Redesigned as centered typography with "intellectual labor" magenta glow
22. **Slide 10 (Conflicting Views):** Real headshot photos (Wikipedia) replacing SVG letter avatars, source links on all 4 cards
23. **Slide 11 (AI Progression):** Benchmark definitions panel (SWE-bench, GPQA, AIME, Arena ELO, LiveCodeBench), real-world signal stats, sub-page scroll works with deck navigation
24. **Slide 12 (AGI):** Kurzweil exponential chart with 12 milestone events from Life (3.8B yrs) to Singularity (2045?)
25. **Removed slides 15 (Why Software First) and 16 (single engineers quote)** - merged content into Cost=Zero
26. **Moved Real Consequences** to position 15 (after AI Adoption)
27. **Slide 15 (Real Consequences):** Rebuilt with 6 news headline cards (Block, Klarna, Salesforce, TCS, India IT, US macro) with Fortune/CNBC source links
28. **Slide 16 (Voices):** 4 compact tweet cards (Karpathy earthquake, Boris Cherny 259 PRs, Karpathy vibe coding, Dario Amodei 90% code) with source links, Google/Pragmatic Engineer footer stats
29. **Click navigation:** Guards interactive elements (buttons, links) from triggering deck page changes
30. Total: 36 -> 34 slides after removing 2 redundant ones
31. **Slide 5 (Production Function):** Reordered: Satya Nadella GDP quote first, then formula, then definitions, then punchline. Headshot photo.
32. **Slide 7 (Technology Democratizes):** Split into Yesterday (Typing, Photography) / Today (Engineering, New Expectation, "skill is knowing what to build") columns
33. **Slide 11 (AI Progression):** Added Page 4: Benchmark Saturation (GSM8K 99%, MMLU 93%, HumanEval 98%, GPQA 92%, AIME 100% all saturated). Humanity's Last Exam (Opus 53.1%, Gemini 48.4%, GPT-5.3 39.9%). FrontierMath Tier 4 (GPT-5.2 Pro 31%). Dario Amodei "country of geniuses in the data center" quote. Now 4 scrollable pages.
34. **Slide 11:** Added HLE + FrontierMath definitions to "What These Measure" panel
35. **Slide 11:** Added announcement links to all model timeline entries, corrected GPT-5 AIME from 100% to 94.6%
36. **Slide 16 (Voices):** Redesigned as white Twitter/X-style cards with real profile photos (Karpathy, Boris Cherny, Dario Amodei from Wikipedia/GitHub), verified badges, X logos
37. **Slide 12 (AGI) Page 2: Agents Expanded View** -- pressing next arrow on slide 12 crossfades from Kurzweil graph to agent detail view:
    - Compact breadcrumb pills: L1 Chatbots (done) > L2 Reasoners (done) > L3 Agents (current, glowing) > L4 Innovators (future) > L5 Organizations (future) + "WE ARE HERE - 2025"
    - Left column: Agent definition with 3 colored-border cards (Plan/Reason, Act with Tools, Context/Memory)
    - Right column: 5 agent category cards (Coding, Research, Customer Service, Data Analysis, Creative) with real company favicon logos
    - Company logos: Claude Code, Cursor, GitHub Copilot, Devin, Perplexity, Google Deep Research, Elicit, Sierra AI, Intercom Fin, Zendesk AI, Julius AI, Databricks, Microsoft Copilot, Jasper, Canva AI, Midjourney
    - YouTube play buttons on each category card open popup windows (window.open, not iframe due to file:// restrictions)
    - Videos: Devin launch demo, Google Deep Research roundtable, Intercom Fin demo, Microsoft Copilot Analyst, Adobe Firefly trailer
    - CSS crossfade transition with translateX + opacity + cubic-bezier easing
    - Staggered card animations on reveal
38. **Slide 12:** Sub-page navigation (agiSubPage state) integrated into next()/prev() functions, resets on slide change
39. **Slide 15 (Real Consequences):** Complete redesign: white-background news headline cards (mimicking article screenshots). Publication name (FORTUNE/CNBC/BUSINESS TODAY) with colored dot + date. Consistent 14px bold headlines across all 6 cards. Numbers now self-explanatory in headlines ("Block lays off 4,000 of 10,000+", "Salesforce CEO confirms 4,000 layoffs"). "CLOSER TO HOME" promoted to proper section heading with blue underline. Left column = global (red), right column = India (blue). Replaced US jobs card with India-specific "Top 5 IT firms shed 57,891 employees" (Storyboard18).
40. **Slide 17 (Cost = Zero):** Complete redesign. Hero quote with Amjad Masad attribution at top. Replaced 3-card layout with 2x3 data grid: YC 25% AI codebases (TechCrunch), Google 30%+ AI code (Pichai), Anthropic ~100% AI code (CPO), GitHub Copilot 46%/20M users (GitHub), Cursor $2B ARR doubled in 3 months (TechBuzz), $456K ARR app by non-developer (State of Vibecoding). "20 agents / team of 40" quote given proper centered typography with neon glow keywords. Removed Pieter Levels stat (unclear), removed overflow box issue.
41. **Slide 18 (Rise of the Builder):** Complete redesign as two-column layout. Left column: 3 neon-card trend cards (fewer engineers, roles merging, builder emerges) + Ashish's personal statement with magenta left-border ("This entire deck was built through vibe coding. I wrote zero lines of code. I have no training in writing code."). Right column: 4 white Twitter-style voice cards: Boris Cherny (real headshot, LENNY'S PODCAST badge, Fortune link), Naval Ravikant (X logo, verified badge, "Vibe coding is the new product management"), Garry Tan/YC CEO (Vanta link, "everyone's a PM now"), Jackie Bavaro/Cracking the PM Interview (Substack link, "dream come true for PMs"). All cards have source links.
42. **NEW Slide 19 (The PM's Moment):** Core insight: PM controls risk while enabling innovation, biggest risk was cost of production, that constraint disappeared. Old process (faded: Idea > PRD > Debate > Prioritize > 3-5 months > Ship) vs New process (bright: Idea > AI Brainstorm > Prototype in days > Team experiences it > Refine > Ship, sourced to Madhu Gurumurthy, Head of Product, Google Gemini). "What Falls Away" (resource allocation, stakeholder mgmt, influence without authority) vs "What Remains" (customer understanding, strategic vision, building moats). Punchline: "Delivery doesn't differentiate anymore. Vision does."
43. **NEW Slide 20 (The New Expectations):** PMs were always cross-functional, now expected to DO all those jobs. Left column: Google (vibe coding interview for PM candidates, Aakash Gupta source), Meta (PMs vibe coding for Zuckerberg, Joseph Spisak quote), company pills (Stripe, Netflix, Figma, Perplexity, Vercel also adding rounds). Right column: Zevi Arnovitz white card (Meta PM, no tech background, "Everyone's going to become a builder", Business Insider/Lenny's Podcast), Visualize card (Figma AI, v0), Prototype = Proof card ("If you can vibe code it, it's feasible"). Footer: CMU teaches vibe coding to PM students + Collins Dictionary 2025 Word of the Year: vibe coding.
44. **Renumbered:** All slides 19-34 shifted to 21-36. Total now 36 slides.
45. **NEW Slide 24 (It's Already Happening):** 3x2 grid showing AI disruption beyond software: Legal (Harvey AI, $300M Series D), Media (Pocket FM, 100% AI-generated audio series), Marketing (Content Collapse, 85% agencies using AI), Healthcare (Insilico Medicine, AI-designed drug in clinical trials), Finance (Goldman Sachs + Devin, autonomous financial coding agents), Education (Chegg stock -99%, students switched to ChatGPT). Renumbered slides 23-36 → 24-37. Total: 37.
46. **NEW Slide 9 (ACT II: IS THIS TIME DIFFERENT?):** Added missing Act II divider between Act I (slide 3) and Act III (slide 15). Renumbered slides 9-37 → 10-38. Total now 38.
47. **Slide 20 (The PM's Moment) - Madhu tweet fix:** Replaced paraphrased "NEW PROCESS" box with Madhu Gurumurthy's actual tweet as white Twitter-style card: "At Google, we are moving from a writing-first culture to a building-first one. Writing was a proxy for clear thinking, optimized for scarce eng resources and long dev cycles. Now, when time to vibe-code prototype ≈ time to write PRD, PMs can SHOW not tell." Source linked to actual tweet (https://x.com/realmadhuguru/status/1950336434126336154).
48. **Slide 21 (The New Expectations) - SVG visualization:** Completely redesigned with inline SVG hub-and-spoke diagram. YESTERDAY: PM (white circle) coordinates Engineering, Design, Growth, Finance, Marketing. TODAY: Builder (magenta glowing circle) does codes, designs, scales, analyzes, markets. Evidence strip: Google, Meta, Microsoft, Stripe/Netflix/Figma/Perplexity/Vercel. Added Microsoft to companies requiring PM vibe coding. Punchline: "The prototype becomes the starting point."
49. **Slide 23 (Diffusion Problem) - Mike Rowe tweet:** Restructured layout: text paragraphs on left (software is ground zero + 100% digital work in disruption zone caveat), white Twitter-style Mike Rowe card on right ("We've been telling kids for 15 years to learn to code. Well, AI is coming for the coders. It's not coming for the welders, the plumbers..."). Source: PA Energy & Innovation Summit, Jul 2025 via @Holden_Culotta. Context + Physical World barrier cards below.
50. **Slide 36 (Age of the Polymath) - Full redesign:** Added da Vinci context to ground the "polymath" concept. New definition strip with magenta left-border: "poly·math" with IPA pronunciation, definition, "Leonardo da Vinci: painter, engineer, anatomist, architect, inventor. The original one-person team." and italic closer "AI is making this achievable for everyone." Background SVGs: Vitruvian Man (top-right, 7% opacity, blue-to-magenta gradient, circle + square + human figure with spread limbs) and compass arcs (bottom-left, 6% opacity, dashed blue strokes). Tweet cards (Altman + Ohanian) now side-by-side in 2-column sub-grid with smaller avatars and trimmed quotes. Column spacing tightened.
51. **Slide 38 (Closing) - Text update:** Changed "The playbook is yours. The only variable is you." to "The moment is yours, the only variable is you."

## Current Slide Order (38 slides)
1. Title | 2. Anxiety Poll (live bar chart + survey page) | 3. ACT I: We've Been Here Before | 4. VUCA (Trudeau quote + S&P 500 stat) | 5. Production Function (Satya Nadella GDP quote, Cobb-Douglas) | 6. Waves of Creative Destruction (GDP graph + headlines carousel, manual arrows only) | 7. Technology Democratizes (Yesterday/Today split) | 8. Each Wave Climbed Higher | 9. ACT II: Is This Time Different? | 10. Ceiling Quote (centered typography, magenta glow) | 11. Conflicting Views (real headshot photos, source links) | 12. AI Progression (4-page scroll: timeline, frontier models, SWE-bench, benchmark saturation + HLE + FrontierMath + Dario quote) | 13. 5 Levels of AGI (Kurzweil chart + page 2: agent definition, examples with logos, YouTube demos) | 14. AI Adoption Across Industries | 15. ACT III: Ground Zero Software | 16. Real Consequences (6 news headline cards with sources) | 17. Voices from the Field (Twitter-style white cards: Karpathy x2, Boris Cherny, Dario Amodei, with real photos) | 18. Cost = Zero (+ single engineers card) | 19. Rise of the Builder | 20. The PM's Moment (Madhu Gurumurthy tweet card) | 21. The New Expectations (SVG hub-and-spoke visualization) | 22. The New Battle: Distribution | 23. Diffusion Problem (Mike Rowe tweet card) | 24. It's Already Happening (3x2 industry grid) | 25. ACT IV: Who Captures the Value | 26. Two Paths | 27. AI Value Chain | 28. Where Value Lives | 29. ACT V: From the Inside | 30. Microsoft's AI Journey | 31. Project Nebula | 32. The Learning | 33. ACT VI: Your Move | 34. AI Organizations | 35. Two Skills | 36. Age of the Polymath | 37. What You Should Do | 38. Closing

## GitHub Repository
- **Repo:** https://github.com/ashishmuralidharan/iisc-talk (private)
- **Branch:** main
- **Last push:** March 5, 2026 ~4:30 AM

## Still TODO
- [ ] **Firebase setup for live poll:** Replace dummy simulation with real Firebase voting. Create Firebase project, add credentials to poll-config.js, host poll/ folder. NOTE: survey.html now works via BroadcastChannel for local testing.
- [x] **Act naming:** Act II added ("IS THIS TIME DIFFERENT?"). All 6 acts now have divider slides.

## Narrative Changes Made to TALK-NARRATIVE.md
1. Disruption pattern: Replaced "Shipping" with Carlota Perez framework (Physical > Electrical > Information > Cognitive Power)
2. Blue Ocean Strategy + Porter's Five Forces: Full proper explanations with quotable lines
3. Economics section: Rewritten as "Two Paths" with real 2026 data (HBR burnout study, Goldman findings, Acemoglu stats)
4. Honest framing: Acknowledges "we don't know" with 5 schools of thought
5. Added 1.2M layoffs stat, Block 50% layoffs

## Research Artifacts Available
- **RESEARCH-DATA.md:** Full Perez wave timeline, GDP per capita (Maddison Project), Cobb-Douglas function, Acemoglu task model, animated graph data specification, VUCA examples with sources
- **DESIGN-REFERENCES.md:** 6 Behance inspirations with analysis, 10 synthesized design principles
- **Font research:** Geist (chosen), Sora (runner-up), Plus Jakarta Sans, Outfit. Details in agent output.

## Ashish's Preferences (from 4 voice memos)
- Likes: Terminal futurism, particle animations, typewriter effect, teal/neon colors, B&W+red contrast
- Hates: Text scramble effect ("painful, distracting")
- Wants: Real visualizations (not text lists), interactive elements (live poll), current news examples, economic graphs with real data, deeper research backing every claim
- Style: Don't claim uniqueness where not unique. Be honest about "we don't know." Properly explain frameworks (Blue Ocean, Porter's), don't just name-drop.
- Font: Geist chosen (Vercel's font, Swiss precision). Was considering Microsoft's Segoe UI (unavailable on Google Fonts).

## How to Serve the Deck
```bash
cd ~/claude_personal/iisc-talk/deck-prototypes
python3 -m http.server 8080
# Open http://localhost:8080 for landing page
# Open http://localhost:8080/concept-g-neon.html for primary deck
```

## Ashish's X/Twitter
- Handle: @ashishmur (NOT @ashish_m7)
- Bio: "Product @ Meesho | Psychonaut" (note: now at Microsoft, bio not updated)
- Relevant tweet: "AI isn't going to replace jobs! It is only a tool. Capitalism with its motive of profits will." (May 21, 2023)
- No tweets about the disruption pattern or IISc talk
