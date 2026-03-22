'use client';

import { useParams } from 'next/navigation';

const blogPosts: { [key: string]: { title: string; content: string } } = {
  'how-to-invisible-watermark-pdf': {
    title: 'How to Watermark PDF with Invisible Text',
    content: `
      # How to Watermark PDF with Invisible Text

      ## The Problem

      If you send a PDF to someone and they leak it, how do you prove who leaked it?

      Traditional watermarks are visible on the document, so:
      - They make the document look unprofessional
      - They can be easily removed
      - Forwarding a PDF with a visible watermark to someone else reveals the person who received it

      ## The Solution: Invisible Watermarks

      GhostMark uses three layers of watermarking that are completely invisible in PDFs:

      ### Layer 1: White Text Grid
      Every page gets 20 copies of your watermark text (in a 4×5 grid) printed in WHITE color.
      Since white on white is invisible, you can't see it in the PDF.

      But when you convert the PDF to Google Docs, Word, or any other format, the text colors get converted to black.
      Suddenly, the watermark appears everywhere.

      ### Layer 2: Unicode Fingerprints
      The unique watermark ID is encoded as invisible zero-width Unicode characters (U+200B and U+200C).
      These characters have zero width and are completely invisible to humans.

      They're hidden between regular words in the PDF text.
      When someone copy-pastes text from the document, these characters come along with it.
      Even if they convert it to Google Docs or edit it in Word, the fingerprint survives.

      ### Layer 3: Metadata
      The watermark ID and recipient information are also stored in the PDF's metadata fields.
      Anyone can view this by opening File → Properties in any PDF reader.

      ## How to Use GhostMark

      1. Go to the Protect tab
      2. Upload your PDF
      3. Enter your watermark text (e.g., "CONFIDENTIAL")
      4. Enter the recipient's name and email
      5. Click "Generate Protected Document"
      6. Download the protected PDF
      7. Send it to your recipient

      That's it. The watermark is now embedded in three ways.

      ## If Your Document Leaks

      1. Go to the Verify tab
      2. Upload the leaked document (PDF, Word, or converted version)
      3. GhostMark extracts the watermark ID
      4. It tells you who the document was sent to

      ## Why This Works

      **White text layer** = Works when converted to Word, Google Docs, or any format
      **Unicode fingerprints** = Survives copy-paste and format conversion
      **Metadata** = Provides another layer of tracking

      All three layers together make it nearly impossible to leak a document without leaving a trail.

      ## Privacy

      GhostMark processes your PDF entirely in your browser.
      Your file is never uploaded to our servers.
      Only the watermark ID + recipient info is sent to our database.
    `,
  },
  'my-document-was-leaked': {
    title: 'My Document Was Leaked - What Now?',
    content: `
      # My Document Was Leaked - What Now?

      Don't panic. If you watermarked your document with GhostMark, you can find out exactly who leaked it.

      ## Step 1: Get the Leaked Document

      Someone sent you (or you found) a document that's yours.
      It could be:
      - A PDF
      - A Word document (.docx)
      - A Google Docs link
      - A text file (.txt)
      - Anything they converted it to

      ## Step 2: Go to Verify

      1. Visit watermarkpdf.vercel.app/verify
      2. Upload the leaked document
      3. Click "Check Document"

      ## Step 3: Get the Results

      If you watermarked it with GhostMark, you'll see:
      - The recipient's name
      - The recipient's email address
      - The watermark text you used
      - The date you sent it
      - The original filename

      ## Step 4: Take Action

      Now you know exactly who you sent it to. You can:
      - Contact them and ask why they leaked it
      - Take legal action if necessary
      - Update your security practices
      - Track which documents they're sharing

      ## Why Watermarks Stick

      The watermark ID survives even if someone:
      - Converts PDF to Word
      - Uploads to Google Docs
      - Copies text and pastes into a new document
      - Prints and scans the document (the white text layer appears)
      - Runs through OCR
      - Takes screenshots (metadata remains)

      The invisibility is key — the leaker doesn't even know the watermark is there.

      ## Privacy & Your Data

      When you verify a leaked document, only the watermark ID is sent to our servers.
      We don't store the document itself.
      We don't track who verified what.

      The watermark ID is anonymized and expires after 90 days, so your data doesn't stay in our database forever.

      ## Questions?

      - **How long does the watermark stay?** 90 days. After that, the ID expires from our database.
      - **Can they remove the watermark?** The white text layer is hard to remove (it appears when converted). The Unicode fingerprints survive copy-paste. The metadata can be stripped, but the other two layers remain.
      - **What if they print and scan?** The white text becomes visible and the watermark appears. Perfect proof.
      - **Is my document safe?** Yes. The file never goes to our servers. Only the encrypted watermark ID.
    `,
  },
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}>
            Post Not Found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 20 }}>
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 40,
          fontWeight: 700,
          marginBottom: 30,
          color: 'var(--color-text-primary)',
        }}>
          {post.title}
        </h1>

        <div style={{
          color: 'var(--color-text-primary)',
          lineHeight: 1.8,
          fontSize: 16,
        }}>
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return (
                <h2 key={i} style={{
                  fontSize: 28,
                  fontWeight: 700,
                  marginTop: 30,
                  marginBottom: 20,
                  color: 'var(--color-text-primary)',
                }}>
                  {line.replace('# ', '')}
                </h2>
              );
            } else if (line.startsWith('## ')) {
              return (
                <h3 key={i} style={{
                  fontSize: 20,
                  fontWeight: 600,
                  marginTop: 24,
                  marginBottom: 12,
                  color: 'var(--color-text-primary)',
                }}>
                  {line.replace('## ', '')}
                </h3>
              );
            } else if (line.startsWith('- ')) {
              return (
                <li key={i} style={{ marginLeft: 20, marginBottom: 8 }}>
                  {line.replace('- ', '')}
                </li>
              );
            } else if (line.trim() === '') {
              return <div key={i} style={{ height: 16 }} />;
            } else if (line.trim()) {
              return (
                <p key={i} style={{ marginBottom: 16, color: 'var(--color-text-primary)' }}>
                  {line}
                </p>
              );
            }
            return null;
          })}
        </div>

        <div style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid var(--color-border-light)',
        }}>
          <a href="/blog" style={{
            color: 'var(--color-accent)',
            fontWeight: 500,
            textDecoration: 'underline',
          }}>
            ← Back to Blog
          </a>
        </div>
      </article>
    </main>
  );
}
