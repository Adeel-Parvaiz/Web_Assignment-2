import { commentary } from '../constants/game_rules';

export function getOutcomeFromPosition(pos, segments) {
  let cumulative = 0;
  for (const seg of segments) {
    cumulative += seg.prob;
    if (pos <= cumulative) return seg.outcome;
  }
  return segments[segments.length - 1].outcome;
}
export function randomCommentary(outcome) {
  const lines = commentary[outcome] || ['Good delivery.'];
  return lines[Math.floor(Math.random() * lines.length)];
}
export function easeInOut(t) {
  return t * t * (3 - 2 * t);
}
