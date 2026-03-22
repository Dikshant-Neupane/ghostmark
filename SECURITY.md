# Security Policy

## Reporting a vulnerability

DO NOT create a public GitHub issue for security vulnerabilities.

Email: security@watermarkpdf.vercel.app

Include:
- What the vulnerability is
- How to reproduce it
- What impact it has

We respond within 48 hours and credit you in the CHANGELOG.

## Key security facts

- PDF files are never uploaded to our servers
- IP addresses are stored only as SHA-256 hashes (cannot be reversed)
- All API inputs are validated with Zod
- Rate limiting on all API endpoints (10 requests per IP per hour)
- Watermark IDs expire automatically after 90 days
- No user login or tracking beyond watermark metadata

## Best practices

When using GhostMark:
1. Use sensible watermark text ("CONFIDENTIAL", etc.)
2. Keep recipient emails accurate for verification
3. Don't share watermarked PDFs publicly (watermark is invisible but metadata is readable)
4. Use for documents that are genuinely sensitive

## Data retention

- Watermark metadata expires after 90 days
- No logs of verification requests are kept
- No analytics on user behavior
- No third-party services have access to your data
