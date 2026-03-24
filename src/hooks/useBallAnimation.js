import { useState, useCallback } from 'react';
import { easeInOut } from '../utils/gameUtils';

const BALL_START = { x: 408, y: 200 };
const BALL_END   = { x: 210, y: 295 };
const DURATION   = 700;                 

export function useBallAnimation() {

  const [ballPos, setBallPos] = useState(null);
  const animateBall = useCallback((onComplete) => {
    const startTime = performance.now();

    const frame = (now) => {
      const t     = Math.min((now - startTime) / DURATION, 1);
      const eased = easeInOut(t);
      setBallPos({
        x: BALL_START.x + (BALL_END.x - BALL_START.x) * eased,
        y: BALL_START.y + (BALL_END.y - BALL_START.y) * eased,
      });

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setBallPos(BALL_END);        
        onComplete();                 
      }
    };

    requestAnimationFrame(frame);
  }, []);
  const resetBall = useCallback(() => {
    setBallPos(null);
  }, []);

  return { ballPos, animateBall, resetBall };
}
