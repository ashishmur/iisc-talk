# IISc Talk: AI & The New Management Playbook
## Project State (last updated: March 5, 2026 ~7:30 PM)

## Event Details
- **Date:** Friday March 6, 2026 (TOMORROW)
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
    concept-g-neon.html      -- 34 slides, PRIMARY DECK, Neon Noir (see below)
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

## Current Slide Order (34 slides)
1. Title | 2. Anxiety Poll (live bar chart + survey page) | 3. ACT I: We've Been Here Before | 4. VUCA (Trudeau quote + S&P 500 stat) | 5. Production Function (Satya Nadella GDP quote, Cobb-Douglas) | 6. Waves of Creative Destruction (GDP graph + headlines carousel, manual arrows only) | 7. Technology Democratizes (Yesterday/Today split) | 8. Each Wave Climbed Higher | 9. Ceiling Quote (centered typography, magenta glow) | 10. Conflicting Views (real headshot photos, source links) | 11. AI Progression (4-page scroll: timeline, frontier models, SWE-bench, benchmark saturation + HLE + FrontierMath + Dario quote) | 12. 5 Levels of AGI (Kurzweil exponential chart with milestones) | 13. ACT III: Ground Zero Software | 14. AI Adoption Across Industries | 15. Real Consequences (6 news headline cards with sources) | 16. Voices from the Field (Twitter-style white cards: Karpathy x2, Boris Cherny, Dario Amodei, with real photos) | 17. Cost = Zero (+ single engineers card) | 18. Role Fusion / Builder | 19. The New Battle: Distribution | 20. Diffusion Problem | 21. ACT IV: Who Captures the Value | 22. Two Paths | 23. AI Value Chain | 24. Where Value Lives | 25. ACT V: From the Inside | 26. Microsoft's AI Journey | 27. Project Nebula | 28. The Learning | 29. ACT VI: Your Move | 30. AI Organizations | 31. Two Skills | 32. Age of the Polymath | 33. What You Should Do | 34. Closing

## GitHub Repository
- **Repo:** https://github.com/ashishmuralidharan/iisc-talk (private)
- **Branch:** main
- **Last push:** March 5, 2026 ~4:30 AM

## Still TODO
- [ ] **Firebase setup for live poll:** Replace dummy simulation with real Firebase voting. Create Firebase project, add credentials to poll-config.js, host poll/ folder. NOTE: survey.html now works via BroadcastChannel for local testing.
- [ ] **Act naming:** More interesting narrative names for each act section divider

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
