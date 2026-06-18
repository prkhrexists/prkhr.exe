// ============================================================
//  HUD LORE DATA
//  Location labels and mission text shown in the footer HUD
//  for each zone. Keyed by zone ID (or 'home' for the map screen).
//  Add a new entry here whenever a new zone is created.
// ============================================================

export interface HudLore {
  location: string;
  mission: string;
}

export const HUD_LORE: Record<string, HudLore> = {
  home: {
    location: 'ROOFTOP SPAWN POINT',
    mission:  'Explore all zones to know more about me',
  },
  1: {
    location: 'CODE CAVE — LVL 1',
    mission:  'Analyze skills & expertise',
  },
  2: {
    location: 'PROJECTS HANGER — LVL 2',
    mission:  'Review deployed projects',
  },
  3: {
    location: 'THE BUNKER — LVL 3',
    mission:  'Access research & development',
  },
  4: {
    location: 'YELLOWDUCK HQ — LVL 4',
    mission:  'Investigate ventures & team ops',
  },
  5: {
    location: 'ARENA — LVL 5',
    mission:  'View competitions & achievements',
  },
};
