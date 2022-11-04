import { Logger } from 'pino';
import { ulid } from 'ulid';
import Game from './game';
import { playerId } from './player';
import BarracksStructure from './structure/barracks';
import CommandCentreStructure from './structure/commandCentre';

export type PossibleStructure = CommandCentreStructure;

export const structures = {
  commandCentre: CommandCentreStructure,
  barracks: BarracksStructure
};

export default function structureFactory(structureType: keyof typeof structures, owner: playerId, position: { x: number; y: number }, game: Game, logger: Logger) {
  const newId = ulid();
  return new structures[structureType](newId, owner, position, game, logger);
}
