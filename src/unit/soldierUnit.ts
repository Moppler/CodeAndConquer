import { Logger } from 'pino';
import Game, { ConstructStructure, MoveUnitCommand } from '../game';
import { playerId } from '../player';
import { structureId } from '../structure';
import structureFactory from '../structureFactory';
import Unit from '../unit';

type PossibleCommandType = MoveUnitCommand | ConstructStructure;

export default class SoldierUnit extends Unit {

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }, game: Game, logger: Logger) {
    super(id, owner, pos, 'soldierUnit', game, logger);
  }

  processCommand(command: PossibleCommandType) {
    if (command.type === 'moveUnit') {
      // console.log(`Unit ${this.id} moved from ${this.position} to ${command.destinationPosition}`);
      this.moveUnit(command.destinationPosition);
    }
  }

}
