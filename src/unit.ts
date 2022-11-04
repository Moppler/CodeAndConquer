import { Logger } from 'pino';
import Game from './game';
import { playerId } from './player';

export type unitId = string;

export default class Unit {
  public id: unitId;
  public owner: playerId;
  public type: string;
  public position: { x: number; y: number };
  public logger: Logger;
  public game: Game;

  constructor(id: unitId, owner: playerId, pos: { x: number; y: number }, type: string, game: Game, logger: Logger) {
    this.id = id;
    this.owner = owner;
    this.type = type;
    this.position = pos;
    this.game = game;
    this.logger = logger;
  }

  moveUnit(newDestination: { x: number; y: number; }) {
    this.position = newDestination;
  }
}
