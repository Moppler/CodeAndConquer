import { Logger } from 'pino';
import Game from '../src/game';
import Unit from '../src/unit';

describe('Unit', () => {
  describe('moveUnit', () => {
    it('correctly moves the unit', () => {
      const unit = new Unit(
        'testUnit',
        'playerId',
        { x: 0, y: 0 },
        'constructionUnit',
        {} as Game,
        {} as Logger
      );

      expect(unit.position).toStrictEqual({ x: 0, y: 0 });

      unit.moveUnit({ x: 1, y: 1 });

      expect(unit.position).toStrictEqual({ x: 1, y: 1 });
    });
  });
});
