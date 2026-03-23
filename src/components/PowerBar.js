export default function PowerBar({ segments, sliderPos, active, onShot }) {
  return (
    <div style={{ padding: '12px 16px 8px' }}>

      <div style={{
        fontSize: 11, color: '#94a3b8', marginBottom: 4,
        textTransform: 'uppercase', letterSpacing: 1,
      }}>
        {active ? '⚡ Click the bar to play your shot!' : 'Power Bar'}
      </div>

      
      <div
        onClick={active ? onShot : undefined}
        style={{
          position: 'relative',
          display: 'flex',
          height: 44,
          borderRadius: 8,
          overflow: 'visible',
          border: '2px solid #1e293b',
          cursor: active ? 'pointer' : 'default',
          boxShadow: active
            ? '0 0 0 2px #fbbf24, 0 4px 20px rgba(0,0,0,0.4)'
            : '0 2px 8px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.2s',
        }}
      >
       
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              width: `${seg.prob * 100}%`,
              background: seg.color,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: seg.prob < 0.07 ? 9 : 12,
              fontWeight: 700,
              borderRight: i < segments.length - 1 ? '1px solid rgba(0,0,0,0.2)' : 'none',
              userSelect: 'none',
            }}
          >
            <span>{seg.label}</span>
            <span style={{ fontSize: 9, opacity: 0.85 }}>
              {(seg.prob * 100).toFixed(0)}%
            </span>
          </div>
        ))}

        <div style={{
          position: 'absolute',
          top: -10,
          left: `calc(${sliderPos * 100}% - 3px)`,
          width: 6,
          height: 64,
          background: active ? '#fbbf24' : '#64748b',
          borderRadius: 3,
          boxShadow: active ? '0 0 10px #fbbf24' : 'none',
          pointerEvents: 'none',
          zIndex: 10,
          transition: 'background 0.2s',
        }}>
          <div style={{
            position: 'absolute',
            top: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: `8px solid ${active ? '#fbbf24' : '#64748b'}`,
          }} />
        </div>

      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 9,
        color: '#64748b',
        marginTop: 3,
      }}>
        <span>0</span>
        {(() => {
          let c = 0;
          return segments.map((s, i) => {
            c += s.prob;
            return <span key={i}>{c.toFixed(2)}</span>;
          });
        })()}
      </div>

    </div>
  );
}
