# PlayLab Tool Finder · Owner guide

A buildless, responsive directory for GitHub Pages. Tool cards open a right-hand details panel; close it with ×, Escape, or the backdrop. Includes search, category, cost and learning filters, sorting and similar tools. No student accounts or paid services required. Local monogram icons keep the directory independent of external logo services.

## 1. Put the website on GitHub

1. Extract the ZIP on your computer.
2. On GitHub, create a public repository named `playlab-tool-finder`. Choose `main` as its default branch. A public repository is the simplest free Pages route. All uploaded data will be public: keep private notes out.
3. Upload the CONTENTS of this folder into the repository root, not the outer folder or ZIP. `index.html`, `app.js`, `style.css`, `data`, `scripts` and `.github` should all be at the root. Use **Add file → Upload files**, then **Commit changes**. Check that `.github/workflows/pages.yml` was included: Windows may hide folders beginning with a dot. If missing, choose **Add file → Create new file**, enter `.github/workflows/pages.yml` as the filename, paste the supplied workflow text, and commit.
4. Open **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open **Actions → Build and publish Tool Finder**. If necessary choose **Run workflow → main → Run workflow**. Wait for build and deploy to turn green. The deploy job supplies the actual website URL, normally `https://YOUR-USERNAME.github.io/playlab-tool-finder/`.
6. Open that URL, try filters, open a card and close it. Bookmark and share the website URL, not the repository URL.

GitHub may ask you to enable Actions on the repository. If an upload creates a different default branch, either rename it main or update the branch under `on: push: branches` in the workflow.

## 2. Prepare your Excel list

**Easiest starting point:** open `data/tools.csv` in Excel, then Save As **Excel Workbook (.xlsx)**. This is already populated from the curated guide. Alternatively use the headers below in your own workbook. A direct copy of the formatted Markdown tables will not produce the required schema.

- Name the worksheet exactly **Tools**.
- Name the file exactly **tools.xlsx**.
- Put column headers in row 1, one tool per row. No title rows, merged cells, blank headers or formulas. Use plain values, including plain URL text rather than hidden hyperlink targets.
- Use these exact lowercase column headers. Keep all supplied columns; blank optional values are fine.
- Format `last_checked` as **Text** and enter `YYYY-MM-DD`; do not use Excel date serial numbers.
- Keep tool IDs stable so they remain identifiable across updates.

| Column | Required? | Meaning / example |
|---|---|---|
| id | Yes | Unique lowercase identifier: `clipchamp`; use letters, digits and hyphens only |
| name | Yes | Display name: `Clipchamp` |
| category | Yes | Category name, matching existing spelling if joining an existing category |
| cost | Yes | Human-readable cost, e.g. `Free tier`, `Paid`, `Free; open source` |
| learning_curve | Yes | Exactly `Easy start`, `Some practice`, `More learning`, or `Not assessed` |
| description | Yes | Full plain-language description: what it does and when to use it |
| best_for | Recommended | Short description shown on the card |
| platform | Recommended | Browser / Windows / macOS / Linux etc. |
| free_features | Recommended | What free access actually includes; use line breaks for separate points |
| paid_features | Recommended | What paying unlocks, or say there is no paid core tier |
| limitations | Recommended | Watermarks, exports, storage, collaboration and other practical restrictions |
| free_verdict | Recommended | Is free enough for a typical student project? Explain when payment matters |
| website | Yes | Full official URL starting with https:// |
| tutorial | Optional | Official beginner tutorial URL |
| pricing_url | Optional | Official plan comparison URL |
| last_checked | Recommended | Last feature/plan verification date as text; leave blank if not verified |
| rank | Optional | Number: lower values appear first in curator order; blank defaults to 100 |
| published | Optional | `yes` to display, `no` to hide. Blank displays the tool |

You can add a category just by entering a new category name. Category navigation is generated automatically. Cost filtering uses whether the cost text contains “free”; use `Paid` for trial-only products, and describe their trial separately. Learning labels are editorial assessments, not timed tests.

The starter list contains 37 unique published tools; Krita is listed once and two provisional tools are omitted. Detailed plan comparisons are incomplete for many entries and visibly marked as pending. Fill these in using official sources before describing the guide as fully verified. No beginner tutorial links have been invented.

## 3. Upload the Excel workbook to update the website

1. Save and close your updated `tools.xlsx` in Excel.
2. Open your GitHub repository and click the **data** folder.
3. Choose **Add file → Upload files** and select `tools.xlsx` from your computer.
4. Check the location is `data/tools.xlsx`, then commit with a message such as “Update tool descriptions”. Replace the existing workbook when updating; keep the filename unchanged.
5. Open **Actions** and wait for the build and deployment to succeed. The workbook is converted automatically; you do not edit JSON or JavaScript yourself.
6. Reload the public website. If you still see the old content, hard-refresh with Ctrl+F5.

**Excel takes priority:** when `data/tools.xlsx` exists, the build ignores `tools.csv`. If you want to return to CSV maintenance, delete `data/tools.xlsx` from GitHub and update CSV instead. Uploading Excel without the workflow does not update the website.

The action rebuilds the whole directory from the workbook; removed rows disappear. Updating a workbook replaces its previous uploaded version; it does not append new rows automatically. Keep your local Excel file as your current master.

## 4. Add, hide, reorder or remove tools

- Add: copy an existing Excel row, assign a NEW id, replace every relevant field, and upload the workbook.
- Hide: set `published` to `no`. This removes it from the UI but is NOT a privacy control: the workbook remains public.
- Reorder: adjust `rank`. Ordering is editorial preference, not a quality score.
- Remove: delete its row and re-upload.
- Change look: colours, spacing and breakpoints are in `style.css`. Text and structure are in `index.html`; interactive behaviour is in `app.js`.

## 5. Troubleshooting and recovery

**Red build:** open the failed Actions run, expand “Validate spreadsheet and generate tool data”, and read the row/field error. Common causes: wrong sheet name, missing description, duplicate id, a formula cell, invalid URL or misspelled learning label. Fix Excel and upload again. A failed validation will not replace the last successful site deployment.

**No workflow shown:** check `.github/workflows/pages.yml` exists and Actions is enabled. A static repository file upload alone is not deployment.

**404 website:** check Pages source is GitHub Actions and the deploy job succeeded; allow GitHub time to publish. Use the URL shown by the deploy job.

**Restore an earlier workbook:** open `data/tools.xlsx` on GitHub, choose History, open the desired earlier commit, download that workbook, then upload it again as `data/tools.xlsx` in a new commit. The next successful workflow republishes it. Keep a local backup before overwriting.

**Preview without uploading:** double-click index.html to see the bundled starting data. Excel changes require the GitHub workflow or `python scripts/convert.py` locally. Python 3.10+ is sufficient; no packages are needed. Run that command from the extracted folder, then reopen index.html.

## Scope and verification

Static HTML/CSS/JavaScript, with native accessible modal dialog, keyboard focus return and responsive layout. No external fonts, tracking, logo dependencies or runtime libraries. The owner workflow was designed for current GitHub Actions Pages deployment; actual deployment requires your repository and has not been run on your account.

This version does not include a questionnaire, favourites, an administrator login or automatic vendor-price monitoring. It prioritises browsing, filtering and useful detail pages. Tier information is your curated content, not a live feed.

References: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages and https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
