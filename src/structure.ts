import Game from './game';
import { playerId } from './player';

export type structureId = string;

export default class Structure {
  public id: structureId;
  public owner: playerId;

  public type: string;

  public position: { x: number; y: number };

  protected game: Game;

  constructor(id: structureId, owner: playerId, pos: { x: number; y: number }, type: string, game: Game) {
    this.id = id;
    this.owner = owner;

    this.type = type;

    this.position = pos;

    this.game = game;
  }
}
