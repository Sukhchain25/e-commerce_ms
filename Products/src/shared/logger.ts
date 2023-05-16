import winston, { format } from 'winston';
const { combine, timestamp, printf, colorize } = format;

// Define the log format
const logFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const logger = winston.createLogger({
  level: 'debug',
  format: logFormat,
  transports: [new winston.transports.Console()],
});

export default logger;
