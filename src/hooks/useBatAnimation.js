import { useState, useCallback } from 'react';

const SWING_STEP     = 0.05;
const SWING_INTERVAL = 30;   

export function useBatAnimation() {

  const [batSwing, setBatSwing] = useState(false);
  const [batPhase, setBatPhase] = useState(0);
  const triggerSwing = useCallback((onComplete) => {
    setBatSwing(true);
    let phase = 0;

    const interval = setInterval(() => {
      phase += SWING_STEP;
      setBatPhase(Math.min(phase, 1));

      if (phase >= 1) {
        clearInterval(interval);
        setBatSwing(false);
        setBatPhase(0);
        onComplete();
      }
    }, SWING_INTERVAL);
  }, []);

  return { batSwing, batPhase, triggerSwing };
}
