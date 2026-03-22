# Contributing to GhostMark

Thank you for your interest in contributing to GhostMark!

## Setup

1. Fork the repo on GitHub
2. Clone: `git clone https://github.com/YOUR_USERNAME/ghostmark.git`
3. Install: `npm install`
4. Copy env: `cp .env.example .env.local`
5. Fill in your Vercel KV credentials in `.env.local`
6. Run: `npm run dev`

## Making changes

1. Create branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run: `npm run lint`
4. Run: `npm run type-check`
5. Commit and push
6. Open a Pull Request

## Areas needing help

- DOCX parsing in Verify feature
- Translations (i18n)
- Accessibility improvements
- More test coverage
- Performance optimizations

## Code style

- Use TypeScript strictly (no `any` types)
- Use CSS variables for colors (defined in `styles/globals.css`)
- Follow the existing code structure

## Questions?

Open an issue or start a discussion in the GitHub repository.
