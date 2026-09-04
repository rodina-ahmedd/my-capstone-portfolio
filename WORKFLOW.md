# WORKFLOW.md — Vague Prompt vs. Precise Prompt

## The Experiment

I built the same feature — a settings form with validation (display name,
email, website, bio, theme) — twice, on two separate branches, to compare
what changes when the AI prompt goes from vague to precise.

**Round 1** (`round1-lazy-settings-form`): a single, one-line prompt with
no context: "اعملي settings form فيه validation" (build a settings form
with validation). I accepted the output as-is.

**Round 2** (`round2-precise-settings-form`): a long, structured prompt
with explicit context (project stack, CLAUDE.md conventions), hard
constraints (no external form libraries, no unnecessary code-splitting,
every input must have an associated label, errors must use
aria-describedby), example behavior for each validation rule, and an
explicit verification step asking for unit tests to be written and run
before considering the task done.

## Correctness

Both rounds produced a working form with reasonable validation logic
(required fields, email format, optional website with protocol check,
character-limited bio). Functionally they covered the same rules. The
real difference showed up in the details: Round 2 was built against
explicit example behaviors ("if I type 'a' in Display name and blur, I
should see...") so every edge case named in the prompt was directly
testable and verified. Round 1 relied on the model's own judgment for
what "validation" means, so nothing guaranteed the edge cases actually
matched what I needed.

## Accessibility

This is where the vague prompt showed its weakest link. Because I never
mentioned accessibility in Round 1, I have no guarantee labels are
correctly associated with inputs or that error messages are exposed to
assistive tech. Round 2 explicitly required `htmlFor`/`id` label pairing,
`aria-describedby` linking errors to inputs, `aria-invalid` on invalid
fields, and `role="alert"` on the error text. None of that happens by
accident — it only exists because the prompt named it as a constraint.

## Edge Cases

Round 2 named specific edge cases up front (empty optional field, no
protocol on URL, one-character name) and I could verify each one against
an automated test. Round 1 had no such contract, so I could only "eyeball"
whether the behavior seemed right, with no repeatable way to check it later
if the code changed.

## The AI Mistake I Caught

In Round 1, the AI **misinterpreted the branch name** — `round1-lazy-settings-form`
was meant to signal "a lazy, low-effort prompt," but the model read "lazy"
literally and wrapped the entire form in `React.lazy` and `Suspense` for
code-splitting. This added unnecessary complexity (a separate chunk, a
loading fallback) for a small, always-visible form that never needed
lazy loading. It's a good example of an AI following a surface-level
signal (a file/branch name) instead of the actual intent, and it's exactly
the kind of thing a quick review catches but an "accept and move on"
workflow does not.

## Review Effort

Round 1's prompt took seconds to write, but the output needed a careful
read to catch the React.lazy issue and to manually verify accessibility
and edge cases with no test suite to lean on — all of that review time is
invisible until you go looking for it. Round 2's prompt took much longer
to write (several minutes, thinking through constraints and examples), and
the build+test cycle took longer end-to-end, but the review afterward was
mostly just reading the test output: 5/5 tests passing gave me confidence
without re-deriving what "correct" meant from scratch. Round 2 felt slower
while writing the prompt, but was faster overall once review time is
counted — the classic lesson: a lazy prompt moves the cost from prompt-writing
time into review-and-fix time, it does not remove it.

## Takeaway

A vague prompt is fastest to write but leaves correctness, accessibility,
and edge-case coverage entirely up to what the model happens to assume.
A precise prompt with explicit constraints and a verification step (tests)
converts "trust me" into "check this" — and that difference is the actual
skill being tested here, not typing speed.