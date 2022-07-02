import DevLog from './DevLog'
import ProductionLog from './ProductionLog'

let log = null
if (process.env.NODE_ENV === 'production') log = ProductionLog()
else log = DevLog()

module.exports = log
