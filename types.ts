export enum AppPhase {
  INITIALIZING = 'INITIALIZING',
  TITLE_REVEAL = 'TITLE_REVEAL',
  SUBTITLE_TYPING = 'SUBTITLE_TYPING',
  INTERACTIVE = 'INTERACTIVE',
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
}