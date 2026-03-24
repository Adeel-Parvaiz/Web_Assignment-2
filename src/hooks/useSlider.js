import { useState, useRef, useCallback } from 'react';
import { slider_speed } from '../constants/game_rules';

export function useSlider() {
  const [sliderPos, setSliderPos] = useState(0);

  const posRef    = useRef(0);
  const dirRef    = useRef(1);
  const activeRef = useRef(false);
  const rafRef    = useRef(null);
  const startSlider = useCallback(() => {
    activeRef.current = true;
    posRef.current    = 0;
    dirRef.current    = 1;

    const tick = () => {
      if (!activeRef.current) return; 
      posRef.current += slider_speed * dirRef.current;
      if (posRef.current >= 1) {
        posRef.current = 1;
        dirRef.current = -1; 
      }
      if (posRef.current <= 0) {
        posRef.current = 0;
        dirRef.current = 1;  
      }
      setSliderPos(posRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);
  const stopSlider = useCallback(() => {
    activeRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    return posRef.current; 
  }, []);

  return { sliderPos, startSlider, stopSlider };
}
