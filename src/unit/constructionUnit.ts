import { MoveUnitCommand } from '../game';
import { playerId } from '../player';
import { structureId } from '../structure';
import Unit from '../unit';

type PossibleCommandType = MoveUnitCommand;

export default class ConstructionUnit extends Unit {

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }) {
    super(id, owner, pos, 'commandCentre');
  }

  processCommand(command: PossibleCommandType) {
    if (command.type === 'moveUnit') {
      // console.log(`Unit ${this.id} moved from ${this.position} to ${command.destinationPosition}`);
      this.position = command.destinationPosition;
    }
  }

}
