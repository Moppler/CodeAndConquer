import { Logger } from 'pino';
import Game, { TrainUnitCommand } from '../game';
import { playerId } from '../player';
import Structure, { structureId } from '../structure';
import unitFactory, { units } from '../unitFactory';

type PossibleCommandType = TrainUnitCommand;

export default class BarracksStructure extends Structure {

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }, game: Game, logger: Logger) {
    super(id, owner, pos, 'barracks', game, logger);
  }

  processCommand(command: PossibleCommandType): void {
    if (command.type === 'trainUnit') {
      // console.log(`Structure ${this.id} generated a ${command.unitType}`);
      const newUnit = unitFactory(command.unitType, this.owner, this.position, this.game, this.logger);
      this.game.units[newUnit.id] = newUnit;
    }
  }
}