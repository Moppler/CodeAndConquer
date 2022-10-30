import { playerId } from './player';

export type unitId = string;

export default class Unit {
  public id: unitId;
  public owner: playerId;

  public type: string;

  public position: { x: number; y: number };

  constructor(id: unitId, owner: playerId, pos: { x: number; y: number }, type: string) {
    this.id = id;
    this.owner = owner;

    this.type = type;

    this.position = pos;
  }
}
