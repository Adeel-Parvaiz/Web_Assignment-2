export default function BallHistory({ history }) {
  if (history.length === 0) return null;
  const outcomeColor = {
    Wicket: '#dc2626',
    '0':    '#6b7280',
    '1':    '#16a34a',
    '2':    '#2563eb',
    '3':    '#7c3aed',
    '4':    '#d97706',
    '6':    '#ec4899',
  };
  const outcomeLabel = {
    Wicket: 'W',
    '0': '0', '1': '1', '2': '2',
    '3': '3', '4': '4', '6': '6',
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      borderRadius: 12,
      padding: '12px 16px',
      border: '1px solid #334155',
    }}>

      <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Ball History
      </div>
      {Array.from({ length: Math.ceil(history.length / 6) }).map((_, overIdx) => (
        <div key={overIdx} style={{ marginBottom: 8 }}>

          {/* Over label */}
          <div style={{ fontSize: 10, color: '#475569', marginBottom: 4 }}>
            Over {overIdx + 1}
          </div>

          {/* Balls in this over */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {history
              .slice(overIdx * 6, overIdx * 6 + 6)
              .map((outcome, ballIdx) => (
                <div
                  key={ballIdx}
                  title={outcome === 'Wicket' ? 'Wicket!' : `${outcome} run${outcome !== '1' ? 's' : ''}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: outcomeColor[outcome] || '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    boxShadow: outcome === 'Wicket'
                      ? '0 0 8px rgba(220,38,38,0.6)'
                      : outcome === '6'
                      ? '0 0 8px rgba(236,72,153,0.6)'
                      : 'none',
                  }}
                >
                  {outcomeLabel[outcome]}
                </div>
              ))}
          </div>
        </div>
      ))}

    </div>
  );
}
