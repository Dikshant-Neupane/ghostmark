# GhostMark

> Invisible PDF watermarks that reveal themselves in Word & Google Docs.

## What it does

GhostMark adds a hidden tracking layer to your PDFs. The watermark is invisible in the PDF but appears clearly when someone converts the document to Word or Google Docs — letting you trace exactly who leaked your file.

### Three protection layers

1. **White tile stamp** — Faint diagonal grid on every page. Near-invisible in PDF, visible after conversion.
2. **Unicode fingerprint** — Hidden annotation in PDF data. Survives any format conversion.
3. **Metadata mark** — ID written to PDF Author & Keywords. Visible in File → Properties.

**All processing happens in your browser.** Your PDF never leaves your device.

## Getting started

```bash
git clone https://github.com/Dikshant-Neupane/ghostmark.git
cd ghostmark
npm install
cp .env.example .env.local
# Fill in your Vercel KV credentials (see .env.example for instructions)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
KV_URL=...
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
GITHUB_TOKEN=...
NEXT_PUBLIC_APP_URL=https://watermarkpdf.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/Dikshant-Neupane/ghostmark
```

### Vercel KV setup

1. Go to [vercel.com](https://vercel.com) → your project → Storage tab
2. Click "Create Database" → choose KV
3. Click ".env.local" tab → copy all 4 values
4. Paste into your `.env.local` file

## Tech stack

- **Next.js 14** (App Router)
- **pdf-lib** (client-side PDF processing)
- **pdfjs-dist** (PDF text extraction for verification)
- **Vercel KV** (watermark record storage)
- **TypeScript** (strict mode)

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # ESLint check
npx tsc --noEmit  # TypeScript type check
```

## Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add KV database in Vercel Storage tab
4. Environment variables are auto-populated by Vercel KV
5. Deploy

## License

MIT — [Dikshant-Neupane](https://github.com/Dikshant-Neupane)
