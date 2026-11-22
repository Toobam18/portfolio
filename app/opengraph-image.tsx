import { ImageResponse } from 'next/og'

// Edge runtime: the Node build of @vercel/og fails to resolve its bundled font on Windows paths.
export const runtime = 'edge'

export const alt = 'Tooba Malik, Third-Year Software Engineering Student at Ontario Tech University. Open to 2027 co-ops.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0b1222 0%, #13203b 100%)',
          color: '#f8fafc',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 22px',
              borderRadius: 999,
              border: '2px solid #065f46',
              background: 'rgba(6, 78, 59, 0.45)',
              color: '#a7f3d0',
              fontSize: 26,
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 999, background: '#34d399' }} />
            Open to 2027 co-ops
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>Tooba Malik</div>
          <div style={{ marginTop: 28, fontSize: 38, color: '#cbd5e1', fontFamily: 'sans-serif' }}>
            Third-Year Software Engineering Student
          </div>
          <div style={{ marginTop: 6, fontSize: 38, color: '#7dd3fc', fontFamily: 'sans-serif' }}>
            Ontario Tech University
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#94a3b8', fontFamily: 'sans-serif' }}>
          <span>Full-stack and AI projects with measured results</span>
          <span>toobamalik.vercel.app</span>
        </div>
      </div>
    ),
    size
  )
}
