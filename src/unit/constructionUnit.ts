import { playerId } from '../player';
import { structureId } from '../structure';
import Unit from '../unit';

export default class ConstructionUnit extends Unit {

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }) {
    super(id, owner, pos, 'commandCentre');
  }

}
