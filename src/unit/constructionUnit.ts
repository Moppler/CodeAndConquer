import { Logger } from 'pino';
import Game, { ConstructStructure, MoveUnitCommand } from '../game';
import { playerId } from '../player';
import { structureId } from '../structure';
import structureFactory, { structures } from '../structureFactory';
import Unit from '../unit';

type PossibleCommandType = MoveUnitCommand | ConstructStructure;

export default class ConstructionUnit extends Unit {

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }, game: Game, logger: Logger) {
    super(id, owner, pos, 'constructionUnit', game, logger);
  }

  processCommand(command: PossibleCommandType) {
    if (command.type === 'moveUnit') {
      this.moveUnit(command.destinationPosition);
    }
    if (command.type === 'constructStructure') {
      if (!structures[command.structureType]) {
        return;
      }
      this.constructStructure(command.structureType, this.position);
    }
  }

  constructStructure(newStructureType: keyof typeof structures, position: { x: number; y: number; }) {
    const newStructure = structureFactory(newStructureType, this.owner, position, this.game, this.logger);
    this.game.structures[newStructure.id] = newStructure;
  }

}
