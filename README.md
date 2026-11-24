# Futures PlayLab pages

Interactive pages for the Futures PlayLab Google Site (Master of Technological Futures, academyEX). Each page is a single self-contained `index.html` in its own folder. GitHub Pages hosts them and they are embedded in Google Sites.

| Page | Folder | Live link |
|---|---|---|
| Student Journey | `student-journey/` | `https://YOUR-USERNAME.github.io/playlab-pages/student-journey/` |
| Community | `community/` | `https://YOUR-USERNAME.github.io/playlab-pages/community/` |
| What's On | `whats-on/` | `https://YOUR-USERNAME.github.io/playlab-pages/whats-on/` |
| About | `about/` | `https://YOUR-USERNAME.github.io/playlab-pages/about/` |
| Resources | `resources/` | `https://YOUR-USERNAME.github.io/playlab-pages/resources/` |
| Home | `home/` | `https://YOUR-USERNAME.github.io/playlab-pages/home/` |
| Play | `play/` | `https://YOUR-USERNAME.github.io/playlab-pages/play/` |

## Updating a page

All the content you're likely to change (Gens and their dates, key dates, links, contacts, checklist items, how-tos) is in the **DATA** or **SETTINGS** section near the bottom of each `index.html`. Each part has a comment explaining it.

1. Open the file on GitHub, for example `student-journey/index.html`.
2. Click the pencil icon (Edit this file).
3. Press Ctrl+F (Cmd+F on a Mac) and search for what you want to change, for example `const GENS`.
4. Make your edit, then click **Commit changes**.
5. The live page updates within a minute or two. If you don't see the change, refresh the Google Site with Ctrl+Shift+R (Cmd+Shift+R on a Mac).

Be careful to keep the quote marks, commas and brackets around anything you edit. If the page goes blank after an edit, a missing comma or quote mark is the usual cause. Open the file's **History** on GitHub to see or undo the last change.

### My Journey (Student Journey): Gens and key dates

Each Gen's official dates (onsite days, weekly sessions, assessments, breaks, for all three parts) are in `const GENS` in `student-journey/index.html`. Step-by-step instructions for adding a Gen or changing a date: [`student-journey/HOW-TO-UPDATE.md`](student-journey/HOW-TO-UPDATE.md).


## Resources

Guides, external resources, policies and FAQs are lists in `resources/index.html`. Tools are read live from the Futures PlayLab Tool Finder repo, which you keep updating with its Excel workbook. Step-by-step instructions: [`resources/HOW-TO-UPDATE.md`](resources/HOW-TO-UPDATE.md).


## Home

The home page links to every other page of the Google Site. Paste the site's published address into `siteAddress` in `home/index.html` and all the links work. Its "Coming up" and "In tech news" lists reuse the What's On data, so they update by themselves. Step-by-step instructions: [`home/HOW-TO-UPDATE.md`](home/HOW-TO-UPDATE.md).

## Play

The Studio Card and the playground tools are lists in `play/index.html`. Each tool runs inside the page, with a button to open its full page. Step-by-step instructions: [`play/HOW-TO-UPDATE.md`](play/HOW-TO-UPDATE.md).

## About

Facts that change (fees, start dates, contact details, team bios and photos, links) are in `SETTINGS` near the bottom of `about/index.html`. Programme content (pillars, the three parts, courses and assessments) follows the MTF Programme Refresh Plan and is in the `PILLARS` and `PARTS` lists just below it. Team photos: upload `claudio.jpg` or `dylan.jpg` (or .png/.webp) to the `about/people` folder and they appear automatically. See `about/people/README.md`.

## What's On

The calendar and tech news update themselves through a scheduled GitHub job. One-off setup steps are in [`whats-on/SETUP.md`](whats-on/SETUP.md).

## Community: connecting Google Forms and Sheets

> **Day-to-day updates** are explained step by step in [`community/HOW-TO-UPDATE.md`](community/HOW-TO-UPDATE.md). The questions for each Google Form are in [`community/FORMS.md`](community/FORMS.md).
>
> **The simple way** (no published sheets): keep form responses private, then use the entry helper at `community/add.html` to turn chosen responses into lines you paste into the page. Everything below is an **optional** alternative that reads approved entries straight from a published Google Sheet.

The Community page shows sample content until you connect it. Profiles and shout-outs come from Google Forms through a published, approved-only sheet. The Gallery works differently: students send work privately and the Futures PlayLab team adds pieces by hand (see **Gallery** below).

Do the steps below for these two forms:

| Form | Feeds | Setting in `community/index.html` |
|---|---|---|
| Add your profile and pin | The Lounge, the Map Wall, Recently joined | `sheets.people` and `forms.profile` |
| Send a shout-out | Shout-outs in the Foyer | `sheets.shoutouts` and `forms.shoutout` |

### Sample content

Until each section has real entries, the page shows made-up sample people, gallery pieces and shout-outs so you can see how it looks. Before students see the page, find `showSamples: true` in `SETTINGS` and change it to `showSamples: false`. Empty sections then invite people to add the first entry.

### Before you start: privacy

- **A published sheet can be read by anyone who has its link**, even though the Google Site itself needs an academyEX login. Only the Approved tab is published, but treat everything in it as public: don't collect email addresses, phone numbers or anything else private.
- Some Google Workspace accounts aren't allowed to "Publish to web" outside the organisation. If the CSV link only works when you're signed in, the page can't read it. Use a Futures PlayLab Google account that is allowed to publish, or ask IT.
- Add a required consent question to every form, for example "I'm happy for this to appear on the Futures PlayLab Community page". Only approve entries where it's ticked.

### 1. Make the form

Suggested questions. The page recognises these wordings (and close variations), so keep the key words.

**Add your profile and pin**
- Your name *(short answer)*
- Are you a… *(multiple choice: Current student, Alumni, Future student, Staff)*
- Which Gen are you in? *(short answer, e.g. Gen31. Staff can leave blank)*
- Town or city you live in
- Country you live in *(dropdown is best, so spelling is consistent)*
- Where are you from? (country) *(optional: a second pin for heritage or where you grew up)*
- What do you do? (profession or context)
- Interests *(separate with commas)*
- Ask me about
- Portfolio or LinkedIn link *(optional)*
- Photo *(optional, see Photos below)*
- Consent checkbox

**Send a shout-out**
- Your shout-out message
- From *(your name)*

In each form's **Settings**, leave "Collect email addresses" off.

### 2. Link the form to a sheet and add an Approved column

1. In the form, open the **Responses** tab and click **Link to Sheets**, then create a new spreadsheet.
2. In the sheet, on the "Form responses 1" tab, type `Approved` in the first empty column heading, after the last question.
3. Select that column below the heading and choose **Insert → Checkbox**. Tick a box to approve that entry; untick it to hide the entry again.

### 3. Make the Approved tab

1. Add a new tab (the **+** at the bottom left) and rename it `Approved`.
2. In cell A1 of the Approved tab, paste this, changing `M` to the letter of your Approved column:

   ```
   =QUERY('Form responses 1'!A:M, "select * where M = true", 1)
   ```

   The tab now shows the heading row plus approved entries only.

### 4. Publish the Approved tab

1. Choose **File → Share → Publish to web**.
2. In the first dropdown choose the **Approved** tab (not "Entire document"). In the second choose **Comma-separated values (.csv)**.
3. Under "Published content and settings", make sure "Automatically republish when changes are made" is ticked.
4. Click **Publish** and copy the link.

### 5. Paste the links into the page

In `community/index.html`, find `const SETTINGS` and paste:
- the CSV link into `sheets.people` or `sheets.shoutouts`
- the form's share link (Send → link icon) into `forms.profile` or `forms.shoutout`

While you're there, add your Slack invite link (`slackJoin`), each Slack channel's link (`channels`), your FrameVR space link (`frame.url`) and any upcoming Portal sessions (`frame.sessions`).

Approved entries appear on the page within about five minutes: Google takes a few minutes to update published sheets.

### Gallery

The Gallery has no published sheet. Students send work to the Futures PlayLab team, you keep the submissions private, and you choose what goes on the page.

**Set up the form (once)**
1. Make a Google Form called something like "Send us your work for the Gallery". Suggested questions: Your name (or everyone who made it); Title of your work; Which Gen are you in?; Is this project work or a community moment?; Course or assessment (optional); Tell us about it; Upload your image (File upload); Link to the full piece (optional); and a required consent checkbox.
2. Link it to a sheet (**Responses → Link to Sheets**). Keep this sheet and the upload folder **private**. Don't publish them.
3. Paste the form's share link into `forms.gallery` in `community/index.html`. The "Send us your work" buttons will open it.

**Add a piece to the page**
1. Download the image from the form's upload folder. Resize it to about 1600px wide; a .jpg under 500KB is ideal.
2. On GitHub, open the `community/gallery` folder, click **Add file → Upload files**, upload the image and click **Commit changes**. Give it a simple name with no spaces, e.g. `kai-futures.jpg`.
3. Open `community/index.html`, click the pencil icon, and find `const GALLERY`. Add an entry inside the square brackets (newest first):

   ```js
   {title:"Kai Futures 2040", maker:"Aroha Tane", gen:"Gen31", type:"Project", course:"Disruption Report", description:"A speculative menu from a 2040 marae kitchen.", image:"gallery/kai-futures.jpg", link:""},
   ```

   `type` is `"Project"` or `"Community"`. `course` and `link` can be left as `""`.
4. Click **Commit changes**. The piece appears within a minute or two. Once there's at least one entry, the sample gallery disappears.

Images in the repo can be viewed by anyone with their link, so only upload pieces the maker has agreed to share.

### Photos

The page can show images from a link (any `https://` image address) or from Google Drive.

- **Drive files must be shared as "Anyone with the link can view"**, or they won't load and the page shows placeholder artwork instead.
- If you use a **File upload** question in the form, people must sign in to Google to answer, and uploads go into a Drive folder that is private by default. Open that folder in Drive and share it as "Anyone with the link can view" so the photos show.
- If you'd rather keep photos off for now, leave the photo question out. People show as coloured initials.
- Want the same privacy for profile photos? Leave the photo question out of the profile form, collect photos privately, upload the ones you approve to a `community/people` folder, and put the file name (e.g. `people/aroha.jpg`) in the Photo column of the Approved tab.
- If the site ever goes public, you can turn photos and full names off in `SETTINGS` (`showPhotos` and `showFullNames`).

### The map

Map Wall pins come from people's profiles plus the separate Map Wall form. Adding pins from that form is explained in `community/HOW-TO-UPDATE.md`.


- Pins sit on the person's town or city when the page knows it (most towns in Aotearoa and some big cities worldwide are built in). Otherwise the pin goes in the middle of their country.
- Country names are matched flexibly (NZ, Aotearoa, USA, UK and so on all work). To place a pin exactly, add `Lat` and `Lng` columns to the sheet with coordinates.
- To add more towns, find `const PLACES` in the file and add a line like `"kaikoura":[-42.4,173.68],`.

## Adding a new page

1. Make a new folder named after the page, for example `whats-on`, containing an `index.html`.
2. On GitHub, click **Add file → Upload files** and drag the folder in.
3. Add the page to the table above and to the list in the root `index.html`.
4. The page will be live at `https://YOUR-USERNAME.github.io/playlab-pages/FOLDER-NAME/`.
