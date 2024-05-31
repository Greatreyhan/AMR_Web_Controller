interface Tile {
    x: number;
    y: number;
    gCost?: number;
    hCost?: number;
    cost?: number;
    parent?: Tile | null;
  }
  
  const gCost = (tilePosition: Tile, playerPosition: Tile): number => {
    const width = tilePosition.x - playerPosition.x;
    const height = tilePosition.y - playerPosition.y;
    return Math.sqrt(width * width + height * height);
  };
  
  const hCost = (tilePosition: Tile, goal: Tile): number => {
    const width = goal.x - tilePosition.x;
    const height = goal.y - tilePosition.y;
    return Math.sqrt(width * width + height * height);
  };
  
  export const addCosts = (item: Tile, goal: Tile, player: Tile | undefined = undefined): Tile | undefined => {
    if (!item) return undefined;
    const g_cost = gCost(item, player!) + (player?.gCost || 0);
    const h_cost = hCost(item, goal);
    const cost = g_cost + h_cost;
    const itemToReturn: Tile = {
      x: item.x,
      y: item.y,
      gCost: g_cost,
      hCost: h_cost,
      cost: cost,
      parent: player || null,
    };
    return itemToReturn;
  };
  
  export const getMinCostTiles = (data: Tile[]): { minArray: Tile[], min: number } => {
    const allCosts = data.map((item) => item.cost!);
    const min = Math.min(...allCosts);
    return {
      minArray: data.filter((item) => item.cost === min),
      min,
    };
  };
  
  export const getMinHCostTile = (data: Tile[]): Tile | undefined => {
    const hMinCosts = data.map((item) => item.hCost!);
    const hMin = Math.min(...hMinCosts);
    return data.find((item) => item.hCost === hMin);
  };
  
  export const getMinCostTile = (tiles: Tile[], min: number): Tile | undefined => {
    return tiles.find((item) => item.cost === min);
  };
  