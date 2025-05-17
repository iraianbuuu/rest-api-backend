import winston from 'winston';
import { config } from '../config';
import LokiTransport from 'winston-loki';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = config.nodeEnv;
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Console format with colors
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// File format without colors
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Loki format (structured JSON)
const lokiFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

const transports = [
  // Console transport with colors
  new winston.transports.Console({
    format: consoleFormat
  }),
  
  // File transports without colors
  new winston.transports.File({ 
    filename: 'logs/error.log', 
    level: 'error',
    format: fileFormat
  }),
  new winston.transports.File({ 
    filename: 'logs/app.log',
    format: fileFormat
  }),
  
  // Loki transport with JSON format
  new LokiTransport({
    host: 'http://localhost:3100',
    basicAuth: 'admin:password',
    format: lokiFormat,
    labels: { app: 'ziraa', env: config.nodeEnv },
    onConnectionError: (err) => {
      console.error('Failed to connect to Loki', err);
    },
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default logger;
