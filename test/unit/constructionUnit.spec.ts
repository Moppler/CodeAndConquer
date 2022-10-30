import ConstructionUnit from '../../src/unit/constructionUnit';

describe('Construction Unit', () => {
  describe('processCommand', () => {
    describe('moveUnit', () => {
      test('The specified destination becomes the new position', () => {
        const unit = new ConstructionUnit(
          'TestUnit',
          'PlayerId',
          { x: 0, y: 0 }
        );

        expect(unit.position).toEqual({ x: 0, y: 0 });

        unit.processCommand({ type: 'moveUnit', destinationPosition: { x: 1, y: 1 } });

        expect(unit.position).toEqual({ x: 1, y: 1 });
      });
    });
  });
});
