# Prompt Ladder: Build a Portfolio Website

## Baseline (weak prompt)
**Prompt:** `Build a website`

**Output:** The AI refused to produce anything and asked clarifying
questions (what kind of site, what's it for). Zero code, zero content.

---

## Version 1 — Add a clearer goal + basic context
**Prompt:** `Build a website for my personal portfolio as a frontend development intern.`

**What changed in the prompt:** Added the purpose and my role.

**What actually improved in the output:** The AI stopped asking generic
questions ("what kind of site?") and instead asked *targeted* questions
specific to a dev portfolio (tech stack, projects, contact info). It also
said it would design something distinct rather than a generic template.

**What still failed:** Still zero execution — no code or content, just
better questions.

**What I'd try next:** Answer those questions directly inside the prompt
instead of waiting for the AI to ask.

---

## Version 2 — Add real, specific context
**Prompt:** Added name, actual skills (React, JS, Vite, accessibility,
Vitest), the featured project, and a real GitHub link.

**What actually improved in the output:** The AI finally *built something*
— first real output in the whole ladder. It also connected the visual
design to the actual project content (validation states, test-report
styling) instead of using generic portfolio decoration. Real information
didn't just fill blanks — it changed the creative direction.

**What still failed:** Delivered as a single HTML file, not matching my
real React + Vite stack. No defined file structure. No way to verify any
of its claims.

**What I'd try next:** Specify the exact output format and file structure.

---

## Version 3 — Add a specified output format
**Prompt:** Added: build as React + Vite project, specific component
files (Hero/About/Projects/Contact.jsx), plain CSS only.

**What actually improved in the output:** Code is now split into
components matching my real stack, so it's actually usable and editable
going forward — not a throwaway demo file. Unprompted, the AI also added
a real test file (Contact.test.jsx) and confirmed the build passed,
apparently inferring that "testing" as a stated skill should show up in
the deliverable too.

**What still failed:** The AI invented placeholder bio content and
described my project with guessed details, telling me to "double check"
them — meaning wrong information could easily have shipped unnoticed.

**What I'd try next:** Add explicit constraints against inventing content
and against unnecessary dependencies.

---

## Version 4 — Add constraints
**Prompt:** Added: no external npm packages beyond React, don't invent
missing details (mark with [TODO] instead), plain/direct tone, no
marketing language.

**What actually improved in the output:** This was the biggest jump.
Instead of guessing a bio or project description, the AI explicitly
marked two spots with `[TODO: add detail]` rather than inventing content
— directly fixing the Version 3 problem. It also confirmed only
react/react-dom were added as runtime deps, honoring the "no extra
packages" rule.

**What still failed:** I still only had the AI's word that the build
worked and the dependency rule was followed — no actual proof was shown.

**What I'd try next:** Require the AI to show real proof (exact file
contents, real terminal output) instead of just asserting it followed
the rules.

---

## Version 5 — Add a verification requirement
**Prompt:** Added: show the exact package.json dependencies, and paste
the real terminal output of a production build.

**What actually improved in the output:** I could verify claims instead
of trusting them — saw the literal dependency list (only react/react-dom)
and the actual `vite build` output with real file sizes and a real
success line, not a summary.

**What still failed — honestly:** This layer did NOT improve the content
quality at all. The structure, the TODOs, the design were identical to
Version 4. This layer only improved my confidence in the AI's claims, not
the deliverable itself. This is the one layer where I have to be honest
that it "didn't help" the actual output — it just made the existing
output verifiable rather than better.

**What I'd try next:** If continuing, I'd add explicit quality criteria
(e.g. "the About bio should sound like a specific person, not a company")
since content quality, not structure, is now the biggest gap.

---

## Final Reusable Prompt

\`\`\`
Build a personal portfolio website. I'm a [YOUR ROLE, e.g. "frontend development intern"].

Context:
- Name: [YOUR NAME]
- Skills to highlight: [LIST YOUR ACTUAL SKILLS]
- Featured project(s): [PROJECT NAME + WHAT IT DEMONSTRATES]
- Contact: [GITHUB / EMAIL / LINKS]

Output format:
Build it as a React + Vite project (not a single HTML file). Structure it
as separate components under src/components/, one file per section
(Hero, About, Projects, Contact). Use plain CSS, no component libraries.

Constraints:
- No external npm packages beyond React and Vite's default scaffold
- Do not invent details I didn't give you — mark anything missing with
  [TODO: add detail] instead of guessing
- Plain, direct tone — no marketing language ("passionate", "results-driven")

Verification:
After building, show the exact package.json dependencies so I can confirm
nothing extra was added, and paste the real terminal output of a
production build (not a summary claiming it worked).
\`\`\`

**Tested as a stranger would use it:** Ran this exact prompt with the
bracketed placeholders left unfilled to see how it degrades. Result: the
AI still produced the correct file structure and correctly marked every
missing piece of information as `[TODO: add ...]` instead of inventing
placeholder content — confirming the prompt holds up even when someone
else runs it with incomplete information.