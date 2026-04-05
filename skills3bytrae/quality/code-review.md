# Code Review Checklist

Before committing code, verify the following:

## HTML
- [ ] **Semantics**: Are `<section>`, `<header>`, `<footer>`, `<main>` used correctly?
- [ ] **Accessibility**: Do all images have `alt` text? Do buttons have `aria-label` if icon-only?
- [ ] **Structure**: Is indentation consistent (2 spaces)?

## CSS
- [ ] **Variables**: Are colors/spacing using `var(--...)`? No hardcoded hex codes.
- [ ] **Responsiveness**: Does it look good on 375px width?
- [ ] **Overflow**: No horizontal scrollbars on mobile.

## JavaScript
- [ ] **Errors**: Console is clean of errors.
- [ ] **Performance**: No heavy libraries imported (jQuery, etc.).
- [ ] **Cleanliness**: Unused variables removed.

## General
- [ ] **Banned Words**: Checked against `rules/05-content-rules.md`.
- [ ] **Formatting**: Files are formatted with Prettier logic.
