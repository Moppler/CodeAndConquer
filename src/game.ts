import { ulid } from 'ulid';
import { GameMap, mapFactory } from './mapFactory';
import Player, { playerId } from './player';
import Structure, { structureId } from './structure';
import structureFactory, { PossibleStructure } from './structureFactory';
import { unitId } from './unit';
import { PossibleUnitType, units } from './unitFactory';

export type TrainUnitCommand = {
  type: 'trainUnit',
  unitType: keyof typeof units;
};

export type MoveUnitCommand = {
  type: 'moveUnit',
  destinationPosition: { x: number; y: number; };
}

type StructureCommands = TrainUnitCommand;
type UnitCommands = MoveUnitCommand;

type PendingCommands = {
  structures: { [k: structureId]: StructureCommands; };
  units: { [k: unitId]: UnitCommands; };
};

export default class Game {
  public id: string;

  public tick: number;
  public players: Player[];
  public commands: { [k: playerId]: PendingCommands }

  public map: GameMap;

  public structures: { [id: structureId]: PossibleStructure };
  public units: { [id: unitId]: PossibleUnitType };

  public status: 'waitingForPlayers' | 'ready' | 'inProgress';
  public startTime: number | undefined;

  constructor(id: string, map: GameMap) {
    this.id = id;

    this.tick = 0;
    this.players = [];
    this.commands = {};

    this.map = map;

    this.structures = {};
    this.units = {};

    this.status = 'waitingForPlayers';
    this.startTime = undefined;
  }

  processTick() {
    console.log('Process Tick', this.tick);
    
    if (this.status === 'waitingForPlayers' && this.players.length < 2) {
      return;
    }

    if (this.status === 'waitingForPlayers' && this.players.length === 2) {
      this.status = 'ready';
      this.startTime = Date.now() + 30000;
      return;
    }

    // Setup Game
    if(this.startTime && this.startTime < Date.now()) {
      this.status = 'inProgress';
      this.players.forEach((player, index) => {
        const newCommandCentre = structureFactory('commandCentre', player.id, this.map.spawnPoints[index], this)
        this.structures[newCommandCentre.id] = newCommandCentre;
      });
    }

    console.log('=== Process Commands ===');
    // For Each Player
    this.players.forEach((player) => {
      console.log(player.id);
      
      const commands = this.commands[player.id];

      if (commands) {
        if (commands.structures) {
          Object.keys(commands.structures).map((structureId) => {
            const structureCommand = commands.structures[structureId];

            this.structures[structureId].processCommand(structureCommand);
          });
        }

        if (commands.units) {
          Object.keys(commands.units).map((unitId) => {
            const unitCommand = commands.units[unitId];

            this.units[unitId].processCommand(unitCommand);
          });
        }
      }

    });

    this.commands = {};

    this.tick++;
  }

  static createGame() {
    const newId = ulid();
    const selectedGameMap = mapFactory['testMap'];
    return new Game(newId, selectedGameMap);
  }

  addPlayer(player: Player) {
    if (this.players.length >= 2) {
      return false;
    }
    this.players.push(player);
    return true;
  }
}