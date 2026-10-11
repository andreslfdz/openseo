# Release Notes

Store finalized release notes in this folder as versioned Markdown files.

Recommended naming:

- `docs/release-notes/v0.0.2.md`

Typical flow:

1. Generate a draft with `pnpm -s release:notes`.
2. Copy the final edited notes into a versioned file in this folder.
3. Make sure `package.json` has the matching version, then check `pnpm release:publish -- --dry-run`.
4. Publish with `pnpm release:publish`. The helper targets `andreslfdz/openseo` on `openseo-rename`.
