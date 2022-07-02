import express, { Express } from 'express'
import cors from 'cors'
import { format, transports } from 'winston'
import expressWinston from 'express-winston'

import examples from '../routes/examples'

import DevLogger from '../logger/DevLog'
const log = DevLogger()

const { timestamp, printf } = format
// const { dbConnection } = require('./db/config'); TODO: ¿Hay Base de datos?

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}\n`)

class Server {
  private readonly port: number | string
  private readonly app: Express

  constructor () {
    this.port = process.env.PORT ?? 8080

    this.app = express()
    this.middleware()
    log.info('Middlewares cargados')
    this.routes()
    log.info('Rutas cargadas')

    // Base de datos
    // dbConnection(); TODO: ¿Hay Base de datos?
  }

  private middleware (): void {
    // CORS
    this.app.use(cors())

    // Directorio público
    // this.app.use( express.static( 'public' ) );  TODO: Decir carpeta publica

    // Lectura y parseo del body
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true })) // parses application/x-www-form-urlencoded
    // this.app.use( formidableMiddleware() ); // Permite coger los datos de un form data https://www.npmjs.com/package/express-formidable

    this.app.use(expressWinston.logger({
      format: format.combine(
        format.json(),
        format.colorize(),
        timestamp({ format: 'HH:mm:ss' }),
        myFormat
      ),
      transports: [
        new transports.Console()
      ],
      meta: false, // optional: control whether you want to log the meta data about the request (default to true)
      msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute: function (_req, _res) { return false } // optional: allows to skip some log messages based on request and/or response
    }))
  }

  private routes (): void {
    this.app.use('/api/example', examples)
  }

  public listen (): void {
    this.app.listen(this.port, () => log.info(`Servidor corriendo en puerto ${this.port}`))
  }
}

export default Server
