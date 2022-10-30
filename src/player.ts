import { ulid } from 'ulid';

export type playerId = string;

/**
 * The player is a single user interacting with a speciic game instance. They
 * do not exist outside of the game in any way. In the future, we will introduce
 * the concept of an account that owns the player, but for now we keep it simple
 */
export default class Player {
  public id: playerId;

  constructor(id: playerId) {
    this.id = id;
  }

  static createPlayer() {
    const newId = ulid();
    return new Player(newId);
  }
}