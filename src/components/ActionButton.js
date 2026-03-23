export default function ActionButton({ gamePhase, PHASE, onBowl, onShot, onRestart }) {

  const isBatting = gamePhase === PHASE.BATTING;
  const isIdle    = gamePhase === PHASE.IDLE;
  const isActive  = isIdle || isBatting;

  const handleClick = () => {
    if (isIdle)    onBowl();
    if (isBatting) onShot();
  };
  const label =
    gamePhase === PHASE.IDLE     ? '⚾ Bowl Ball  (Space)' :
    gamePhase === PHASE.BOWLING  ? '⏳ Ball in Motion…'   :
    gamePhase === PHASE.BATTING  ? '🏏 PLAY SHOT!  (Space)':
    gamePhase === PHASE.RESULT   ? '⏳ Processing…'        :
    gamePhase === PHASE.GAMEOVER ? 'Game Over'             : '';

  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <button
        onClick={isActive ? handleClick : undefined}
        disabled={!isActive}
        style={{
          flex: 1, padding: 14, borderRadius: 10, border: 'none',
          background: isBatting
            ? 'linear-gradient(135deg, #16a34a, #22c55e)'
            : 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
          color: '#fff', fontSize: 16, fontWeight: 700,
          cursor: isActive ? 'pointer' : 'default',
          opacity: isActive ? 1 : 0.55,
          boxShadow: isBatting  ? '0 0 20px rgba(34,197,94,0.4)'
                   : isIdle     ? '0 0 20px rgba(59,130,246,0.4)'
                   : 'none',
          transition: 'all 0.2s',
        }}
      >
        {label}
      </button>

      <button
        onClick={onRestart}
        style={{
          padding: '14px 18px', borderRadius: 10,
          border: '1px solid #334155',
          background: '#1e293b', color: '#94a3b8',
          fontSize: 14, cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#374151'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; }}
      >
        🔄
      </button>
    </div>
  );
}
