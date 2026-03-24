import { useState, useCallback, useEffect } from 'react';
import { total_balls, maximum_wickets, batting_styles, phase as PHASE } from './constants/game_rules';
import { getOutcomeFromPosition, randomCommentary } from './utils/gameUtils';
import { useSlider }        from './hooks/useSlider';
import { useBallAnimation } from './hooks/useBallAnimation';
import { useBatAnimation }  from './hooks/useBatAnimation';

import { speakCommentary } from './utils/commentary_voice';

import CricketGround  from './components/CricketGround';
import Scoreboard     from './components/Scoreboard';
import StyleSelector  from './components/StyleSelector';
import PowerBar       from './components/PowerBar';
import ActionButton   from './components/ActionButton';
import Commentary     from './components/Commentary';
import GameOver       from './components/GameOver';
import BallHistory    from './components/BallHistory';



export default function App() {

  // ── Game State ─────────────────────────────────────────────
  const [runs,        setRuns]        = useState(0);
  const [wickets,     setWickets]     = useState(0);
  const [ballsBowled, setBallsBowled] = useState(0);
  const [bStyle,      setBStyle]      = useState('aggressive');
  const [gamePhase,   setGamePhase]   = useState(PHASE.IDLE);
  const [lastOutcome, setLastOutcome] = useState(null);
  const [commentary,  setCommentary]  = useState('Select your batting style and play!');
  const [history,     setHistory]     = useState([]);   // ← NEW

  // ── Custom Hooks ───────────────────────────────────────────
  const { sliderPos, startSlider, stopSlider }  = useSlider();
  const { ballPos,   animateBall, resetBall }    = useBallAnimation();
  const { batSwing,  batPhase,    triggerSwing } = useBatAnimation();

  // ── Derived values ────────────────────────────────────────
  const segments  = batting_styles[bStyle].segments;
  const ballsLeft = total_balls - ballsBowled;
  const over      = Math.floor(ballsBowled / 6);
  const ball      = ballsBowled % 6;

  // ── Bowl ───────────────────────────────────────────────────
  const handleBowl = useCallback(() => {
    if (gamePhase !== PHASE.IDLE) return;
    setGamePhase(PHASE.BOWLING);
    setLastOutcome(null);
    animateBall(() => {
      setGamePhase(PHASE.BATTING);
      startSlider();
    });
  }, [gamePhase, animateBall, startSlider]);

  // ── Shot ───────────────────────────────────────────────────
  const handleShot = useCallback(() => {
    if (gamePhase !== PHASE.BATTING) return;
    const pos     = stopSlider();
    const outcome = getOutcomeFromPosition(pos, segments);
    setGamePhase(PHASE.RESULT);
    triggerSwing(() => resolveOutcome(outcome));
  }, [gamePhase, stopSlider, segments, triggerSwing]);

  // ── Resolve outcome ────────────────────────────────────────
const resolveOutcome = (outcome) => {
  const scored     = (outcome !== 'Wicket' && outcome !== '0') ? parseInt(outcome) : 0;
  const newRuns    = runs + scored;
  const newWickets = outcome === 'Wicket' ? wickets + 1 : wickets;
  const newBalls   = ballsBowled + 1;

  setRuns(newRuns);
  setWickets(newWickets);
  setBallsBowled(newBalls);
  setLastOutcome(outcome);

  const line = randomCommentary(outcome);
  setCommentary(line);
  speakCommentary(line);        

  setHistory(prev => [...prev, outcome]);
  resetBall();

  const isOver = newWickets >= maximum_wickets || newBalls >= total_balls;
  setTimeout(() => {
    setGamePhase(isOver ? PHASE.GAMEOVER : PHASE.IDLE);
  }, 1200);
};

  // ── Restart ────────────────────────────────────────────────
  const handleRestart = useCallback(() => {
    stopSlider();
    resetBall();
    setRuns(0);
    setWickets(0);
    setBallsBowled(0);
    setBStyle('aggressive');
    setGamePhase(PHASE.IDLE);
    setLastOutcome(null);
    setCommentary('Select your batting style and play!');
    setHistory([]);   // ← NEW: clear history
  }, [stopSlider, resetBall]);

  // ── Style change ───────────────────────────────────────────
  const handleStyleChange = (newStyle) => {
    if (gamePhase === PHASE.IDLE) setBStyle(newStyle);
  };

  // ── Keyboard shortcut ──────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code !== 'Space') return;
      e.preventDefault();
      if (gamePhase === PHASE.IDLE)    handleBowl();
      if (gamePhase === PHASE.BATTING) handleShot();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gamePhase, handleBowl, handleShot]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1a0505 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 12px 48px',
      fontFamily: 'Segoe UI, system-ui, sans-serif',
    }}>

      {/* Game Over overlay */}
      {gamePhase === PHASE.GAMEOVER && (
        <GameOver
          runs={runs}
          wickets={wickets}
          ballsBowled={ballsBowled}
          bStyle={bStyle}
          onRestart={handleRestart}
        />
      )}

      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 11, letterSpacing: 4, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>
        </p>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#f1f5f9', margin: 0 }}>
          🏏 <span style={{ color: '#fbbf24' }}>2D Cricket</span> Batting Game
        </h1>
        <p style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
          {total_balls} Balls · {maximum_wickets} Wickets
        </p>
      </header>

      {/* Main layout */}
      <main style={{
        display: 'flex', gap: 16, width: '100%', maxWidth: 920,
        flexWrap: 'wrap', alignItems: 'flex-start',
      }}>

        {/* LEFT column */}
        <div style={{ flex: '1 1 540px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>

          <div style={{
            position: 'relative', borderRadius: 14, overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)', border: '2px solid #1e293b',
          }}>
            <CricketGround ballPos={ballPos} batSwing={batSwing} batPhase={batPhase} />

            {/* Result flash */}
            {lastOutcome && gamePhase === PHASE.RESULT && (
              <div style={{
                position: 'absolute', top: '30%', left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '8px 22px', borderRadius: 10,
                background: lastOutcome === 'Wicket' ? 'rgba(220,38,38,0.85)'
                          : lastOutcome === '6' || lastOutcome === '4'
                            ? 'rgba(22,163,74,0.85)' : 'rgba(30,41,59,0.85)',
                color: '#fff', fontSize: 24, fontWeight: 800,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
                pointerEvents: 'none',
              }}>
                {lastOutcome === 'Wicket' ? '💥 OUT!'
                  : lastOutcome === '6'   ? '🚀 SIX!'
                  : lastOutcome === '4'   ? '🔥 FOUR!'
                  : `+${lastOutcome}`}
              </div>
            )}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: 12, border: '1px solid #1e293b',
          }}>
            <PowerBar
              segments={segments}
              sliderPos={sliderPos}
              active={gamePhase === PHASE.BATTING}
              onShot={handleShot}
            />
          </div>

          <ActionButton
            gamePhase={gamePhase} PHASE={PHASE}
            onBowl={handleBowl} onShot={handleShot} onRestart={handleRestart}
          />

          <Commentary text={commentary} />

          {/* Ball History — only shows once at least 1 ball bowled */}
          <BallHistory history={history} />
        </div>

        {/* RIGHT column */}
        <div style={{ flex: '1 1 260px', minWidth: 240, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Scoreboard
            runs={runs} wickets={wickets}
            over={over} ball={ball}
            ballsLeft={ballsLeft} bStyle={bStyle}
          />
          <StyleSelector bStyle={bStyle} onStyleChange={handleStyleChange} />
        </div>

      </main>
    </div>
  );
}
