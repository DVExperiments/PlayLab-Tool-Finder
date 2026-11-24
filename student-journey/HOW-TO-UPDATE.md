# Updating My Journey: Gens and key dates

Every Gen's official dates are in `const GENS` near the bottom of `student-journey/index.html`. The page uses them to work out, from today's date, which part and week each student is in, what's on this week, and what's coming up next.

The dates must match the student handbook. If they're different, the handbook is right: fix the date here.

On GitHub, open the file, select the pencil icon, press Ctrl+F (Cmd+F on a Mac) and search for `const GENS`. Make your change, then select **Commit changes**. Keep the quote marks, commas and brackets: a missing comma is the usual reason a page goes blank. Open the file's **History** to undo a change.

## Change a date

Find the Gen (e.g. `id:"gen31"`), then the part (`n:1`, `n:2` or `n:3`), then the date. All dates are written `"YYYY-MM-DD"`, for example `"2027-01-22"`.

- **Onsite days, full online days and Part 3 workshops** are in `days`.
- **Assessments** are in `due`. `kind` is `"formative"` or `"summative"`. Add `time:"12pm"` if the handbook gives a time.
- **Presentations and pitches** are in `events`. For a run of days, add `end:` with the last day.
- **Weekly sessions** are in `sessions`: `when` is what students see (e.g. "Thursdays, 3:30–5:30pm") and `dates` lists every session.
- **Study breaks and Christmas breaks** are in `breaks` at the top of each Gen: `["Study break", first day, last day]`.
- Add `note:"..."` to anything to show a short message under it, for example "On a Thursday because Friday is a public holiday."

Only put things students should see. Internal notes (handbook issues to fix, LMS setup, who to tell) shouldn't go in this file, because it's public.

## Week numbers

The page counts weeks from each part's first day. Weeks with no sessions or deadlines over the holidays aren't counted, so the numbers match the handbook. To help it, give onsite days the week the handbook lists with `wk:` (e.g. `wk:15`). If a handbook week label doesn't match the dates, the page goes with the dates.

Part 3 has no week numbers, because it's workshops only.

## Part 3: full and part time

Part 3 has `endFT` (20 weeks) and `endPT` (40 weeks). Mark anything that's only for one group with `mode:"ft"` or `mode:"pt"`. Students choose full or part time at the top of the page once they reach Part 3, and then see only their workshops and deadlines.

## Add a new Gen

Copy a whole Gen, from its `{id:` to the `]},` that closes it, and paste it at the top of the list. Then change:

1. `id`, `name` and `intake`, e.g. `id:"gen32", name:"Gen32", intake:"March 2027"`.
2. `breaks`.
3. Every date in each part.

If Part 2 or 3 dates aren't confirmed yet, delete that part. The page shows what it has.

## Remove a finished Gen

Delete everything from the Gen's `{id:` to the `]},` that closes it.

## Link straight to a Gen

Add `?gen=gen31` to the end of the page's link. Students only need to choose their Gen once; it's remembered in their browser.
