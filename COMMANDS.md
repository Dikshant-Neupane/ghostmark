# Commands

## Development
```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Check code with ESLint
npm run type-check   # Check TypeScript types
npm run format       # Auto-format with Prettier
```

## Git workflow
```bash
git checkout -b feature/your-feature-name   # New branch
git add .                                    # Stage changes
git commit -m "feat: describe change"       # Commit (use Conventional Commits)
git push origin feature/your-feature-name   # Push to GitHub
# Then open a Pull Request on GitHub
```

## Commit message format
- `feat:` - new feature
- `fix:` - bug fix
- `docs:` - documentation
- `style:` - formatting (no logic change)
- `refactor:` - code cleanup
- `chore:` - maintenance

## Deployment
```bash
vercel          # Deploy to preview URL
vercel --prod   # Deploy to production (watermarkpdf.vercel.app)
```
