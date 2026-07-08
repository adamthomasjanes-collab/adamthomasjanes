# Chapter Notes

This portfolio is documented like an editorial publication. The comments in
`index.html`, `styles.css`, and `script.js` are intentionally more expressive
than normal engineering notes because the source code is part of the story.

## The idea

The public site presents Adam Thomas Janes as a communications and marketing
professional who makes complex information clear. The codebase should prove
that same skill through structure, naming, documentation, and maintainability.

## Commenting style

The comments are written as chapter notes:

- **The Cover** explains the hero section.
- **Feature Stories** explains the case-study teasers.
- **From the Archive** explains the back-issue browser.
- **Sharing the Toolbox** explains downloadable resources.
- **How the Work Gets Made** explains the process tabs.
- **Career Record** explains the professional history section.
- **Production Notes** explains skills and craft.
- **Colophon** explains the final back-matter section.
- **Special Insert** explains the reusable archive overlay.

## Why this matters

Most visitors will never inspect the source. But the people who do—designers,
developers, hiring managers, technical teammates, or unusually curious
recruiters—should find a codebase that feels intentional.

The documentation demonstrates:

- editorial thinking
- communication clarity
- maintainability
- accessibility awareness
- SEO awareness
- production discipline
- care for handoff and future updates

## Rule of thumb for future edits

When adding comments, do not only explain what changed. Explain why the choice
exists and what a future editor should protect.

Bad:

```html
<!-- Featured cards -->
```

Better:

```html
<!--
CHAPTER · FEATURE STORIES
These cards introduce projects as editorial case studies. Preserve the
Challenge → Solution → Result rhythm so visitors understand the thinking,
not just the finished visuals.
-->
```
