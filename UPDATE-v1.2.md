# Install v1.2

This update adds a plain × close control, a blue P favicon, richer card/panel descriptions and a merged 71-tool master workbook.

## Before updating

Download a backup of your current data/tools.xlsx if you have edited it since the earlier guide. This workbook was merged from the 37-tool guide shared in this conversation and the new attached 42-row text list. It cannot include edits made only in your repository. Compare or copy those edits into the supplied workbook before replacing yours.

## Upload

1. Extract the ZIP.
2. Upload `index.html`, `app.js`, `style.css`, `favicon.svg` and `favicon.ico` into the repository root, replacing the existing versions.
3. Upload the contents of the supplied `data` folder into your repository's existing `data` folder. This includes `tools.xlsx`, the merged Excel master. The worksheet must remain named Tools and row 1 must retain its headers. The workflow uses this workbook ahead of CSV.
4. Replace `.github/workflows/pages.yml` with the supplied file. If you customised your workflow, add `favicon.svg favicon.ico` to its `cp index.html style.css app.js README.md ... _site/` command instead. Preserve its covers-copy step.
5. Commit the changes to main, wait for the Pages workflow, then hard-refresh with Ctrl+F5. Browser tab icons sometimes need the tab closed and reopened.
6. Leave your existing covers folder untouched. Existing tool IDs are unchanged, so images keep matching. New tools can use covers/<id>.png too.

The supplied workflow uses main, as in v1. No scripts/convert.py change is needed for the extra columns. No new software installs are needed on your computer.

## Workbook contents

- Tools: 71 unique published tools with stable IDs; 8 previous tools matched and 34 were added.
- Imported notes: all 42 supplied rows, retained unchanged as source material.
- Read me: editing guidance and verification notes.

The Tools sheet has additional columns for student_activity, account_required, tier_status, source and free_notes_raw. The first three enrich the panels. Original raw notes stay available for curation and are not displayed in the panel. Like the workbook itself, data files in a public repository are public.

Not all supplied numerical/AI quotas have been verified. Product-mixed notes (Codespaces vs Actions and StackBlitz vs Bolt) are separated in the summaries. Soundtrap is not labelled as an established ongoing free tier. Plan-review status is shown per tool. Keep last_checked as YYYY-MM-DD text. A recorded date means the stated targeted check, not a complete vendor review.

This pack contains no replacement cover images. Some existing covers already contain a title/footer; those image-embedded titles remain as supplied.

## Checks performed

JavaScript syntax, 71 unique valid tool records, the exported Excel file read back through the production converter, representative imported notes, and visual workbook previews. Actual browser layout and publishing on your GitHub repository have not been tested here.
