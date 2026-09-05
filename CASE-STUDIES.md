# Voice Card

Light-hearted, plain, short sentences, no jargon, honest.
No generic phrases like "results-driven" or "passionate about."

---

# Bio

Frontend dev intern. I build things, break them, then figure out why — usually with AI in the loop, but always with my own tests to prove it works. Right now I'm turning real internship projects into proof I can ship things that actually hold up.

---

# Case Study: Settings Form with Validation

**The problem**
I needed proof I could build a UI component that handles user data correctly, without bugs, in a way that could scale to a real project — like this portfolio itself.

**Attempt one: the fast way**
I wrote a one-line prompt with no details. The AI built a working form — but it also added lazy-loading code (React.lazy) for no reason. Why? My branch was named "lazy," and the AI picked up on that instead of the actual task. It ran with the first interpretation it found, even though it was wrong.

Worse, I had no way to check the validation logic without testing every case by hand.

That's when it hit me: if I don't guide the AI closely, it guesses. And "looks fine" isn't the same as "proven correct."

**Attempt two: the careful way**
This time I wrote a longer, specific prompt. It included:
- Project context (React + Vite)
- Clear constraints ("don't use React.lazy," "every input needs a properly linked label")
- Exact behavior examples ("if the name field has only one character, show this error")

I left nothing for the AI to guess.

I also asked for unit tests to be written and run before calling anything done. I tested 5 cases:
1. Name rejected if under 2 characters
2. Website field allowed to be empty (it's optional)
3. Website rejected if missing http:// or https://
4. Success message shows when everything's valid
5. Email rejected if the format is wrong

I picked these because they're the exact things people skip when they're rushing.

**The result**
5/5 tests passed. That was the first time I had actual proof the code worked — not just a feeling that it looked okay. If I change something later, I'll know immediately if I broke it.

**What I learned**
A detailed prompt takes longer to write but saves way more time in fixing things later. I also learned I have to spell out things that feel obvious to me — like accessibility, or not adding unnecessary code — because they're not obvious to the AI. Now I always write detailed prompts, and I always ask for a verification step before calling something finished.

---

# Contact / CTA

Curious how the code actually works? Check the repo (https://github.com/rodina-ahmedd/my-capstone-portfolio) or say hi (ra745126@gmail.com) — I like talking through the decisions, not just showing the result.

---

# Before / After: Generic AI Phrase vs. My Voice

**Before (generic, could be written by anyone):**
"This project demonstrates my ability to leverage AI tools effectively to deliver high-quality, scalable solutions while maintaining best practices."

**After (my voice):**
"First try, the AI added code I didn't need because it misread my branch name. Second try, I wrote it down properly, tested every edge case, and got 5/5 passing. That's when I trusted it was actually done."