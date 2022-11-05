import { Logger } from 'pino';
import Game, { ConstructStructure, MoveUnitCommand } from '../game';
import { playerId } from '../player';
import { structureId } from '../structure';
import structureFactory from '../structureFactory';
import Unit from '../unit';

export type CaptureStructureCommand = {
  type: 'captureStructure';
  structureId: structureId;
}

type PossibleCommandType = MoveUnitCommand | ConstructStructure | CaptureStructureCommand;

export default class SoldierUnit extends Unit {
  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }, game: Game, logger: Logger) {
    super(id, owner, pos, 'soldierUnit', game, logger);
  }

  processCommand(command: PossibleCommandType) {
    if (command.type === 'moveUnit') {
      // console.log(`Unit ${this.id} moved from ${this.position} to ${command.destinationPosition}`);
      this.moveUnit(command.destinationPosition);
    }
    if (command.type === 'captureStructure') {
      this.captureStructure(command.structureId);
    }
  }

  captureStructure(structureId: structureId) {
    this.game.structures[structureId].owner = this.owner;
  }
}
