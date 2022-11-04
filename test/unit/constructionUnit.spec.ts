import { Logger } from 'pino';
import Game from '../../src/game';
import ConstructionUnit from '../../src/unit/constructionUnit';

describe('Construction Unit', () => {
  describe('processCommand', () => {
    describe('moveUnit', () => {
      test('the moveUnit function is correctly called with the new location', () => {
        const mockLogger = {} as Logger;
        const unit = new ConstructionUnit(
          'TestUnit',
          'PlayerId',
          { x: 0, y: 0 },
          {} as Game,
          mockLogger
        );

        const moveStub = jest.fn();
        unit.moveUnit = moveStub;

        unit.processCommand({ type: 'moveUnit', destinationPosition: { x: 1, y: 1 } });

        expect(moveStub).toHaveBeenCalledWith({ x: 1, y: 1 });
      });
    });

    describe('constructStructure', () => {
      test('it does nothing if the specified unit type is invalid', () => {
        const unit = new ConstructionUnit(
          'TestUnit',
          'PlayerId',
          { x: 0, y: 0 },
          {} as Game,
          {} as Logger
        );

        const constructStructureStub = jest.fn();
        unit.constructStructure = constructStructureStub;

        // @ts-ignore The structure type is invalid on purpose.
        unit.processCommand({ type: 'constructStructure', structureType: 'invalidStructure' });

        expect(constructStructureStub).not.toHaveBeenCalled();
      });

      test('calls the construct structure function', () => {
        const unit = new ConstructionUnit(
          'TestUnit',
          'PlayerId',
          { x: 0, y: 0 },
          {} as Game,
          {} as Logger
        );

        const constructStructureStub = jest.fn();
        unit.constructStructure = constructStructureStub;

        unit.processCommand({ type: 'constructStructure', structureType: 'commandCentre' });

        expect(constructStructureStub).toHaveBeenCalledWith('commandCentre', unit.position);
      });
    });
  });
});
