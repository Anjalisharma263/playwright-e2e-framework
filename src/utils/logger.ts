import winston from 'winston';
import path from 'node:path';
import fs from 'fs';
import { info } from 'node:console';

const logDir = path.join(process.cwd(), 'logs');
const filePath = path.join(logDir, 'test.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({timestamp, level, message})=>{
        return `${timestamp}:[${level.toUpperCase()}]:${message}`;
})
),
    transports:[
       new winston.transports.Console(),
       new winston.transports.File({filename:filePath})
    ]
})