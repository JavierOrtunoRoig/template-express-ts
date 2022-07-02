import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const myFormat = printf( ({ level, message, timestamp }: any ) => `${timestamp} [${level}]: ${message}` );

const DevLogger = (): winston.Logger => {

  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'HH:mm:ss' }),
      myFormat
    ),
    transports: [

      // new transports.File({ filename: 'combined.log' })
      new transports.Console()
    ]
  });

};

export default DevLogger;
