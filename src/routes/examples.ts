import express from 'express'
import { example } from '../controllers/controllerExample'

const router = express.Router()

router.get('/', example)

export default router
