# IISc Talk: AI & The New Management Playbook
## Project State (last updated: March 5, 2026 ~3:30 AM)

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
    concept-g-neon.html      -- 35 slides, PRIMARY DECK, Neon Noir (see below)
    poll/                    -- Firebase live poll system (QR + real-time results)
      poll-config.js         -- Firebase config (needs real credentials)
      vote.html              -- Mobile voting page
      poll-widget.js         -- Presenter widget with QR + bar chart
      presenter-slide.html   -- Standalone presenter poll page
      test-local.html        -- Local test harness
      SETUP.md               -- Setup guide
    screenshots/             -- Tweet screenshots for embedding
      karpathy-vibe-coding-tweet.png
      naval-vibe-coding-short-tweet.png
      naval-vibe-coding-pm-tweet-full.png
      naval-vibe-coding-product-management-tweet.png
      aakash-gupta-naval-vibe-coding-pm-tweet.png
      ashish-profile-page.png
      ashish-ai-jobs-capitalism-tweet.png
      ashish-ai-capitalism-tweet-full.png
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

## Updates Applied to Neon Noir (all voice memos 1-4)
1. Font changed to Geist (from Space Grotesk)
2. Slide 2: QR code poll placeholder added, now clickable link
3. Slide 4 (VUCA): Real examples (NVIDIA $589B loss, Goldman zero productivity, 1.2M layoffs, HBR burnout)
4. Slide 5 (Production Function): Renamed from "Economic Equation", A = Total Factor Productivity
5. Slide 6: Disruption circles with explicit replacement explanations (Physical/Electrical/Information/Cognitive)
6. Slide 7 (Running Out of Rungs): Removed "Technology arrives" step, now 3 steps only
7. Slide 8 (Waves): Economic cycles graph with GDP per capita, Perez framework, crash markers
8. **NEW Slide 10: Conflicting Views** (Sam Altman, Acemoglu, Autor, Susskind + lump of labor fallacy)
9. **NEW Slide 11: AI Intelligence Progression** (GPT-1 through Agents timeline, bar exam data)
10. Slide 12 (5 Levels of AGI): Added Bloomberg source link
11. Slide 13: "What is an Agent?" slide REMOVED per feedback
12. Slide 16 (Voices): Karpathy + Naval tweet screenshots embedded as base64
13. Slide 17 (Cost = Zero): Added real data cards (YC 25% AI-generated, Pieter Levels $1M/17 days, Replit CEO quote)
14. **NEW Slide 18: Role Fusion / The Builder** (Boris Cherny quote, 3 trends: fewer engineers, merging roles, builder emerges)
15. Slide 19-20: Reordered (Real Consequences BEFORE Distribution)
16. Slide 20 (Distribution): Blue Ocean/Red Ocean definitions on slide, better intro about bottleneck shift
17. **NEW Slide 21: Diffusion Problem** (Context + Physical World barriers, robots moved here)
18. Slide 23 (Two Paths): Reframed as Augment vs Replace, added Block/Klarna/hiring news
19. Typewriter data cleaned up, all 35 slides numbered correctly
20. Closing slide 35: "Go build something." with neon glow

## Current Slide Order (35 slides)
1. Title | 2. Anxiety Poll | 3. ACT I: We've Been Here Before | 4. VUCA | 5. Production Function | 6. Disruption Pattern | 7. Running Out of Rungs | 8. Waves of Creative Destruction | 9. Ceiling Quote | 10. Conflicting Views | 11. AI Progression | 12. 5 Levels of AGI | 13. ACT III: Ground Zero Software | 14. Why Software First | 15. New Reality Quote | 16. Voices from the Field | 17. Cost = Zero | 18. Role Fusion / Builder | 19. Real Consequences | 20. The New Battle (Distribution) | 21. Diffusion Problem | 22. ACT IV: Who Captures the Value | 23. Two Paths | 24. AI Value Chain | 25. Where Value Lives | 26. ACT V: From the Inside | 27. Microsoft's AI Journey | 28. Project Nebula | 29. The Learning | 30. ACT VI: Your Move | 31. AI Organizations | 32. Two Skills | 33. Age of the Polymath | 34. What You Should Do | 35. Closing

## Still TODO
- [ ] **Firebase setup for live poll:** Create Firebase project, add credentials to poll-config.js, host poll/ folder
- [ ] **Notion doc update:** TALK-NARRATIVE.md updated locally but Notion token expired
- [ ] **Act naming:** More interesting narrative names for each act section divider
- [ ] **TALK-NARRATIVE.md update:** Sync master narrative to match new 35-slide structure

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
