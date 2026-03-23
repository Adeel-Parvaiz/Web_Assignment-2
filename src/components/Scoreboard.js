import { maximum_wickets, batting_styles } from '../constants/game_rules';

export default function Scoreboard({ runs, wickets, over, ball, ballsLeft, bStyle }) {

  const styleInfo = batting_styles[bStyle];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      borderRadius: 12,
      padding: '14px 18px',
      border: '1px solid #334155',
      color: '#f1f5f9',
      fontFamily: 'Courier New, monospace',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>
            Score
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: '#fbbf24', lineHeight: 1 }}>
            {runs}
            <span style={{ fontSize: 20, color: '#94a3b8' }}>/{wickets}</span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>
            Overs
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#38bdf8' }}>
            {over}.{ball}
          </div>
          <div style={{ fontSize: 10, color: '#64748b' }}>{ballsLeft} balls left</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2 }}>
            Style
          </div>
          <div style={{
            fontSize: 12, fontWeight: 700,
            padding: '4px 10px', borderRadius: 20, marginTop: 4,
            background: bStyle === 'aggressive' ? '#7f1d1d' : '#1e3a5f',
            color:      bStyle === 'aggressive' ? '#fca5a5' : '#93c5fd',
          }}>
            {styleInfo.emoji} {styleInfo.label}
          </div>
        </div>

      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#64748b' }}>Wickets:</span>
        {Array.from({ length: maximum_wickets }).map((_, i) => (
          <div key={i} style={{
            width: 20, height: 20, borderRadius: 4,
            background: i < wickets ? '#dc2626' : '#22c55e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#fff', fontWeight: 700,
          }}>
            {i < wickets ? '✕' : '●'}
          </div>
        ))}
      </div>

    </div>
  );
}
