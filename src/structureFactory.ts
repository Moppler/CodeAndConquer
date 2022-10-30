import { ulid } from 'ulid';
import Game from './game';
import { playerId } from './player';
import CommandCentreStructure from './structure/commandCentre';

export type PossibleStructure = CommandCentreStructure;

export const structures = {
  commandCentre: CommandCentreStructure
};

export default function structureFactory(structureType: keyof typeof structures, owner: playerId, position: { x: number; y: number }, game: Game) {
  const newId = ulid();
  return new structures[structureType](newId, owner, position, game);
}
