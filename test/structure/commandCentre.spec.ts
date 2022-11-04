import { Logger } from 'pino';
import Game from '../../src/game';
import CommandCentreStructure from '../../src/structure/commandCentre';

describe('Command Centre Structure', () => {
  describe('processCommand', () => {
    describe('trainUnit', () => {
      test('The new unit is created and added to the game', () => {
        const mockGame = {
          units: {}
        } as Game;
        const mockLogger = {} as Logger;
        const structure = new CommandCentreStructure('TestStructure', 'PlayerId', { x: 0, y: 0 }, mockGame, mockLogger);

        expect(Object.keys(mockGame.units).length).toBe(0);

        structure.processCommand({ type: 'trainUnit', unitType: 'constructionUnit' });

        expect(Object.keys(mockGame.units).length).toBe(1);
      });
    });
  });
});
