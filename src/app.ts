import gameServer from './server';
import pino from 'pino';

const logger = pino({
});

const server = new gameServer('auto', logger);

server.listen(3000);