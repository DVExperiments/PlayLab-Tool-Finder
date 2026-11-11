# Install the cover-image update

This is an update package for v1. It does not include or replace your Excel workbook or tool data.

1. Extract this ZIP.
2. Upload `app.js` and `style.css` into the repository root, replacing the existing versions.
3. Replace `.github/workflows/pages.yml` with the supplied version at that exact path. Use GitHub's file editor if hidden folders are difficult to upload. Preserve the file's path.
4. Upload the `covers` folder (containing its README) into the repository root.
5. Commit to main, let the workflow finish, then hard-refresh the website.

The supplied workflow uses main and GitHub Actions Pages, as in v1. If you customised your existing workflow, simply add these lines after `cp -r data _site/` in its prepare step instead of replacing the whole workflow:

```sh
mkdir -p _site/covers
cp -r covers/. _site/covers/
```

Read `covers/README.md` for uploading images and a complete filename reference. Your existing `data` folder should be left as it is.

Validated: JavaScript syntax, cover references in card/detail templates, packaged folder paths, and unchanged tool data. Browser rendering and deployment on your repository have not been tested here.
