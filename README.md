# GhostMark — Invisible Watermark PDF

Add an invisible watermark to your PDF — hidden in the file, but appears when converted to Word or Google Docs. Track who leaked your document. **Free. Secure. Your files never leave your browser.**

🌐 **Live Demo:** https://watermarkpdf.vercel.app

---

## Features

✅ **Invisible in PDF** — Completely hidden when viewing the original PDF
✅ **Visible in Word/Docs** — Appears when converted to Microsoft Word or Google Docs
✅ **Copy-paste Proof** — Survives copy-paste and format conversion
✅ **Zero-width Fingerprint** — Uses Unicode characters invisible to humans
✅ **Metadata Tracking** — Stores recipient info in PDF metadata
✅ **Privacy First** — Files never sent to servers. Processing happens in your browser
✅ **Free Forever** — No login. No ads. No limits
✅ **Open Source** — MIT License. Full source code available

---

## How It Works

### Three Layers of Watermarking

**Layer 1: White Text Grid**
- 20 copies of your watermark text printed in WHITE on every page
- Invisible in PDF (white on white)
- Becomes BLACK when converted to Word/Google Docs
- Hardest approach to remove

**Layer 2: Zero-Width Unicode Fingerprint**
- Encodes unique watermark ID as invisible Unicode characters (U+200B, U+200C)
- Zero width — completely invisible to humans
- Embedded between words in the PDF text
- Survives copy-paste and format conversion

**Layer 3: PDF Metadata**
- Watermark ID and recipient info written to PDF metadata fields
- Visible in File → Properties in any PDF reader
- Another layer of tracking

### Why This Works

When someone copies text and pastes it into Word or Google Docs:
- The white text layer is converted to black
- The zero-width Unicode fingerprint characters come along
- The metadata is preserved or easily accessible

All three layers together make it nearly impossible to leak without leaving a trail.

---

## Quick Start

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/ghostmark.git
cd ghostmark

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Vercel KV credentials

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

### Using GhostMark

1. Go to **Protect** tab
2. Upload a PDF (max 25MB)
3. Enter watermark text (e.g., "CONFIDENTIAL")
4. Enter recipient name and email
5. Click "Generate Protected Document"
6. Download the watermarked PDF
7. Send to your recipient

### If Your Document Leaks

1. Go to **Verify** tab
2. Upload the leaked document (PDF, DOCX, or TXT)
3. GhostMark identifies the recipient
4. You see exactly who leaked it

---

## Architecture

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS variables
- **PDF Processing:** pdf-lib (client-side only)
- **PDF Preview:** pdfjs-dist
- **Database:** Vercel KV (Redis key-value store)
- **Validation:** Zod
- **Deployment:** Vercel

### File Structure

```
ghostmark/
├── app/
│   ├── layout.tsx                    # Root layout with SEO
│   ├── page.tsx                      # Homepage
│   ├── protect/page.tsx              # Watermarking tool
│   ├── verify/page.tsx               # Leak detection
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/page.tsx           # Individual blog posts
│   └── api/
│       ├── fingerprint/route.ts      # Save watermark to DB
│       └── verify/route.ts           # Look up watermark
├── lib/
│   ├── watermark/
│   │   ├── engine.ts                 # Main watermarking function
│   │   ├── whiteText.ts              # Layer 1
│   │   ├── unicodeFingerprint.ts     # Layer 2
│   │   └── metadata.ts               # Layer 3
│   ├── security/
│   │   ├── fileValidator.ts
│   │   ├── sanitizer.ts
│   │   └── rateLimiter.ts
│   └── utils/
│       ├── uuid.ts
│       ├── hash.ts
│       └── formatters.ts
├── public/
│   ├── favicon.ico
│   ├── sitemap.xml
│   └── robots.txt
└── styles/
    └── globals.css
```

---

## Environment Variables

### Required

Create `.env.local` (copy from `.env.example`):

```env
# Vercel KV
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_read_only_token_here

# GitHub API (for star count badge)
GITHUB_TOKEN=your_github_token_here

# App URLs
NEXT_PUBLIC_APP_URL=https://watermarkpdf.vercel.app
NEXT_PUBLIC_GITHUB_URL=https://github.com/yourusername/ghostmark
```

> ⚠️ **Never commit `.env.local`** — it contains real secret keys

---

## Database (Vercel KV)

GhostMark stores ONE record per watermark:

```json
{
  "key": "wm:550e8400-e29b-41d4-a716-446655440000",
  "value": {
    "recipientName": "John Doe",
    "recipientEmail": "john@company.com",
    "watermarkText": "CONFIDENTIAL",
    "originalFilename": "report.pdf",
    "createdAt": "2025-03-22T10:30:00Z",
    "ipHash": "a665a45920422f9d417e4867efdc4fb8..."
  }
}
```

- **Auto-expires:** 90 days
- **IP hashing:** Uses SHA-256 (cannot be reversed)
- **No file storage:** Only metadata stored

---

## API Endpoints

### POST `/api/fingerprint`

Save a watermark to the database after generation.

**Request:**
```json
{
  "watermarkId": "550e8400-e29b-41d4-a716-446655440000",
  "recipientName": "John Doe",
  "recipientEmail": "john@company.com",
  "watermarkText": "CONFIDENTIAL",
  "filename": "report.pdf"
}
```

**Response:**
```json
{
  "success": true,
  "watermarkId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### POST `/api/verify`

Look up a watermark ID to find out who a document was sent to.

**Request:**
```json
{
  "watermarkId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "found": true,
  "recipientName": "John Doe",
  "recipientEmail": "john@company.com",
  "watermarkText": "CONFIDENTIAL",
  "originalFilename": "report.pdf",
  "createdAt": "2025-03-22T10:30:00Z"
}
```

---

## Security

### Privacy

- ✅ PDFs are **never uploaded to our servers**
- ✅ All PDF processing happens in your browser
- ✅ Only the watermark ID + recipient info is saved
- ✅ IP addresses are hashed with SHA-256 (irreversible)

### Input Validation

- ✅ PDF file validation (magic bytes, size, format)
- ✅ Zod schema validation on all API endpoints
- ✅ Email validation and sanitization
- ✅ Text input HTML-escape sanitization

### Rate Limiting

- ✅ Max 10 requests per IP per hour
- ✅ Applied to both `/api/fingerprint` and `/api/verify`

### Data Retention

- ✅ Watermarks expire after 90 days
- ✅ No logs of verification requests
- ✅ No analytics or tracking

For more details, see [SECURITY.md](SECURITY.md)

---

## Development

### Available Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Run production build locally
npm run lint          # Run ESLint
npm run type-check    # Check TypeScript
npm run format        # Auto-format code
```

### Deployment

GhostMark is designed for **Vercel** (free tier works great):

```bash
# Deploy to preview URL
vercel

# Deploy to production
vercel --prod
```

Or connect your GitHub repo to Vercel for auto-deployment on push.

---

## Use Cases

- **Legal/Financial:** Track who leaked confidential contracts
- **HR:** Watermark sensitive employee records
- **Sales:** Identify which sales rep leaked pricing
- **Product:** Find which employee leaked roadmap
- **Media:** Detect who leaked exclusive stories
- **Consulting:** Track client document distribution

---

## Roadmap (v2+)

- [ ] User accounts and login
- [ ] Document history dashboard
- [ ] Bulk watermarking (multiple files)
- [ ] DOCX as input format
- [ ] AI-powered verification
- [ ] Team workspaces
- [ ] API access for businesses
- [ ] Audit log CSV export
- [ ] QR code watermark option

---

## Contributing

We'd love your help! See [CONTRIBUTING.md](CONTRIBUTING.md)

**Areas needing help:**
- DOCX parsing in Verify feature
- Translations (i18n)
- Accessibility improvements
- More test coverage
- Performance optimizations

---

## License

MIT License — see [LICENSE](LICENSE) for details

This means you can use, modify, and distribute GhostMark freely, even for commercial projects.

---

## Support

- 📖 [Blog](https://watermarkpdf.vercel.app/blog) — Learn how it works
- 🐛 [Issues](https://github.com/yourusername/ghostmark/issues) — Report bugs
- ✉️ [Email](mailto:security@watermarkpdf.vercel.app) — Security issues (don't use GitHub)
- 🔗 [GitHub](https://github.com/yourusername/ghostmark) — View source code

---

## Credits

Built with:
- **pdf-lib** — PDF manipulation
- **pdfjs-dist** — PDF rendering
- **Next.js** — React framework
- **Vercel** — Hosting and KV database
- **Tailwind CSS** — Styling

---

## FAQ

**Q: Is my PDF stored on your servers?**
A: No. All PDF processing happens in your browser. Only the watermark ID + recipient info is saved.

**Q: How long does the watermark last?**
A: The watermark is permanent in the PDF. The metadata (for verification) expires after 90 days.

**Q: Can they remove the watermark?**
A: Removing all three layers is nearly impossible. The white text appears when converted. The Unicode fingerprints survive copy-paste. The metadata is easy to verify.

**Q: What if they print and scan?**
A: Perfect! The white text becomes visible and the watermark appears as black text. Proof of authenticity.

**Q: Is this legal?**
A: Yes. You're watermarking documents you own and sending them to specific people. Detecting who leaked them is your right.

**Q: Can I use this for bulk watermarking?**
A: Not in v1. This is planned for v2.

---

**GhostMark** — *Know who leaked your document.*
