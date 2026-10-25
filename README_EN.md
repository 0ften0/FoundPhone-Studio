# FoundPhone Studio · 捡手机

This branch is the AI-authored story framework. The production entry opens the virtual phone directly. Edit stories/blank/story.json, then run npm run story:validate, npm run story:test and npm run build. AI is used during authoring, not required at runtime.

The editable Studio is preserved at editor-version-backup and tag editor-version-0.5.0-backup-20261025. The source ZIP and Git bundle are locally stored in ignored backups/editor-version/. Browser IndexedDB/localStorage was not exported; source backup does not include browser data.

Read AGENTS.md, docs/AI_STORY_GUIDE.md and docs/STORY_SCHEMA.md. Do not rewrite React pages for each story, and do not Fork/Star/Push without explicit authorization. MIT and third-party notices must be preserved.

The default phone has no story, contacts, chat or media. Regression stories exist only in tests/fixtures and are not shipped in the runtime. The visual target is no longer limited to iOS18; mature, compatible iOS26/27 components may be used. Not all app screens have undergone reference-based visual acceptance. See README.md, TEST_RESULTS.md and references/ios for scope and limitations.
