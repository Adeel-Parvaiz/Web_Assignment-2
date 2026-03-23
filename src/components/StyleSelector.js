import { batting_styles } from '../constants/game_rules';

export default function StyleSelector({ bStyle, onStyleChange }) {

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f172a, #1e293b)',
      borderRadius: 12,
      padding: 14,
      border: '1px solid #334155',
    }}>

      <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Batting Style
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {Object.entries(batting_styles).map(([key, val]) => {

          const isActive = bStyle === key;

          return (
            <button
              key={key}
              onClick={() => onStyleChange(key)}
              style={{
                flex: 1, padding: '10px 6px', borderRadius: 8, border: 'none',
                background: isActive
                  ? key === 'aggressive'
                    ? 'linear-gradient(135deg, #7f1d1d, #dc2626)'
                    : 'linear-gradient(135deg, #1e3a5f, #2563eb)'
                  : '#1e293b',
                color: isActive ? '#fff' : '#64748b',
                fontWeight: 700, fontSize: 12, cursor: 'pointer',
                outline: isActive ? `2px solid ${val.color}` : '1px solid #334155',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 20 }}>{val.emoji}</div>
              <div>{val.label}</div>
              <div style={{ fontSize: 9, opacity: 0.8 }}>{val.description}</div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
