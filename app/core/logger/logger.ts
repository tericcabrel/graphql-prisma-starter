import * as fs from 'fs';
import path from 'path';
import * as winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';

import * as config from '../config';

const { combine, timestamp, printf }: any = winston.format;

const logFileDir: string | undefined = config.LOG_DIR;
const dir: string = logFileDir !== undefined ? path.join(__dirname, logFileDir) : '';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const transport: any = new (winstonDailyRotateFile)({
  dirname: dir,
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

transport.on('rotate', (oldFilename: string, newFilename: string) => {
  // do something fun
});

const myFormat: any = printf((obj: any) => {
  return `${obj.timestamp} - ${obj.level}: ${obj.message}`;
});

// tslint:disable-next-line:variable-name
const Logger: winston.Logger = winston.createLogger({
  format: combine(
    timestamp(),
    myFormat,
  ),
  transports: [
    transport,
    new winston.transports.Console(),
  ],
});

export { Logger };
