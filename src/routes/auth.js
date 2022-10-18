import express from 'express'
import {login, refresh, registration} from "../controllers/auth.js";

const router = express.Router()

router.post('/login', login)
router.post('/registration', registration)
router.post('/refresh', refresh)

export default router
