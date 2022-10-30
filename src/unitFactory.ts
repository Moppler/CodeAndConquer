import { ulid } from 'ulid';
import { playerId } from './player';
import ConstructionUnit from './unit/constructionUnit';

export type PossibleUnitType = ConstructionUnit;

export const units = {
  constructionUnit: ConstructionUnit
};

export default function unitFactory(unitType: keyof typeof units, owner: playerId, position: { x: number; y: number }) {
  const newId = ulid();
  return new units[unitType](newId, owner, position);
}
