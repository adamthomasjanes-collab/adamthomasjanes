# Backstage Notes

This project is intentionally documented like a working editorial system, not just a static portfolio.

## What the comments are trying to do

The comments explain the *purpose* behind the structure: why a section exists, what role it plays in the story, and where future edits should happen. They are written for someone opening the files for the first time and trying to understand the build quickly.

## Main idea

The site treats Adam Thomas Janes' portfolio as a publication:

- The hero is the cover.
- The navigation is the table of contents.
- The feature cards are editorial features.
- The archive is the back catalog.
- The process section is the working method.
- The colophon explains the build.

## Maintenance notes

Keep comments useful, not decorative filler. A good comment should explain one of these things:

1. Why this section exists.
2. What depends on this markup/class/data attribute.
3. Where to edit the matching content in another file.
4. What not to break during future redesigns.

## Launch reminder

Before publishing a new version, confirm that:

- `index.html` is in the repository root.
- `styles.css` and `script.js` are linked correctly.
- Image paths point to the `assets/` folder.
- The resume PDF path works.
- `robots.txt`, `sitemap.xml`, `404.html`, and `netlify.toml` are included.
