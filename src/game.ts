import { ulid } from 'ulid';
import { GameMap, mapFactory } from './mapFactory';
import Player, { playerId } from './player';
import Structure, { structureId } from './structure';
import structureFactory, { PossibleStructure, structures } from './structureFactory';
import { unitId } from './unit';
import { PossibleUnitType, units } from './unitFactory';
import { Logger } from 'pino';

export type TrainUnitCommand = {
  type: 'trainUnit',
  unitType: keyof typeof units;
};

export type MoveUnitCommand = {
  type: 'moveUnit',
  destinationPosition: { x: number; y: number; };
}

export type ConstructStructure = {
  type: 'constructStructure',
  structureType: keyof typeof structures;
}

type StructureCommands = TrainUnitCommand;
type UnitCommands = MoveUnitCommand;

type PendingCommands = {
  structures: { [k: structureId]: StructureCommands; };
  units: { [k: unitId]: UnitCommands; };
};

export default class Game {
  public id: string;

  public logger: Logger;

  public tick: number;
  public players: Player[];
  public commands: { [k: playerId]: PendingCommands }

  public map: GameMap;

  public structures: { [id: structureId]: PossibleStructure };
  public units: { [id: unitId]: PossibleUnitType };

  public status: 'waitingForPlayers' | 'ready' | 'inProgress';
  public startTime: number | undefined;

  constructor(id: string, map: GameMap, logger: Logger) {
    this.id = id;

    this.logger = logger;

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
    this.logger.info({ message: 'Process Tick', gameTick: this.tick});
    
    if (this.status === 'waitingForPlayers' && this.players.length < 2) {
      return;
    }

    if (this.status === 'waitingForPlayers' && this.players.length === 2) {
      this.status = 'ready';
      this.startTime = Date.now() + 30000;
      return;
    }

    // Setup Game
    if(this.startTime && this.startTime < Date.now() && this.status === 'ready') {
      this.status = 'inProgress';
      this.players.forEach((player, index) => {
        const newCommandCentre = structureFactory('commandCentre', player.id, this.map.spawnPoints[index], this, this.logger)
        
        this.structures[newCommandCentre.id] = newCommandCentre;
      });
      return;
    }

    // console.log('=== Process Commands ===');
    // For Each Player
    this.players.forEach((player) => {
      // console.log(player.id);
      
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

  static createGame(logger: Logger) {
    const newId = ulid();
    const childLogger = logger.child({ gameId: newId });
    const selectedGameMap = mapFactory['testMap'];
    return new Game(newId, selectedGameMap, childLogger);
  }

  addPlayer(player: Player) {
    if (this.players.length >= 2) {
      return false;
    }
    this.players.push(player);
    return true;
  }
}