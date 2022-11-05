import { Logger } from 'pino';
import Game from '../../src/game';
import CommandCentreStructure from '../../src/structure/commandCentre';
import SoldierUnit from '../../src/unit/soldierUnit';
import unitFactory from '../../src/unitFactory';

describe('Soldier Unit', () => {
  describe('captureStructure', () => {
    test('is correctly updates the owner of the specified structure', () => {
      const mockStructure = {
        id: 'CCStructureId',
        owner: 'PlayerTwoId'
      } as CommandCentreStructure;
      const unit = new SoldierUnit(
        'SoldierUnit',
        'PlayerOneId',
        { x: 0, y: 0 },
        {
          structures: {
            'CCStructureId': mockStructure
          }
        } as unknown as Game,
        {} as Logger
      );
      
      expect(mockStructure.owner).toBe('PlayerTwoId');

      unit.captureStructure('CCStructureId');

      expect(mockStructure.owner).toBe('PlayerOneId');
    });
  });
  describe('processCommand', () => {
    describe('moveUnit', () => {
      const unit = new SoldierUnit(
        'SoldierUnit',
        'PlayerOneId',
        { x: 0, y: 0 },
        {} as Game,
        {} as Logger
      );

      const stubMoveUnit = jest.fn();
      unit.moveUnit = stubMoveUnit;

      unit.processCommand({ type: 'moveUnit', destinationPosition: { x: 1, y: 1} });

      expect(stubMoveUnit).toHaveBeenCalledWith({ x: 1, y: 1 });
    });
    describe('captureStructure', () => {
      const unit = new SoldierUnit(
        'SoldierUnit',
        'PlayerOneId',
        { x: 0, y: 0 },
        {} as Game,
        {} as Logger
      );

      const stubCaptureStructure = jest.fn();
      unit.captureStructure = stubCaptureStructure;

      unit.processCommand({ type: 'captureStructure', structureId: 'testStructure' });

      expect(stubCaptureStructure).toHaveBeenCalledWith('testStructure');
    });
  });
});
