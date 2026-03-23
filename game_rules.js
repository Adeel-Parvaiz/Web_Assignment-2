export const total_balls  = 12;   
export const maximum_wickets  = 2;
export const slider_speed = 0.006;

export const phase = {
  IDLE:     "idle",
  BOWLING:  "bowling",
  BATTING:  "batting",
  RESULT:   "result",
  GAMEOVER: "gameover",
};

export const batting_styles = {
  aggressive: {
    label: "Aggressive",
    emoji: "⚡",
    description:  "High risk · High reward",
    color: "#ef4444",
    segments: [                                          
      { outcome: "Wicket", prob: 0.40, color: "#dc2626", label: "W" },
      { outcome: "0",      prob: 0.10, color: "#6b7280", label: "0" },
      { outcome: "1",      prob: 0.10, color: "#16a34a", label: "1" },
      { outcome: "2",      prob: 0.10, color: "#2563eb", label: "2" },
      { outcome: "3",      prob: 0.05, color: "#7c3aed", label: "3" },
      { outcome: "4",      prob: 0.10, color: "#d97706", label: "4" },
      { outcome: "6",      prob: 0.15, color: "#ec4899", label: "6" },
    ],
  },
  defensive: {
    label: "Defensive",
    emoji: "🛡️",
    description:  "Low risk · Safe play",
    color: "#3b82f6",
    segments: [                                         
      { outcome: "Wicket", prob: 0.15, color: "#dc2626", label: "W" },
      { outcome: "0",      prob: 0.25, color: "#6b7280", label: "0" },
      { outcome: "1",      prob: 0.30, color: "#16a34a", label: "1" },
      { outcome: "2",      prob: 0.15, color: "#2563eb", label: "2" },
      { outcome: "3",      prob: 0.05, color: "#7c3aed", label: "3" },
      { outcome: "4",      prob: 0.07, color: "#d97706", label: "4" },
      { outcome: "6",      prob: 0.03, color: "#ec4899", label: "6" },
    ],
  },
};

export const commentary = {
  Wicket: [
    "Bowled him! The stumps are shattered!",
    "Caught behind! What a delivery!",
    "OUT! The fielder pouches it perfectly!",
  ],
  "0": [
    "Dot ball. Good length, nothing to hit.",
    "Played and missed! Bat misses ball completely.",
    "Defended solidly, no run taken.",
  ],
  "1": [
    "Pushed to mid-on for a single. Smart cricket.",
    "Quick single! Alert running between the wickets.",
    "Rolled off the bat, easy single taken.",
  ],
  "2": [
    "Driven nicely, two runs!",
    "Good placement, comfortable two runs.",
    "Clipped off the pads for a brace!",
  ],
  "3": [
    "Driven hard, three running!",
    "Misfield in the deep — three easy runs!",
    "Good running! They'll get three for that.",
  ],
  "4": [
    "FOUR! Cracked through the covers!",
    "BOUNDARY! Racing to the rope!",
    "Beautiful drive! Four all the way!",
  ],
  "6": [
    "SIX! Massive hit into the stands!",
    "MAXIMUM! That's gone into the crowd!",
    "What a shot! Straight over the bowler for six!",
  ],
};