import express, { Express } from 'express';
import Game from './game';
import Player from './player';
import * as bodyParser from 'body-parser';
import { Logger } from 'pino';

export default class gameServer {
  public games: Game[] = [];
  public players: Player[] = [];

  public app: Express;

  public logger: Logger;

  constructor(tickMode: 'step' | 'auto', logger: Logger) {
    const app = express();
    app.use(bodyParser.json({ type: 'application/json' }));

    this.games = [];
    this.players = [];
    this.app = app;
    this.logger = logger;
    
    if (tickMode === 'auto') {
      this.processGameTicks('auto');
    }

    this.setupRoutes();
  }

  processGameTicks(tickMode: 'step' | 'auto') {
    this.logger.info({ message: 'Processing Ticks' });

    this.games.forEach((game) => game.processTick());

    if (tickMode === 'auto') {
      setTimeout(this.processGameTicks.bind(this, tickMode), 30000);
    }
  }

  setupRoutes() {
    this.app.get('/games', (req, res) => {
      res.json(this.games.map((game) => {
        const structures = {};
        Object.keys(game.structures).forEach((structureKey) => {
          const struct = game.structures[structureKey];
          structures[structureKey] = {
            id: struct.id,
            owner: struct.owner,
            position: struct.position,
            type: struct.type
          }
        });

        const units = {};
        Object.keys(game.units).forEach((unitKey) => {
          const unit = game.units[unitKey];
          units[unitKey] = {
            id: unit.id,
            owner: unit.owner,
            position: unit.position,
            type: unit.type
          }
        });

        return {
          id: game.id,
          tick: game.tick,
          players: game.players.map((player) => ({
            id: player.id
          })),
          structures: structures,
          units: units,
          status: game.status
        };
      }));
    });

    this.app.post('/games', (req, res) => {
      const newGame = Game.createGame(this.logger);
      this.games.push(newGame);

      res.json({
        gameId: newGame.id
      });
    });

    this.app.post('/games/:gameId/playerJoin/:playerId', (req, res) => {
      const game = this.games.find((game) => game.id === req.params.gameId);
      if (!game) {
        res.status(400).json({ error: 'Game does not exist' });
        return;
      }

      const player = this.players.find((player) => player.id === req.params.playerId);
      if (!player) {
        res.status(400).json({ error: 'Player does not exist' });
        return;
      }

      game.addPlayer(player);
      res.json({ message: 'Player added to game' })
    });

    this.app.post('/games/:gameId/issueCommand/:playerId', (req, res) => {
      const game = this.games.find((game) => game.id === req.params.gameId);
      if (!game) {
        res.status(400).json({ error: 'Game does not exist' });
        return;
      }

      const player = this.players.find((player) => player.id === req.params.playerId);
      if (!player) {
        res.status(400).json({ error: 'Player does not exist' });
        return;
      }

      // Add the players commands to the game to be processed next tick
      game.commands[player.id] = req.body
      
      res.json({ message: 'Command issued' });
    });

    this.app.get('/players', (req, res) => {
      res.json(this.players);
    });

    this.app.post('/players', (req, res) => {
      const newPlayer = Player.createPlayer();
      this.players.push(newPlayer);

      res.json(newPlayer);
    });
  }

  listen(port: number) {
    this.logger.info({ message: `Starting API` });
    this.app.listen(port);
  }

}
