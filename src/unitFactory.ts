import { Logger } from 'pino';
import { ulid } from 'ulid';
import Game from './game';
import { playerId } from './player';
import ConstructionUnit from './unit/constructionUnit';
import SoldierUnit from './unit/soldierUnit';

export type PossibleUnitType = ConstructionUnit | SoldierUnit;

export const units = {
  constructionUnit: ConstructionUnit,
  soldierUnit: SoldierUnit
};

export default function unitFactory(unitType: keyof typeof units, owner: playerId, position: { x: number; y: number }, game: Game, logger: Logger) {
  const newId = ulid();
  return new units[unitType](newId, owner, position, game, logger);
}
