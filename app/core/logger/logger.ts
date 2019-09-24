import * as fs from 'fs';
import path from 'path';
import bunyan from 'bunyan';
import * as config from '../config';

const logFileDir: string | undefined = config.LOG_DIR;
const dir: string = logFileDir !== undefined ? path.join(__dirname, logFileDir) : '';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const logger = bunyan.createLogger({
  name: 'app',
  streams: [{
    type: 'rotating-file',
    path: `${dir}/app.log`,
    period: '1d',   // daily rotation
    count: 5, // keep 3 back copies
  }, { // Log message in the console
    level : 'debug',
    stream : process.stdout,
  }],
});
