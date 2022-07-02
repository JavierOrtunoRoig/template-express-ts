import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const myFormat = printf( ({ level, message, timestamp }: any ) => `[${level}] ${timestamp}   ${message}` );

const ProductionLog = (): winston.Logger => {

  return createLogger({
    level: 'info',
    format: combine(
      timestamp({ format: 'HH:mm:ss' }),
      myFormat
    ),
    transports: [

      // new transports.File({ filename: 'combined.log' })
      new transports.Console(),
      new transports.File({ filename: 'myErrors.log' })
    ]
  });

};

export default ProductionLog;
