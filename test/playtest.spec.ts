import pino, { Logger } from 'pino';
import request from 'supertest';
import gameServer from '../src/server';

/**
 * This test simulates a game. It is incredibly simple and exists only to ensure
 * that the absolute basic game loop is functional.
 */
describe('PlayTest', () => {
  it('works', async () => {
    const mockLogger = {
      child: jest.fn().mockReturnThis(),
      info: jest.fn()
    } as unknown as Logger;
    const server = new gameServer('step', mockLogger);

    const games = await request(server.app).get('/games');
    expect(games.body).toEqual([]);

    const newGame = await request(server.app).post('/games');
    const gameId = newGame.body.gameId;
    expect(gameId).toBeTruthy();

    const playerOne = await request(server.app).post('/players');
    const playerTwo = await request(server.app).post('/players');

    await request(server.app).post(`/games/${gameId}/playerJoin/${playerOne.body.id}`);
    await request(server.app).post(`/games/${gameId}/playerJoin/${playerTwo.body.id}`);

    const gameDetailsOneResponse = await request(server.app).get('/games');
    const gameDetailsOne = gameDetailsOneResponse.body[0];
    expect(gameDetailsOne.id).toBe(gameId);
    expect(gameDetailsOne.status).toBe('waitingForPlayers');
    expect(gameDetailsOne.players[0].id).toBe(playerOne.body.id);
    expect(gameDetailsOne.players[1].id).toBe(playerTwo.body.id);
    expect(gameDetailsOne.tick).toBe(0);
    expect(gameDetailsOne.structures).toStrictEqual({});
    expect(gameDetailsOne.units).toStrictEqual({});

    server.processGameTicks('step');

    const gameDetailsTwoResponse = await request(server.app).get('/games');
    const gameDetailsTwo = gameDetailsTwoResponse.body[0];
    expect(gameDetailsTwo.status).toBe('ready');
    expect(gameDetailsTwo.tick).toBe(0);

    server.games[0].startTime = Date.now() - 1000;
    server.processGameTicks('step');

    const gameDetailsThreeResponse = await request(server.app).get('/games');
    const gameDetailsThree = gameDetailsThreeResponse.body[0];
    expect(gameDetailsThree.status).toBe('inProgress');
    expect(gameDetailsThree.tick).toBe(0);
    expect(Object.keys(gameDetailsThree.structures).length).toBe(2);
    const structures = Object.keys(gameDetailsThree.structures).map((structureKey) => gameDetailsThree.structures[structureKey]);
    const playerOneCC = structures.find((structure) => structure.owner === playerOne.body.id);
    const playerTwoCC = structures.find((structure) => structure.owner === playerTwo.body.id);
    expect(playerOneCC.type).toBe('commandCentre');
    expect(playerOneCC.position).toStrictEqual({ x: 0, y: 0 });
    expect(playerTwoCC.type).toBe('commandCentre');
    expect(playerTwoCC.position).toStrictEqual({ x: 0, y: 9 });

    server.processGameTicks('step');

    const gameDetailsFourResponse = await request(server.app).get('/games');
    const gameDetailsFour = gameDetailsFourResponse.body[0];
    expect(gameDetailsFour.tick).toBe(1);
    
    const createConstructionUnitCommand = {
      structures: {}
    };
    createConstructionUnitCommand.structures[playerOneCC.id] = {
      type: 'trainUnit',
      unitType: 'constructionUnit'
    }
    await request(server.app)
      .post(`/games/${gameId}/issueCommand/${playerOne.body.id}`)
      .send(createConstructionUnitCommand);

    server.processGameTicks('step');

    const gameDetailsFiveResponse = await request(server.app).get('/games');
    const gameDetailsFive = gameDetailsFiveResponse.body[0];
    expect(gameDetailsFive.tick).toBe(2);

    const units = Object.keys(gameDetailsFive.units).map((unitKey) => gameDetailsFive.units[unitKey]);
    expect(units.length).toBe(1);
    expect(units[0].type).toBe('constructionUnit');
    expect(units[0].position).toStrictEqual({ x: 0, y: 0 });

    
    const moveConstructionUnitCommand = {
      units: {}
    };
    moveConstructionUnitCommand.units[units[0].id] = {
      type: 'moveUnit',
      destinationPosition: { x: 1, y: 1 }
    }
    await request(server.app)
      .post(`/games/${gameId}/issueCommand/${playerOne.body.id}`)
      .send(moveConstructionUnitCommand);

    server.processGameTicks('step');

    const gameDetailsSixResponse = await request(server.app).get('/games');
    const gameDetailsSix = gameDetailsSixResponse.body[0];
    expect(gameDetailsSix.tick).toBe(3);

    const unitsTwo = Object.keys(gameDetailsSix.units).map((unitKey) => gameDetailsSix.units[unitKey]);
    expect(unitsTwo.length).toBe(1);
    expect(unitsTwo[0].position).toStrictEqual({ x: 1, y: 1 });
    
  });
});