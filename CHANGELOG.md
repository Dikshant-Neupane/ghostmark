# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-22

### Added
- Initial release of GhostMark
- Three-layer watermarking system:
  - Layer 1: Invisible white text grid (4x5) on every page
  - Layer 2: Zero-width Unicode fingerprints for copy-paste detection
  - Layer 3: PDF metadata fields with recipient information
- Protect page for watermarking PDFs
- Verify page for detecting leaked documents
- File validation (magic bytes, size limit 25MB, format checking)
- Input sanitization (XSS prevention, email validation)
- Rate limiting (10 requests per IP per hour)
- Vercel KV database integration
- Full support for Vercel deployment
- Blog with helpful articles
- SEO optimization with metadata and structured data
- Privacy-first design (no server-side PDF processing)

### Security
- SHA-256 IP address hashing
- Zod input validation on all API endpoints
- Automatic watermark expiry after 90 days
- No user login (anonymous usage)
- No analytics or tracking

## [Unreleased]

### Planned for v2
- User accounts and login
- Document history dashboard
- Bulk watermarking (multiple files)
- DOCX as input format
- AI-powered verify
- Team workspaces
- API access for businesses
- Audit log CSV export
- QR code watermark option
