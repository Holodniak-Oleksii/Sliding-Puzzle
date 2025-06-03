export const TILE_SIZE = 56;

export const BLOCK = {
  WALL: "wall",
  CELL: "cell",
  WOOD: "wood",
  STONE: "stone",

  FIRE: "-fire",
  WATER: "-water",
  AIR: "-air",
  GROUND: "-ground",

  TARGET_FIRE: "fire",
  TARGET_WATER: "water",
  TARGET_AIR: "air",
  TARGET_GROUND: "ground",
};

export const UN_COLLISION_BLOCKS = [
  BLOCK.TARGET_AIR,
  BLOCK.TARGET_FIRE,
  BLOCK.TARGET_GROUND,
  BLOCK.TARGET_WATER,
  BLOCK.CELL,
];

export const TARGET_TO_BLOCK = {
  [BLOCK.TARGET_FIRE]: BLOCK.FIRE,
  [BLOCK.TARGET_WATER]: BLOCK.WATER,
  [BLOCK.TARGET_AIR]: BLOCK.AIR,
  [BLOCK.TARGET_GROUND]: BLOCK.GROUND,
};
