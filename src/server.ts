import * as express from 'express';
import Game from './game';
import Player from './player';
import * as bodyParser from 'body-parser';

const games: Game[] = [];
const players: Player[] = [];

const processTicks = () => {
  games.forEach((game) => game.processTick());
  setTimeout(processTicks, 30000);
}
processTicks();

const app = express();

app.use(bodyParser.json({ type: 'application/json' }))

app.get('/games', (req, res) => {
  res.json(games);
});

app.post('/games', (req, res) => {
  const newGame = Game.createGame();
  games.push(newGame);

  res.json({
    gameId: newGame.id
  });
});

app.post('/games/:gameId/playerJoin/:playerId', (req, res) => {
  const game = games.find((game) => game.id === req.params.gameId);
  if (!game) {
    res.status(400).json({ error: 'Game does not exist' });
    return;
  }

  const player = players.find((player) => player.id === req.params.playerId);
  if (!player) {
    res.status(400).json({ error: 'Player does not exist' });
    return;
  }

  game.addPlayer(player);
  res.json({ message: 'Player added to game' })
});

app.post('/games/:gameId/issueCommand/:playerId', (req, res) => {
  const game = games.find((game) => game.id === req.params.gameId);
  if (!game) {
    res.status(400).json({ error: 'Game does not exist' });
    return;
  }

  const player = players.find((player) => player.id === req.params.playerId);
  if (!player) {
    res.status(400).json({ error: 'Player does not exist' });
    return;
  }

  // Add the players commands to the game to be processed next tick
  game.commands[player.id] = req.body
  
  res.json({ message: 'Command issued' });
});

app.get('/players', (req, res) => {
  res.json(players);
});

app.post('/players', (req, res) => {
  const newPlayer = Player.createPlayer();
  players.push(newPlayer);

  res.json(newPlayer);
});

app.listen(3000);
