import { Logger } from 'pino';
import request from 'supertest';
import Game from '../src/game';
import player from '../src/player';

import gameServer from '../src/server';

describe('API', () => {
  describe('Fetch All Games', () => {

    test(' responses have the correct headers', async () => {
      const mockLogger = {} as Logger;
      const server = new gameServer('step', mockLogger);

      const response = await request(server.app).get('/games');

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
    
    test('when there are no games, an empty array is returned', async () => {
      const mockLogger = {} as Logger;
      const server = new gameServer('step', mockLogger);

      const response = await request(server.app).get('/games');

      expect(response.body).toStrictEqual([]);
    });

    test('responds with an array of game objects', async () => {
      const mockLogger = {} as Logger;
      const server = new gameServer('step', mockLogger);

      const mockGame: Game  = {
        id: 'GameId',
        logger: mockLogger,
        tick: 99,
        players: [],
        commands: {},
        map: {
          name: 'TestMap',
          spawnPoints: [],
          terrain: [] 
        },
        structures: {
          'StructureId': {
            id: 'StructureId',
            owner: 'PlayerId',
            type: 'TestStructure',
            position: { x: 0, y: 0 },
            game: {} as Game,
            logger: {} as Logger,
            processCommand: function (): void {
              throw new Error('Function not implemented.');
            },
          }
        },
        units: {
          'UnitId': {
            id: 'UnitId',
            owner: 'PlayerId',
            type: 'TestUnit',
            position: { x: 1, y: 1 },
            game: {} as Game,
            logger: {} as Logger,
            moveUnit: function (): void {
              throw new Error('Function not implemented.');
            },
            processCommand: function (): void {
              throw new Error('Function not implemented.');
            },
          }
        },
        status: 'waitingForPlayers',
        startTime: 0,
        processTick: function (): void {
          throw new Error('Function not implemented.');
        },
        addPlayer: function (player: player): boolean {
          throw new Error('Function not implemented.');
        }
      };
      server.games.push(mockGame);

      const response = await request(server.app).get('/games');

      expect(response.body[0]).toStrictEqual({
        id: 'GameId',
        tick: 99,
        structures: {
          'StructureId': {
            id: 'StructureId',
            owner: 'PlayerId',
            position: { x: 0, y: 0 },
            type: 'TestStructure'
          }
        },
        units: {
          'UnitId': {
            id: 'UnitId',
            owner: 'PlayerId',
            type: 'TestUnit',
            position: { x: 1, y: 1 }
          }
        },
        players: [],
        status: 'waitingForPlayers',
      });
    });

  });
});