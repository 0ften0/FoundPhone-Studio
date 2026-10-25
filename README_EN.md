# FoundPhone Studio · 捡手机

An interactive virtual phone story framework. Fork this repository, open it in an AI coding tool, and ask it to read AGENTS.md before adding your story. Prefer editing stories/template/story.json instead of rebuilding the phone UI.

[Live demo](https://keoyyo85.github.io/FoundPhone-Studio/) · [中文教程](README.md)

The default template contains neutral demonstration text: open KakaoTalk, tap the last message, answer and end the simulated call, then read the newly revealed Instagram post. The blank starting point is stories/blank/story.json and can be viewed with ?template=blank.

Install Node.js 22 and run npm ci, npm run story:validate, npm run story:test, and npm run story:preview. Build a static site with npm run build. See docs/GITHUB_PAGES.md for deployment instructions.

AI is an authoring tool, not a runtime dependency. Story data, UI and player saves remain separate. The catalog has 49 App identities with differing page coverage; this does not imply full feature parity with real products. Calls and social interactions are simulated.

See LICENSE and accompanying notices. Only publish story content and media you have permission to share. The project does not automatically Fork, Star or Push during installation, startup or build.
