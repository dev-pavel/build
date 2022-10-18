import User from "../models/User.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if (user) {
            const password =  crypto.createHash('md5').update(req.body.password).digest('hex')

            if (password === user.password) {
                const JWT = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '30d'})

                res.status(200).json({jwt: JWT})
            } else {
                res.status(400).json({message: 'Неверный пароль'})
            }
        } else {
            res.status(400).json({message: 'Пользователь с таким email не найден'})
        }
    } catch (e) {
        res.status(500).json({message: 'Внутренняя ошибка сервера'})
    }
}

export const registration = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})

        if (!candidate) {
            const JWT = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '30d'})
            const password = crypto.createHash('md5').update(req.body.password).digest('hex')

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                company: req.body.company,
                email: req.body.email,
                password
            })

            await user.save()
            res.status(200).json({jwt: JWT})
        } else {
            res.status(400).json({message: 'Пользователь с таким email уже зарегистрирован'})
        }
    } catch (e) {
        res.status(500).json({message: 'Внутренняя ошибка сервера'})
    }
}

export const refresh = async (req, res) => {
    try {
        jwt.verify(req.body.jwt, 'secret', (err, decoded) => {
            if (err) {
                res.status(400).send()
            } else {
                const JWT = jwt.sign({email: decoded.email}, 'secret', {expiresIn: '30d'})
                res.status(200).json({jwt: JWT})
            }
        })
    } catch (e) {
        res.status(500).json({message: 'Внутренняя ошибка сервера'})
    }
}
