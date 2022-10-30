type EmptyTile = {
  type: 'empty'
};

// type: 'resource' | 'oilField' | 'civilianBuilding' | 'spawnPoint'

type MapTile = EmptyTile;

export interface GameMap {
  name: string;
  spawnPoints: { x: number; y: number; }[]
  terrain: MapTile[][];
}

export const mapFactory: { [k: string]: GameMap } = {
  testMap: {
    name: 'testMap',
    spawnPoints: [
      { x: 0, y: 0 },
      { x: 0, y: 9 }
    ],
    terrain: [
      [
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' },
        { type: 'empty' }
      ]
    ]
  }
};