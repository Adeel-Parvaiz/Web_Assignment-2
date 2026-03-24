import { batting_styles } from '../constants/game_rules';

export default function GameOver({ runs, wickets, ballsBowled, bStyle, onRestart }) {

  const totalBalls = ballsBowled;
  const overs      = Math.floor(totalBalls / 6);
  const balls      = totalBalls % 6;
  const runRate    = totalBalls > 0 ? (runs / totalBalls * 6).toFixed(2) : '0.00';
  const styleInfo  = batting_styles[bStyle];

  // Rating based on runs
  const rating =
    runs >= 80 ? { label: '🏆 World Class',  color: '#fbbf24' } :
    runs >= 60 ? { label: '⭐ Excellent',     color: '#34d399' } :
    runs >= 40 ? { label: '👍 Good Innings',  color: '#60a5fa' } :
    runs >= 20 ? { label: '😐 Decent',        color: '#a78bfa' } :
                 { label: '😬 Poor',          color: '#f87171' };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(2, 6, 23, 0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        border: '1px solid #334155',
        borderRadius: 20,
        padding: '36px 40px',
        maxWidth: 420,
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>

        <div style={{ fontSize: 48, marginBottom: 4 }}>🏏</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, color: '#f1f5f9', margin: '0 0 4px' }}>
          Innings Complete!
        </h2>
        <div style={{ fontSize: 14, color: rating.color, fontWeight: 700, marginBottom: 24 }}>
          {rating.label}
        </div>
        <div style={{
          background: '#020617',
          borderRadius: 14,
          padding: '20px 24px',
          marginBottom: 20,
          border: '1px solid #1e293b',
        }}>
          <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 6 }}>
            Final Score
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#fbbf24', lineHeight: 1 }}>
            {runs}
            <span style={{ fontSize: 28, color: '#94a3b8' }}>/{wickets}</span>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
            {overs}.{balls} overs
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: 24,
          gap: 10,
        }}>
          {[
            { label: 'Run Rate', value: runRate },
            { label: 'Style',    value: `${styleInfo.emoji} ${styleInfo.label}` },
            { label: 'Wickets',  value: `${wickets} lost` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              flex: 1,
              background: '#020617',
              borderRadius: 10,
              padding: '10px 6px',
              border: '1px solid #1e293b',
            }}>
              <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
                {label}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginTop: 3 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

       
        <button
          onClick={onRestart}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 12,
            border: 'none',
            background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 24px rgba(59,130,246,0.4)',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          🔄 Play Again
        </button>

      </div>
    </div>
  );
}
